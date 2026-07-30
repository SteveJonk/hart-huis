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
