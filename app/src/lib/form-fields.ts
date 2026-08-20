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

/** One input, as authored in the `form` document. */
export type FormFieldDefinition = {
  label: string;
  name: string;
  type: FormFieldType;
  isRequired?: boolean;
  width?: 'full' | 'half';
  /** Legacy: contact-form-plugin documents used the label as the placeholder. */
  showPlaceholder?: boolean;
  placeholder?: string;
  helpText?: string;
  note?: string;
  selectOptions?: string[];
  radioOptions?: string[];
  checkboxOptions?: string[];
};

export type FormStep = {
  title?: string;
  fields: FormFieldDefinition[];
};

/**
 * A form as authored in the `form` document. A simple form keeps its fields
 * under `fields`; a multi-step one spreads them over `steps`. Everything the
 * front end needs is here, so the block that renders it only supplies chrome.
 */
export type FormDefinition = {
  id: string;
  title?: string;
  showTitle?: boolean;
  mode?: 'simple' | 'steps';
  fields?: FormFieldDefinition[];
  steps?: FormStep[];
  nextButtonText?: string;
  backButtonText?: string;
  submitButtonText?: string;
  successTitle?: string;
  successBody?: string;
};

/**
 * The one shape the renderer works with. A simple form becomes a single step,
 * so there is no second code path for it. Steps without fields are dropped —
 * they would render a page the visitor cannot fill in or leave.
 */
export function toSteps(form: FormDefinition): FormStep[] {
  const steps =
    form.mode === 'steps'
      ? (form.steps ?? [])
      : [{ fields: form.fields ?? [] }];

  return steps
    .map((step) => ({ title: step.title, fields: step.fields ?? [] }))
    .filter((step) => step.fields.length > 0);
}

/** Types narrow enough to sit two-per-row when no explicit width is authored. */
const NARROW_TYPES = new Set<FormFieldType>(['text', 'email', 'tel', 'url', 'select']);

/**
 * Groups fields into rows: consecutive half-width fields pair up, the rest get
 * a row of their own.
 *
 * Documents written before the form type had a `width` carry none at all, and
 * fall back to pairing consecutive narrow types — the guess the contact-form
 * plugin's layout was built on. Once migrated, every field has a width and the
 * fallback never runs.
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
