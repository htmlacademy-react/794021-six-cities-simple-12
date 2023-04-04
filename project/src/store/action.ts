import { createAction } from '@reduxjs/toolkit';
import { CityName, Offers, Reviews } from 'src/types/types';

export const changeCity = createAction<CityName>('city/change');

export const setOffers = createAction<Offers>('offers/set');
export const setReviews = createAction<Reviews>('reviews/set');

export const setIsFetchingOffers = createAction<boolean>('data/setIsFetchingOffers');
export const setIsFetchedOffers = createAction<boolean>('data/setIsFetchedOffers');
export const setIsFetchingReviews = createAction<boolean>('data/setIsFetchinReviews');
// TODO rename file to 'actions.ts' ?
