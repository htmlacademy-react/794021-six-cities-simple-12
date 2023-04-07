import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DomainNamespace } from 'src/consts/domain';
import { INITIAL_CITY_NAME } from 'src/consts/consts';
import { Offers, Reviews } from 'src/types/types';
import { fetchOfferAction, fetchOffersAction } from '../api-actions';

const initialState = {
  cityName: INITIAL_CITY_NAME,
  areOffersFetched: false,
  areOffersFetching: false,
  isOfferFetching: false,
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

    setReviewsAction: (state, { payload }: PayloadAction<Reviews>) => {
      state.reviews = payload;
    },

    setIsFetchingReviewsAction: (state, { payload }: PayloadAction<boolean>) => {
      state.isFetchingReviews = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOfferAction.pending, (state) => {
        state.isOfferFetching = true;
      })

      .addCase(fetchOfferAction.fulfilled, (state, { payload }) => {
        const foundIndex = state.offers.findIndex(({ id }) => id === payload.id);
        if (foundIndex >= 0) {
          state.offers[foundIndex] = payload;
        } else {
          state.offers.push(payload);
        }
        state.isOfferFetching = false;
      })

      .addCase(fetchOfferAction.rejected, (state) => {
        state.isOfferFetching = false;
      })

      .addCase(fetchOffersAction.pending, (state) => {
        state.areOffersFetching = true;
      })

      .addCase(fetchOffersAction.fulfilled, (state, { payload }) => {
        state.offers = payload;
        state.areOffersFetched = true;
        state.areOffersFetching = false;
      })

      .addCase(fetchOffersAction.rejected, (state) => {
        state.areOffersFetched = false;
        state.areOffersFetching = false;
      });
  }
});

export const {
  setCityNameAction,
  setReviewsAction,
  setIsFetchingReviewsAction,
} = data.actions;
