import { FetchStatus } from 'src/consts/api';
import { DomainNamespace } from 'src/consts/domain';
import { AppState } from 'src/types/store';
import { ReviewsMap } from 'src/types/types';

export function getReviewsFetchStatusp(state: AppState): FetchStatus {
  return state[DomainNamespace.Reviews].fetchStatus;
}

export function getReviewSendStatus(state: AppState): FetchStatus {
  return state[DomainNamespace.Reviews].sendStatus;
}

export function getReviewsMap(state: AppState): ReviewsMap {
  return state[DomainNamespace.Reviews].dataMap;
}

export function getUserComment(state: AppState): string {
  return state[DomainNamespace.Reviews].userComment;
}

export function getUserRating(state: AppState): number {
  return state[DomainNamespace.Reviews].userRating;
}
