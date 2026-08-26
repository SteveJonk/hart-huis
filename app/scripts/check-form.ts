/**
 * Smallest thing that fails if the CMS-driven form layout breaks.
 *
 * Five rules are load-bearing and easy to regress:
 *   1. `toSteps` turns either mode into the one shape the renderer draws;
 *   2. half-width fields pair up, and legacy documents without any width fall
 *      back to the guess the contact page's layout was built on;
 *   3. field names are unique per form — they are the mail's keys;
 *   4. migrating a plugin document keeps the rendered layout and carries every
 *      reference over to the new id;
 *   5. FORM_QUERY, which is the server's allow-list, resolves to exactly the
 *      fields the renderer shows. If those two disagree the form silently
 *      stops accepting submissions;
 *   6. a form only redirects when the switch is on *and* the link resolves —
 *      otherwise the visitor is left on a form that has already been sent.
 */
import assert from 'node:assert/strict'
import {evaluate, parse} from 'groq-js'
import {
  fillTokens,
  toFieldRows,
  toFormDefinition,
  toRedirect,
  toSteps,
  type FormFieldDefinition,
} from '../src/lib/form-fields'
import {CONTACT_FORM_DEFINITION, CONTACT_FORM_FIELDS} from '../src/lib/contact-content'
import {OBJECT_FORM} from '../src/lib/object-content'
import {WAARDEBEPALING_FORM} from '../src/lib/waardebepaling-content'
import {FORM_QUERY} from '../src/sanity/queries'
import {repoint, toFormDoc, type SanityDocument} from './form-migration'

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

// 2b. A hidden field draws nothing, so it must not take a row — and must not
//     break the pairing of the two half-width fields it sits between either.
assert.deepEqual(
  names(
    toFieldRows([
      {label: 'Woning', name: 'object', type: 'hidden', defaultValue: '{{adres}}'},
      text('a', 'half'),
      {label: 'Woning', name: 'object2', type: 'hidden', defaultValue: '{{adres}}'},
      text('b', 'half'),
    ]),
  ),
  [['a', 'b']],
)
assert.deepEqual(names(toFieldRows(OBJECT_FORM.fields ?? [])), [
  ['naam'],
  ['email', 'telefoon'],
  ['moment'],
  ['bericht'],
  ['akkoord'],
])

// The value of a hidden field is filled in by the page it is rendered on. An
// unknown token becomes empty rather than leaking `{{…}}` into the mail.
assert.equal(
  fillTokens('{{adres}} — {{url}}', {adres: 'Kees \'t Hoenstraat 7', url: '/aanbod/x'}),
  "Kees 't Hoenstraat 7 — /aanbod/x",
)
assert.equal(fillTokens('{{ adres }}', {adres: 'Haarlem'}), 'Haarlem')
assert.equal(fillTokens('{{onbekend}}!', {}), '!')

