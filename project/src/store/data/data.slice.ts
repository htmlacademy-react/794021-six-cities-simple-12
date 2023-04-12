import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DomainNamespace } from 'src/consts/domain';
import { INITIAL_CITY_NAME } from 'src/consts/consts';
import { Offers, ReviewsMap } from 'src/types/types';
import { fetchOfferAction, fetchOffersAction, fetchReviewsAction } from '../api-actions';
import { getFirstOffer } from 'src/utils/utils';

const initialState = {
  cityName: INITIAL_CITY_NAME,
  areOffersFetched: false,
  areOffersFetching: false,
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
      .addCase(fetchOfferAction.pending, (state) => {
        state.isOfferFetching = true;
      })

      .addCase(fetchOfferAction.fulfilled, (state, { payload }) => {
        const foundOffer = getFirstOffer(state.offers, payload.id);
        if (foundOffer) {
          state.offers[foundOffer.id] = payload;
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
      })

      .addCase(fetchReviewsAction.pending, (state) => {
        state.areReviewsFetching = true;
      })

      .addCase(fetchReviewsAction.fulfilled, (state, { payload }) => {
        state.reviewsMap = { ...state.reviewsMap, ...payload };
        state.areReviewsFetching = false;
      })

      .addCase(fetchReviewsAction.rejected, (state) => {
        state.areReviewsFetching = false;
      });
  }
});

export const {
  setCityNameAction,
} = data.actions;
