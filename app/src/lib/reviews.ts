/** Aggregates die PAGE_QUERY over alle reviews afleidt. Alles kan ontbreken. */
export type ReviewStats = {
  totaalReviews?: number;
  totaalAankoop?: number;
  totaalVerkoop?: number;
  gemiddeldCijfer?: number | null;
};

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
