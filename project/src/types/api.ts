import { OfferId } from './types';

export type UserAuthorizationData = {
  email: string;
  password: string;
}

export type UserData = {
  avatarUrl: string;
  email: string;
  token: string;
}

export type UserReviewActionData = {
  comment: string;
  id: OfferId;
  rating: number;
}

export type UserReviewSendingData = {
  comment: string;
  rating: number;
}
