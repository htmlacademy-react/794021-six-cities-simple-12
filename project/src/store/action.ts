import { createAction } from '@reduxjs/toolkit';
import { AuthorizationStatus } from 'src/consts/api';
import { CityName, Offers, Reviews } from 'src/types/types';

export const changeCity = createAction<CityName>('city/change');

export const setOffers = createAction<Offers>('offers/set');
export const setReviews = createAction<Reviews>('reviews/set');

export const setIsFetchingOffers = createAction<boolean>('data/setIsFetchingOffers');
export const setIsFetchedOffers = createAction<boolean>('data/setIsFetchedOffers');
export const setIsFetchingReviews = createAction<boolean>('data/setIsFetchinReviews');

export const setAuthorizationStatus =
  createAction<AuthorizationStatus>('user/setAuthorizationStatus');
// TODO rename file to 'actions.ts' ?
