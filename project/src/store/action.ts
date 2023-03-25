import { createAction } from '@reduxjs/toolkit';
import { CityName, Offers } from 'src/types/types';

export const changeCity = createAction<CityName>('city/change');

export const setOffers = createAction<Offers>('offers/set');
