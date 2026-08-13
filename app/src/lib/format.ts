/** Number and date formatting for object data coming out of Sanity. */

/** 800000 -> "€ 800.000,-" */
export function euro(value: number | null | undefined): string | null {
  if (typeof value !== 'number') return null;
  return `€ ${value.toLocaleString('nl-NL')},-`;
}

/** "2026-08-01" -> "1 augustus 2026" */
export function longDate(iso: string | null | undefined): string | null {
  if (!iso) return null;
  return new Date(iso).toLocaleDateString('nl-NL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

/** "2026-08-01" -> "1 aug. 2026" */
export function shortDate(iso: string | null | undefined): string | null {
  if (!iso) return null;
  return new Date(iso).toLocaleDateString('nl-NL', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}
