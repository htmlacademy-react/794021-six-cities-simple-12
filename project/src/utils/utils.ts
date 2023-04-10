import { OfferSortingOption, RATING_TO_PERCENT_STEP } from 'src/consts/consts';
import { Offer, OfferId, Offers } from 'src/types/types';

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

export function throwErrorAtImpossibleCase (_arg: never) {
  throw new Error('This line should never be reached.');
}

export function getMultipleOfPlaceWord(count: number): string {
  if (count === 1 || count === -1) {
    return 'place';
  }
  return 'places';
}

export function findFirstOffer(offers: Offers, offerId: OfferId): Offer | null {
  return offers.find(({ id }) => id === offerId) ?? null;
}

export function getUniqueItems<T>(arr: Array<T>): Array<T> {
  return [...new Set(arr)];
}

export function filterOffersByCityName(offers: Offers, cityName: string): Offers {
  return offers.filter((offer) => offer.city.name === cityName);
}

export function isChildNode(parent: HTMLElement | null, node: HTMLElement | undefined): boolean {
  function assertHasParentNodeOrUndefined(item: EventTarget | undefined): asserts item is HTMLElement {
    if (item && !('parentNode' in item)) {
      throw new Error('Node or undefined expected');
    }
  }

  assertHasParentNodeOrUndefined(node);
  if (!parent || !node) {
    return false;
  }

  if (parent === node) {
    return true;
  }

  const { parentNode: surItem } = node;
  return isChildNode(parent, surItem as HTMLElement);
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
    default:
      throwErrorAtImpossibleCase(sortingType);
  }
  return newOffers;
}

export function makeHash(obj: object): string {
  return JSON.stringify(obj);
}

export function scrollToTop() {
  window && window.scrollTo(0, 0);
}
