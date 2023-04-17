import { FetchStatus } from 'src/consts/api';
import { DomainNamespace } from 'src/consts/domain';
import { AppState } from 'src/types/store';
import { CityName, Offers, ReviewsMap } from 'src/types/types';

export function getCityName(state: AppState): CityName {
  return state[DomainNamespace.BusinessData].cityName;
}

export function getOfferFetchStatus(state: AppState): FetchStatus {
  return state[DomainNamespace.BusinessData].offerFetchStatus;
}

export function getOffers(state: AppState): Offers {
  return state[DomainNamespace.BusinessData].offers;
}

export function getReviewsMap(state: AppState): ReviewsMap {
  return state[DomainNamespace.BusinessData].reviewsMap;
}
