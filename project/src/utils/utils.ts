import { OfferSortingOption, RATING_TO_PERCENT_STEP } from 'src/consts/consts';
import { Offer, OfferId, Offers, Reviews } from 'src/types/types';

export type ParentOrChildHTMLNode = { parentNode: ParentOrChildHTMLNode | null } | null | undefined;

export function getPercentFromRating(rating: number): string {
  const roundedPercent = Math.round(rating) * RATING_TO_PERCENT_STEP;
  if (roundedPercent >= 100) {
    return '100%';
  }
  if (roundedPercent <= 0) {
    return '0%';
  }
  return `${roundedPercent}%`;
}

export function capitalizeFirstLetter(text: string): string {
  const head = text.charAt(0);
  const tail = text.slice(1);
  return head.toUpperCase() + tail;
}


export function getMultipleOfPlaceWord(count: number): string {
  if (count === 1 || count === -1) {
    return 'place';
  }
  return 'places';
}

export function getRandomIntegerFromZeroExclusive(max: number) {
  max = Math.floor(max);
  return Math.floor(Math.random() * (max));
}

export function findFirstOffer(offers: Offers, offerId: OfferId): Offer | null {
  return offers.find(({ id }) => id === offerId) ?? null;
}

export function getUniqueItems<T>(arr: Array<T>): Array<T> {
  return [...new Set(arr)];
}

export function isChildNodeOrSelf(parent: ParentOrChildHTMLNode, node: ParentOrChildHTMLNode): boolean {
  if (!parent || !node || !node.parentNode) {
    return false;
  }

  if (parent === node) {
    return true;
  }

  return isChildNodeOrSelf(parent, node.parentNode);
}

export function isCurrentPage(currentPath: string, pathToCompare: string): boolean {
  return currentPath === pathToCompare ||
    currentPath === `/${pathToCompare}` ||
    `/${currentPath}` === pathToCompare;
}

export function parseInteger(numberAsString = ''): number | typeof NaN {
  const number = Number(numberAsString);
  if (isNaN(number)) {
    return NaN;
  }
  const numberInt = parseInt(numberAsString, 10);
  if (number !== numberInt) {
    return NaN;
  }
  return numberInt;
}

export function sortOffers(offers: Offers, sortingType: OfferSortingOption): Offers {
  const newOffers = [...offers];

  switch (sortingType) {
    case OfferSortingOption.Popular:
      return offers;
    case OfferSortingOption.PriceLowToHigh:
      newOffers.sort((offer1, offer2) => offer1.price < offer2.price ? -1 : 1);
      break;
    case OfferSortingOption.PriceHighToLow:
      newOffers.sort((offer1, offer2) => offer1.price > offer2.price ? -1 : 1);
      break;
    case OfferSortingOption.TopRatedFirst:
      newOffers.sort((offer1, offer2) => offer1.rating > offer2.rating ? -1 : 1);
      break;
  }
  return newOffers;
}

export function sortReviews(reviews: Reviews): Reviews {
  const newReviews = [...reviews];
  newReviews.sort((review1, review2) => review1.date > review2.date ? -1 : 1);
  return newReviews;
}

export function makeHash(obj: object): string {
  return JSON.stringify(obj);
}
