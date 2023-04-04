import { createReducer } from '@reduxjs/toolkit';
import {
  changeCity, // TODO: rename 'change' to 'set...'
  setOffers, setIsFetchingOffers, setIsFetchedOffers,
  setReviews, setIsFetchingReviews,
  setAuthorizationStatus, setUserLogin, setIsUserLoggingIn,
} from './action';
import { INITIAL_CITY_NAME } from 'src/consts/consts';
import { AuthorizationStatus } from 'src/consts/api';
import { Offers, Reviews, UserLogin } from 'src/types/types';

const initialState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  cityName: INITIAL_CITY_NAME,
  isFetchedOffers: false,
  isFetchingOffers: false,
  isFetchingReviews: false,
  isUserLoggingIn: false,
  offers: [] as Offers,
  reviews: [] as Reviews,
  userLogin: '' as UserLogin,
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
    })

    .addCase(setAuthorizationStatus, (state, action) => {
      state.authorizationStatus = action.payload;
    })

    .addCase(setUserLogin, (state, action) => {
      state.userLogin = action.payload;
    })

    .addCase(setIsUserLoggingIn, (state, action) => {
      state.isUserLoggingIn = action.payload;
    });
});

