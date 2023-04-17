import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DomainNamespace } from 'src/consts/domain';
import { INITIAL_CITY_NAME } from 'src/consts/consts';
import { Offers } from 'src/types/types';
import { fetchNearbyOffers, fetchOfferAction, fetchOffersAction } from '../api-actions';
import { FetchStatus } from 'src/consts/api';

const initialState = {
  areReviewsFetching: false,
  cityName: INITIAL_CITY_NAME,
  offers: [] as Offers,
  offerFetchStatus: FetchStatus.NotStarted as FetchStatus,
  offersFetchStatus: FetchStatus.NotStarted as FetchStatus,
  reviewsMap: {} as ReviewsMap,
};

export const data = createSlice({
  name: DomainNamespace.BusinessData,
  initialState,
  reducers: {
    setCityNameAction: (state, { payload }: PayloadAction<string>) => {
      state.cityName = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOfferAction.fulfilled, (state, { payload }) => {
        const foundIndex = state.offers.findIndex(
          ({ id }) => id === payload.id
        );

        if (foundIndex >= 0) {
          state.offers[foundIndex] = payload;
        } else {
          state.offers.push(payload);
        }

        state.offerFetchStatus = FetchStatus.FetchedWithNoError;
      })

      .addCase(fetchOfferAction.pending, (state) => {
        state.offerFetchStatus = FetchStatus.Pending;
      })

      .addCase(fetchOfferAction.rejected, (state) => {
        state.offerFetchStatus = FetchStatus.FetchedWithError;
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

export const { setCityNameAction } = data.actions;
