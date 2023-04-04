import { OfferSortingVariant, RATING_TO_PERCENT_STEP } from 'src/consts/consts';
import { Location, Offer, Offers, OfferSortingOption, Reviews } from 'src/types/types';

export function calcGeoDistance(
  coordinate1: Location,
  coordinate2: Location,
) {
  const EARTH_RADIUS_IN_KILOMETERS = 6571;

  function calcDegreesFromRadians(degrees: number) {
    return (degrees * Math.PI) / 180;
  }

  const startingLat = calcDegreesFromRadians(coordinate1.latitude);
  const startingLong = calcDegreesFromRadians(coordinate1.longitude);
  const destinationLat = calcDegreesFromRadians(coordinate2.latitude);
  const destinationLong = calcDegreesFromRadians(coordinate2.longitude);

  // Haversine equation
  const distanceInKilometers =
    Math.acos(Math.sin(startingLat) * Math.sin(destinationLat) +
    Math.cos(startingLat) * Math.cos(destinationLat) *
    Math.cos(startingLong - destinationLong)) * EARTH_RADIUS_IN_KILOMETERS;

  return distanceInKilometers;
}

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

export function getOfferReviews(reviews: Reviews, offer: Offer | null): Reviews {
  if (!offer) {
    return [];
  }

  return reviews.filter((review) => review.id === offer.id);
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

export function getNearbyOffers(offers: Offers, offer: Offer, limitCount: number): Offers {
  const offersDistances = offers.map(({ id, location }) => {
    const distance = calcGeoDistance(location, offer.location);
    return {
      id,
      distance,
    };
  });

  offersDistances.sort((offer1, offer2) => offer1.distance - offer2.distance);
  offersDistances.splice(limitCount);
  const ids = offersDistances.map((offersDistance) => offersDistance.id);

  return offers.filter((iteratedOffer) => ids.includes(iteratedOffer.id));
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
    case OfferSortingVariant.popular.id: // FIXME: change to constant
      return offers;
    case OfferSortingVariant.priceLowToHigh.id:
      newOffers.sort((offer1, offer2) => offer1.price < offer2.price ? -1 : 1);
      break;
    case OfferSortingVariant.priceHighToLow.id:
      newOffers.sort((offer1, offer2) => offer1.price > offer2.price ? -1 : 1);
      break;
    case OfferSortingVariant.topRatedFirst.id:
      newOffers.sort((offer1, offer2) => offer1.rating > offer2.rating ? -1 : 1);
      break;
  }
  return newOffers;
}

export function makeHash(obj: object): string {
  return JSON.stringify(obj);
}

export function scrollToTop() {
  window && window.scrollTo(0, 0);
}
