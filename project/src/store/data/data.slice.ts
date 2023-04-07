import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DomainNamespace } from 'src/consts/domain';
import { INITIAL_CITY_NAME } from 'src/consts/consts';
import { Offer, Offers, Reviews } from 'src/types/types';

const initialState = {
  cityName: INITIAL_CITY_NAME,
  isFetchedOffers: false,
  isFetchingOffers: false,
  isFetchingReviews: false,
  offers: [] as Offers,
  reviews: [] as Reviews,
};

export const data = createSlice({
  name: DomainNamespace.BusinessData,
  initialState,
  reducers: {
    setCityNameAction: (state, { payload }: PayloadAction<string>) => {
      if (payload === state.cityName) {
        return;
      }
      state.cityName = payload;
    },

    setOffersAction: (state, { payload }: PayloadAction<Offers>) => {
      state.offers = payload;
    },

    setOfferAction: (state, { payload }: PayloadAction<Offer>) => {
      const foundIndex = state.offers.findIndex(({ id }) => id === payload.id);
      if (foundIndex >= 0) {
        state.offers[foundIndex] = payload;
        return;
      }
      state.offers.push(payload);
    },

    setReviewsAction: (state, { payload }: PayloadAction<Reviews>) => {
      state.reviews = payload;
    },

    setIsFetchingOffersAction: (state, { payload }: PayloadAction<boolean>) => {
      state.isFetchingOffers = payload;
    },

    setIsFetchedOffersAction: (state, { payload }: PayloadAction<boolean>) => {
      state.isFetchedOffers = payload;
    },

    setIsFetchingReviewsAction: (state, { payload }: PayloadAction<boolean>) => {
      state.isFetchingReviews = payload;
    },
  },
});

export const {
  setCityNameAction,
  setOfferAction,
  setOffersAction,
  setReviewsAction,
  setIsFetchingOffersAction,
  setIsFetchingReviewsAction,
  setIsFetchedOffersAction,
} = data.actions;
