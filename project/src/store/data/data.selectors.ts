import { DomainNamespace } from 'src/consts/domain';
import { AppState } from 'src/types/store';
import { CityName, Offers, Reviews } from 'src/types/types';

export function getCityName(state: AppState): CityName {
  return state[DomainNamespace.BusinessData].cityName;
}

export function getOffers(state: AppState): Offers {
  return state[DomainNamespace.BusinessData].offers;
}

export function getReviews(state: AppState): Reviews {
  return state[DomainNamespace.BusinessData].reviews;
}
