import { FetchStatus } from 'src/consts/api';
import { DomainNamespace } from 'src/consts/domain';
import { AppState } from 'src/types/store';
import { OfferId, ReviewsMap } from 'src/types/types';

export function getReviewsFetchStatusp(state: AppState): FetchStatus {
  return state[DomainNamespace.Reviews].fetchStatus;
}

export function getReviewSendStatus(state: AppState): FetchStatus {
  return state[DomainNamespace.Reviews].sendStatus;
}

export function getReviewsMap(state: AppState): ReviewsMap {
  return state[DomainNamespace.Reviews].dataMap;
}

export function getUserComment(id: OfferId) {
  return function (state: AppState): string {
    if (state[DomainNamespace.Reviews].userOfferId !== id) {
      return '';
    }
    return state[DomainNamespace.Reviews].userComment;
  };
}

export function getUserRating(id: OfferId) {
  return function (state: AppState): number {
    if (state[DomainNamespace.Reviews].userOfferId !== id) {
      return NaN;
    }
    return state[DomainNamespace.Reviews].userRating;
  };
}
