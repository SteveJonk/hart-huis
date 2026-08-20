/**
 * Smallest thing that fails if the CMS-driven form layout breaks.
 *
 * Four rules are load-bearing and easy to regress:
 *   1. `toSteps` turns either mode into the one shape the renderer draws;
 *   2. half-width fields pair up, and legacy documents without any width fall
 *      back to the guess the contact page's layout was built on;
 *   3. field names are unique per form — they are the mail's keys;
 *   4. FORM_QUERY, which is the server's allow-list, resolves to exactly the
 *      fields the renderer shows. If those two disagree the form silently
 *      stops accepting submissions.
 */
import assert from 'node:assert/strict'
import {evaluate, parse} from 'groq-js'
import {toFieldRows, toSteps, type FormFieldDefinition} from '../src/lib/form-fields'
import {CONTACT_FORM_DEFINITION, CONTACT_FORM_FIELDS} from '../src/lib/contact-content'
import {WAARDEBEPALING_FORM} from '../src/lib/waardebepaling-content'
import {FORM_QUERY} from '../src/sanity/queries'

function names(rows: FormFieldDefinition[][]) {
  return rows.map((row) => row.map((field) => field.name))
}

const text = (name: string, width?: 'full' | 'half'): FormFieldDefinition => ({
  label: name,
  name,
  type: 'text',
  width,
})

// 1. A simple form is one step; a multi-step form keeps its own steps.
assert.equal(toSteps(CONTACT_FORM_DEFINITION).length, 1, 'a simple form is a single step')
assert.deepEqual(
  toSteps(CONTACT_FORM_DEFINITION)[0].fields.map((field) => field.name),
  CONTACT_FORM_FIELDS.map((field) => field.name),
  'a simple form keeps its fields, in order',
)
assert.equal(toSteps(WAARDEBEPALING_FORM).length, 2)

// The mode decides which container is read, so a stale one is ignored rather
// than silently rendered — that is what makes switching mode back and forth safe.
assert.deepEqual(
  toSteps({id: 'x', mode: 'simple', fields: [text('kept')], steps: [{fields: [text('stale')]}]}),
  [{title: undefined, fields: [text('kept')]}],
)
assert.deepEqual(
  toSteps({id: 'x', mode: 'steps', fields: [text('stale')], steps: [{fields: [text('kept')]}]}),
  [{title: undefined, fields: [text('kept')]}],
)

// An empty form yields no steps at all, so the block can say so.
assert.deepEqual(toSteps({id: 'x', mode: 'simple', fields: []}), [])
assert.deepEqual(toSteps({id: 'x', mode: 'steps', steps: [{fields: []}]}), [])

// 2. Layout: the contact form's authored widths reproduce its original rows.
assert.deepEqual(
  names(toFieldRows(CONTACT_FORM_FIELDS)),
  [['naam', 'telefoon'], ['email', 'onderwerp'], ['bericht'], ['akkoord']],
  'contact form rows changed — /contact would reflow',
)

assert.deepEqual(names(toFieldRows(toSteps(WAARDEBEPALING_FORM)[0].fields)), [
  ['postcode', 'huisnr'],
  ['woningtype'],
])
assert.deepEqual(names(toFieldRows(toSteps(WAARDEBEPALING_FORM)[1].fields)), [
  ['naam'],
  ['mail', 'tel'],
  ['termijn'],
  ['akkoord'],
])

// A half-width field with nothing to pair with keeps its own row, and three in
// a row make a pair plus a single — never a row of three.
assert.deepEqual(
  names(toFieldRows([text('a', 'half'), text('b', 'full'), text('c', 'half')])),
  [['a'], ['b'], ['c']],
)
assert.deepEqual(
  names(toFieldRows([text('a', 'half'), text('b', 'half'), text('c', 'half')])),
  [['a', 'b'], ['c']],
)

// Legacy documents carry no width at all: consecutive narrow types still pair.
assert.deepEqual(
  names(
    toFieldRows([
      {label: 'Naam', name: 'naam', type: 'text'},
      {label: 'Tel', name: 'tel', type: 'tel'},
      {label: 'Bericht', name: 'bericht', type: 'textarea'},
    ]),
  ),
  [['naam', 'tel'], ['bericht']],
  'un-migrated documents must not stack every field',
)

// 3. Field names are the keys a submission is mailed under, so they must be
//    unique across the whole form — not just within a step.
for (const form of [CONTACT_FORM_DEFINITION, WAARDEBEPALING_FORM]) {
  const fieldNames = toSteps(form).flatMap((step) => step.fields.map((field) => field.name))
  assert.equal(
    new Set(fieldNames).size,
    fieldNames.length,
    `${form.title}: duplicate field name — answers would overwrite each other`,
  )

  // Every dropdown and checkbox needs options, or the field cannot be answered.
  for (const step of toSteps(form)) {
    for (const field of step.fields) {
      if (field.type === 'select') {
        assert.ok(field.selectOptions?.length, `select "${field.name}" has no options`)
      }
      if (field.type === 'checkbox') {
        assert.ok(field.checkboxOptions?.length, `checkbox "${field.name}" has no options`)
      }
    }
  }
}

// 4. The server's allow-list must match what the renderer draws, in order.
const tree = parse(FORM_QUERY)
const stale = [{fields: [{label: 'Stale', name: 'stale', type: 'text', isRequired: true}]}]

async function checkAllowList() {
  for (const [label, document] of Object.entries({
    simple: {_id: 'a', _type: 'form', ...CONTACT_FORM_DEFINITION},
    steps: {_id: 'b', _type: 'form', ...WAARDEBEPALING_FORM},
    // Switching mode leaves the other container behind. The query must follow
    // `mode` like toSteps does, not just take whichever container is filled.
    'was steps': {_id: 'c', _type: 'form', ...CONTACT_FORM_DEFINITION, steps: stale},
    // A migrated document has no mode at all, and counts as simple.
    'no mode': {_id: 'd', _type: 'form', ...CONTACT_FORM_DEFINITION, mode: undefined},
  })) {
    const result = await (
      await evaluate(tree, {dataset: [document], params: {formId: document._id}})
    ).get()
    const queried = ((result?.fields ?? []) as {name: string}[]).map((field) => field.name)
    const rendered = toSteps(document as never).flatMap((step) =>
      step.fields.map((field) => field.name),
    )

    assert.deepEqual(
      queried,
      rendered,
      `${label}: FORM_QUERY and the renderer disagree — submissions would be rejected`,
    )
  }
}

// tsx compiles these scripts to CJS, so no top-level await here.
checkAllowList()
  .then(() => console.log('check:form — alle controles geslaagd'))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
