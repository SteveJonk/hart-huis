/**
 * Shape and layout rules for CMS-authored forms. No React in here, so the
 * grouping logic can be checked by `npm run check:form`.
 */

export type FormFieldType =
  | 'text'
  | 'email'
  | 'tel'
  | 'url'
  | 'textarea'
  | 'select'
  | 'radio'
  | 'checkbox'
  | 'file';

/**
 * One input, as authored in Sanity. Covers both form documents: the
 * contact-form plugin's `contactForm` (no `width`) and our `multiStepForm`
 * (which adds it), so a single renderer serves both.
 */
export type FormFieldDefinition = {
  label: string;
  name: string;
  type: FormFieldType;
  isRequired?: boolean;
  width?: 'full' | 'half';
  /** Plugin-only: use the label as the placeholder. */
  showPlaceholder?: boolean;
  placeholder?: string;
  helpText?: string;
  note?: string;
  selectOptions?: string[];
  radioOptions?: string[];
  checkboxOptions?: string[];
};

export type MultiStepFormStep = {
  title?: string;
  fields: FormFieldDefinition[];
};

/** Everything about a form itself, as authored in the `multiStepForm` document. */
export type MultiStepFormDefinition = {
  id: string;
  steps: MultiStepFormStep[];
  nextButtonText?: string;
  backButtonText?: string;
  submitButtonText?: string;
  successTitle?: string;
  successBody?: string;
};

/** Types narrow enough to sit two-per-row when no explicit width is authored. */
const NARROW_TYPES = new Set<FormFieldType>(['text', 'email', 'tel', 'url', 'select']);

/**
 * Groups fields into rows. `multiStepForm` fields carry an explicit `width`,
 * so consecutive half-width ones pair up; plugin fields have none, and fall
 * back to pairing consecutive narrow types the way the contact page always has.
 */
export function toFieldRows(fields: FormFieldDefinition[]): FormFieldDefinition[][] {
  const explicit = fields.some((field) => field.width);
  const rows: FormFieldDefinition[][] = [];

  for (const field of fields) {
    const last = rows[rows.length - 1];
    const pairs = explicit
      ? field.width === 'half' && last?.length === 1 && last[0].width === 'half'
      : NARROW_TYPES.has(field.type) &&
        last?.length === 1 &&
        NARROW_TYPES.has(last[0].type);

    if (pairs) last.push(field);
    else rows.push([field]);
  }

  return rows;
}
