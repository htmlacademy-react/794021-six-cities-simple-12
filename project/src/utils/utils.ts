const RATING_TO_PERCENT_STEP = 20;

export function getPercentFromRating(rating: number): string {
  const roundedPercent = Math.round(rating) * RATING_TO_PERCENT_STEP;
  if (roundedPercent > 100) {
    return '100%';
  }
  if (roundedPercent < 0) {
    return '0%';
  }
  return `${roundedPercent}%`;
}

export function capitalizeFirstLetter(text: string): string {
  const head = text.charAt(0);
  const tail = text.slice(1);
  return head.toUpperCase() + tail;
}
