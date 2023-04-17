import { FetchStatus } from 'src/consts/api';
import { DomainNamespace } from 'src/consts/domain';
import { AppState } from 'src/types/store';
import { ReviewsMap } from 'src/types/types';

export function getReviewsFetchStatusp(state: AppState): FetchStatus {
  return state[DomainNamespace.Reviews].fetchStatus;
}

export function getReviewsMap(state: AppState): ReviewsMap {
  return state[DomainNamespace.Reviews].dataMap;
}
