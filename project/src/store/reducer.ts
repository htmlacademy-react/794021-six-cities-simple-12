import { createReducer } from '@reduxjs/toolkit';
import { INITIAL_CITY_NAME } from 'src/consts/consts';
import { changeCity, setOffers, setOffersFetchingStatus } from './action';
import { Offers } from 'src/types/types';

const initialState = {
  cityName: INITIAL_CITY_NAME,
  isStartedFetching: false,
  offers: [] as Offers,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      if (action.payload === state.cityName) {
        return;
      }
      state.cityName = action.payload;
    })

    .addCase(setOffers, (state, action) => {
      state.offers = action.payload;
    })

    .addCase(setOffersFetchingStatus, (state, action) => {
      state.isStartedFetching = action.payload;
    });
});

