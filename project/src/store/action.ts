import { createAction } from '@reduxjs/toolkit';
import { CityName } from 'src/types/types';

export const resetCity = createAction('city/reset');

export const changeCity = createAction<CityName>('city/change');
