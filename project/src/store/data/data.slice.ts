import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DomainNamespace } from 'src/consts/domain';
import { INITIAL_CITY_NAME } from 'src/consts/consts';
import { Offers, ReviewsMap } from 'src/types/types';
import { fetchOfferAction, fetchOffersAction, fetchReviewsAction } from '../api-actions';
import { findFirstOffer } from 'src/utils/utils';
import { FetchStatus } from 'src/consts/api';

const initialState = {
  cityName: INITIAL_CITY_NAME,
  offersFetchStatus: FetchStatus.NotStarted as FetchStatus,
  isOfferFetching: false,
  areReviewsFetching: false,
  offers: [] as Offers,
  reviewsMap: {} as ReviewsMap,
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOfferAction.fulfilled, (state, { payload }) => {
        const foundOffer = findFirstOffer(state.offers, payload.id);
        if (foundOffer) {
          state.offers[foundOffer.id] = payload;
        } else {
          state.offers.push(payload);
        }
        state.isOfferFetching = false;
      })

      .addCase(fetchOfferAction.pending, (state) => {
        state.isOfferFetching = true;
      })

      .addCase(fetchOfferAction.rejected, (state) => {
        state.isOfferFetching = false;
      })

      .addCase(fetchOffersAction.fulfilled, (state, { payload }) => {
        state.offers = payload;
        state.offersFetchStatus = FetchStatus.FetchedWithNoError;
      })

      .addCase(fetchOffersAction.pending, (state) => {
        state.offersFetchStatus = FetchStatus.Pending;
      })

      .addCase(fetchOffersAction.rejected, (state) => {
        state.offersFetchStatus = FetchStatus.FetchedWithError;
      })

      .addCase(fetchReviewsAction.fulfilled, (state, { payload }) => {
        state.reviewsMap = { ...state.reviewsMap, ...payload };
        state.areReviewsFetching = false;
      })

      .addCase(fetchReviewsAction.pending, (state) => {
        state.areReviewsFetching = true;
      })

      .addCase(fetchReviewsAction.rejected, (state) => {
        state.areReviewsFetching = false;
      });
  }
});

export const {
  setCityNameAction,
} = data.actions;
