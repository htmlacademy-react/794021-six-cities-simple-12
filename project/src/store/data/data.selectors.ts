import { FetchStatus } from 'src/consts/api';
import { DomainNamespace } from 'src/consts/domain';
import { AppState } from 'src/types/store';
import { CityName, OfferId, Offers } from 'src/types/types';

export function getCityName(state: AppState): CityName {
  return state[DomainNamespace.BusinessData].cityName;
}

export function getNearbyOffers(state: AppState): Offers {
  return state[DomainNamespace.NearbyOffers].items;
}

export function getNearbyOffersFetchStatus(state: AppState): FetchStatus {
  return state[DomainNamespace.NearbyOffers].fetchStatus;
}

export function getNearbyOffersOfferId(state: AppState): OfferId | null {
  return state[DomainNamespace.NearbyOffers].offerId;
}

export function getOfferFetchStatus(state: AppState): FetchStatus {
  return state[DomainNamespace.BusinessData].offerFetchStatus;
}

export function getOffers(state: AppState): Offers {
  return state[DomainNamespace.BusinessData].offers;
}
