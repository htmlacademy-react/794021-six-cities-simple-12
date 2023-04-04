import { createReducer } from '@reduxjs/toolkit';
import { INITIAL_CITY_NAME } from 'src/consts/consts';
import { changeCity,setOffers, setIsFetchingOffers, setReviews, setIsFetchingReviews, setIsFetchedOffers } from './action';
import { Offers, Reviews } from 'src/types/types';

const initialState = {
  cityName: INITIAL_CITY_NAME,
  isFetchingOffers: false,
  isFetchedOffers: false,
  isFetchingReviews: false,
  offers: [] as Offers,
  reviews: [] as Reviews,
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

    .addCase(setReviews, (state, action) => {
      state.reviews = action.payload;
    })

    .addCase(setIsFetchingOffers, (state, action) => {
      state.isFetchingOffers = action.payload;
    })

    .addCase(setIsFetchedOffers, (state, action) => {
      state.isFetchedOffers = action.payload;
    })

    .addCase(setIsFetchingReviews, (state, action) => {
      state.isFetchingReviews = action.payload;
    });
});

