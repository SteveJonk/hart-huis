/**
 * Smallest thing that fails if the CMS-driven form layout breaks.
 *
 * Two rules are load-bearing and easy to regress:
 *   1. plugin forms (no `width`) keep pairing narrow fields — that is what
 *      /contact has always rendered;
 *   2. multiStepForm fields pair on the authored `width` instead.
 */
import assert from 'node:assert/strict'
import {toFieldRows, type FormFieldDefinition} from '../src/lib/form-fields'
import {CONTACT_FORM_FIELDS} from '../src/lib/contact-content'
import {WAARDEBEPALING_FORM} from '../src/lib/waardebepaling-content'

function names(rows: FormFieldDefinition[][]) {
  return rows.map((row) => row.map((field) => field.name))
}

// 1. The contact form has no widths, so the narrow-type heuristic still applies.
//    The seed source stands in for what Sanity returns; it is `as const`, hence
//    the cast — its readonly option arrays are otherwise not assignable.
assert.deepEqual(
  names(toFieldRows(CONTACT_FORM_FIELDS as unknown as FormFieldDefinition[])),
  [['naam', 'telefoon'], ['email', 'onderwerp'], ['bericht'], ['akkoord']],
  'contact form rows changed — /contact would reflow',
)

// 2. The waardebepaling steps pair on the authored width, not on the type.
assert.deepEqual(names(toFieldRows(WAARDEBEPALING_FORM.steps[0].fields)), [
  ['postcode', 'huisnr'],
  ['woningtype'],
])
assert.deepEqual(names(toFieldRows(WAARDEBEPALING_FORM.steps[1].fields)), [
  ['naam'],
  ['mail', 'tel'],
  ['termijn'],
  ['akkoord'],
])

// 3. A half-width field with nothing to pair with keeps its own row.
assert.deepEqual(
  names(
    toFieldRows([
      {label: 'A', name: 'a', type: 'text', width: 'half'},
      {label: 'B', name: 'b', type: 'text', width: 'full'},
      {label: 'C', name: 'c', type: 'text', width: 'half'},
    ]),
  ),
  [['a'], ['b'], ['c']],
)

// 4. Three halves in a row make a pair plus a single — never a row of three.
assert.deepEqual(
  names(
    toFieldRows([
      {label: 'A', name: 'a', type: 'text', width: 'half'},
      {label: 'B', name: 'b', type: 'text', width: 'half'},
      {label: 'C', name: 'c', type: 'text', width: 'half'},
    ]),
  ),
  [['a', 'b'], ['c']],
)

// 5. Field names are what the submission is keyed on, so they must be unique
//    across the whole form — not just within a step.
const allNames = WAARDEBEPALING_FORM.steps.flatMap((step) =>
  step.fields.map((field) => field.name),
)
assert.equal(
  new Set(allNames).size,
  allNames.length,
  'duplicate field name — answers would overwrite each other',
)

// 6. Every dropdown needs options, or the step becomes impossible to pass.
for (const step of WAARDEBEPALING_FORM.steps) {
  for (const field of step.fields) {
    if (field.type === 'select') {
      assert.ok(field.selectOptions?.length, `select "${field.name}" has no options`)
    }
    if (field.type === 'checkbox') {
      assert.ok(field.checkboxOptions?.length, `checkbox "${field.name}" has no options`)
    }
  }
}

console.log('check:form — alle controles geslaagd')
