import { createAction } from '@reduxjs/toolkit';
import { AuthorizationStatus } from 'src/consts/api';
import { CityName, Offer, Offers, Reviews } from 'src/types/types';

export const setCity = createAction<CityName>('city/set');

export const setOffer = createAction<Offer>('offers/setOne');
export const setOffers = createAction<Offers>('offers/set');
export const setReviews = createAction<Reviews>('reviews/set');

export const setIsFetchingOffers = createAction<boolean>('data/setIsFetchingOffers');
export const setIsFetchedOffers = createAction<boolean>('data/setIsFetchedOffers');
export const setIsFetchingReviews = createAction<boolean>('data/setIsFetchinReviews');

export const setAuthorizationStatus =
  createAction<AuthorizationStatus>('user/setAuthorizationStatus');

export const setIsUserLoggingIn = createAction<boolean>('user/setIsLoggingIn');
export const setUserLogin = createAction<string>('user/setLogin');
export const setUserAvatarUrl = createAction<string>('user/setAvatarUrl');
// TODO rename file to 'actions.ts' ?