// 3. Field names are the keys a submission is mailed under, so they must be
//    unique across the whole form — not just within a step.
for (const form of [CONTACT_FORM_DEFINITION, WAARDEBEPALING_FORM, OBJECT_FORM]) {
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

// 4. Migration: a plugin document must come out rendering identically, and
//    every reference to it must follow it to the new id — a missed one leaves
//    a page pointing at a document the migration then deletes.
const legacy: SanityDocument = {
  _id: 'old-id',
  _type: 'contactForm',
  id: 'contact',
  title: 'Contactformulier',
  showtitle: true,
  // A wide field between narrow ones: the row layout here is only reproduced
  // if the width guess is right, so this fixture pins withWidths() down.
  fields: [
    {_key: 'a', label: 'Naam', name: 'naam', type: 'text', showPlaceholder: true},
    {_key: 'b', label: 'Bericht', name: 'bericht', type: 'textarea', isRequired: true},
    {_key: 'c', label: 'Telefoon', name: 'telefoon', type: 'tel'},
    {_key: 'd', label: 'E-mail', name: 'email', type: 'email'},
  ],
}

const migrated = toFormDoc(legacy, 'form-contact')
assert.equal(migrated._type, 'form')
assert.equal(migrated.mode, 'simple', 'a plugin form is always single-page')
assert.equal(migrated.showTitle, true, 'showtitle -> showTitle')
// The guessed layout is written down, so the rendered rows do not move.
assert.deepEqual(
  names(toFieldRows(migrated.fields as FormFieldDefinition[])),
  names(toFieldRows(legacy.fields as FormFieldDefinition[])),
  'migration changed the row layout',
)
// showPlaceholder became a real placeholder, so the flag is no longer needed.
assert.equal(migrated.fields[0].placeholder, 'Naam')
assert.equal(migrated.fields[1].isRequired, true)
assert.deepEqual(
  names(toFieldRows(migrated.fields as FormFieldDefinition[])),
  [['naam'], ['bericht'], ['telefoon', 'email']],
)

const mapping = new Map([['old-id', 'form-contact']])
const page = {
  _id: 'page-contact',
  _type: 'page',
  content: [
    {_type: 'contactFormSection', form: {_type: 'reference', _ref: 'old-id'}},
    {_type: 'faqs', faqs: [{_type: 'reference', _ref: 'keep-me'}]},
  ],
}
assert.deepEqual(repoint(page, mapping), {
  ...page,
  content: [
    {_type: 'contactFormSection', form: {_type: 'reference', _ref: 'form-contact'}},
    {_type: 'faqs', faqs: [{_type: 'reference', _ref: 'keep-me'}]},
  ],
})

// 5. The server's allow-list must match what the renderer draws, in order.
const tree = parse(FORM_QUERY)
const stale = [{fields: [{label: 'Stale', name: 'stale', type: 'text', isRequired: true}]}]

async function checkAllowList() {
  for (const [label, document] of Object.entries({
    simple: {_id: 'a', _type: 'form', ...CONTACT_FORM_DEFINITION},
    // A hidden field is submitted like any other, so it has to be on the
    // allow-list — without it the object's address is dropped from the mail.
    hidden: {_id: 'e', _type: 'form', ...OBJECT_FORM},
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

// 6. Redirect after submission.
assert.equal(toRedirect(false, {linkType: 'internal', internalLink: {slug: 'bedankt'}}), undefined)
assert.equal(toRedirect(true, undefined), undefined, 'switch on, nothing picked yet: no redirect')
assert.equal(toRedirect(true, {linkType: 'internal'}), undefined, 'no page selected: no redirect')
assert.equal(toRedirect(true, {linkType: 'external', href: '  '}), undefined, 'blank URL')

assert.deepEqual(toRedirect(true, {linkType: 'internal', internalLink: {slug: 'bedankt'}}), {
  href: '/bedankt',
  internal: true,
})
// The home page is '/', not '/home' — same rule the rest of the site uses.
assert.deepEqual(toRedirect(true, {linkType: 'internal', internalLink: {slug: 'home'}}), {
  href: '/',
  internal: true,
})
// Anything the Next router cannot handle leaves through the browser.
assert.deepEqual(toRedirect(true, {linkType: 'external', href: 'https://funda.nl'}), {
  href: 'https://funda.nl',
  internal: false,
})
assert.deepEqual(toRedirect(true, {linkType: 'external', href: '/bedankt'}), {
  href: '/bedankt',
  internal: true,
})

// toFormDefinition carries it through, so the renderer never sees the raw link.
assert.deepEqual(
  toFormDefinition({
    _id: 'a',
    mode: 'simple',
    fields: [text('naam')],
    redirectAfterSubmit: true,
    redirectLink: {linkType: 'internal', internalLink: {slug: 'bedankt'}},
  })?.redirect,
  {href: '/bedankt', internal: true},
)
assert.equal(
  toFormDefinition({_id: 'a', mode: 'simple', fields: [text('naam')]})?.redirect,
  undefined,
)

// tsx compiles these scripts to CJS, so no top-level await here.
checkAllowList()
  .then(() => console.log('check:form — alle controles geslaagd'))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
