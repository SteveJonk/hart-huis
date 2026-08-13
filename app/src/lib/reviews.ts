/** Aggregates die PAGE_QUERY over alle reviews afleidt. Alles kan ontbreken. */
export type ReviewStats = {
  totaalReviews?: number;
  totaalAankoop?: number;
  totaalVerkoop?: number;
  gemiddeldCijfer?: number | null;
  /** Aantal reviews per afgerond cijfer, zie `GRADE_BUCKETS`. */
  cijfer10?: number;
  cijfer9?: number;
  cijfer8?: number;
  cijfer7?: number;
  cijfer6?: number;
};

export type ReviewType = 'Aankoop' | 'Verkoop';

/** Eén review zoals PAGE_QUERY hem teruggeeft. Alleen quote + name zijn zeker. */
export type ReviewItem = {
  quote: string;
  name: string;
  type?: ReviewType | null;
  date?: string | null;
  grade?: number | null;
  expertise?: number | null;
  localMarketKnowledge?: number | null;
  negotiationAndResult?: number | null;
  priceQuality?: number | null;
};

/**
 * De deelcijfers, in de volgorde waarin ze in de kaarttabel staan.
 * Los van het totaalcijfer (`grade`), dat als los rondje getoond wordt.
 */
export const GRADE_SUBJECTS = [
  { key: 'expertise', label: 'Deskundigheid' },
  { key: 'localMarketKnowledge', label: 'Lokale marktkennis' },
  { key: 'negotiationAndResult', label: 'Onderhandeling en resultaat' },
  { key: 'priceQuality', label: 'Prijs-kwaliteit' },
] as const satisfies ReadonlyArray<{ key: keyof ReviewItem; label: string }>;

/** Alleen de deelcijfers die deze review daadwerkelijk heeft. */
export function subjectGrades(review: ReviewItem) {
  return GRADE_SUBJECTS.map(
    ({ key, label }): { label: string; value: string | undefined } => ({
      label,
      value: formatGrade(review[key] as number | null | undefined),
    }),
  ).filter((row): row is { label: string; value: string } => Boolean(row.value));
}

/** Staafjes in de scorekaart: afgerond cijfer → aantal. `<= 6` is de restbak. */
export const GRADE_BUCKETS = [
  { label: '10', field: 'cijfer10' },
  { label: '9', field: 'cijfer9' },
  { label: '8', field: 'cijfer8' },
  { label: '7', field: 'cijfer7' },
  { label: '≤6', field: 'cijfer6' },
] as const satisfies ReadonlyArray<{ label: string; field: keyof ReviewStats }>;

/**
 * Balkbreedtes relatief aan de grootste bak, zodat de hoogste altijd 100% is —
 * net als in het ontwerp. Zonder cijfers zijn alle balken leeg.
 */
export function gradeDistribution(stats: ReviewStats) {
  const rows = GRADE_BUCKETS.map(({ label, field }) => ({
    label,
    count: (stats[field] as number | undefined) ?? 0,
  }));
  const top = Math.max(...rows.map((row) => row.count));
  return rows.map((row) => ({
    ...row,
    width: top > 0 ? `${Math.round((row.count / top) * 100)}%` : '0%',
  }));
}

/** "12 juli 2026" — de scraper levert een ISO-datum, of niets. */
export function formatReviewDate(date: string | null | undefined): string | undefined {
  if (!date) return undefined;
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return undefined;
  return parsed.toLocaleDateString('nl-NL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

/** "9,6" — null zolang geen enkele review een cijfer heeft. */
export function formatGrade(grade: number | null | undefined): string | undefined {
  if (typeof grade !== 'number' || Number.isNaN(grade)) return undefined;
  return grade.toLocaleString('nl-NL', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
}

/** Afgeleid cijfer wint; valt terug op wat de redactie in Sanity invulde. */
export function reviewScore(stats: ReviewStats, fallback?: string): string | undefined {
  return formatGrade(stats.gemiddeldCijfer) ?? fallback;
}

/** Idem voor "84 keer beoordeeld". 0 reviews telt als "niets afgeleid". */
export function reviewCountLabel(stats: ReviewStats, fallback?: string): string | undefined {
  return stats.totaalReviews ? `${stats.totaalReviews} keer beoordeeld` : fallback;
}

/** "56 beoordelingen" — de formulering op de scorekaart van /beoordelingen. */
export function reviewCountNoun(stats: ReviewStats): string | undefined {
  const total = stats.totaalReviews;
  if (!total) return undefined;
  return total === 1 ? '1 beoordeling' : `${total} beoordelingen`;
}

/** Gap between review cards in the carousel (matches CSS `gap: 24px`). */
export const REVIEW_CARD_GAP = 24;

export function getReviewScrollStep(cardWidth: number): number {
  return cardWidth + REVIEW_CARD_GAP;
}

export function getReviewProgressWidth(
  scrollLeft: number,
  scrollWidth: number,
  clientWidth: number,
): number {
  const max = scrollWidth - clientWidth;
  if (max <= 0) return 100;
  return Math.max(12, (scrollLeft / max) * 100);
}
