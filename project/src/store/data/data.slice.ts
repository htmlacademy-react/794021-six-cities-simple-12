import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DomainNamespace } from 'src/consts/domain';
import { fetchOfferAction, fetchOffersAction } from '../api-actions';
import { FetchStatus } from 'src/consts/api';
import { DEFAULT_OFFER_SORTING_KEY_NAME, INITIAL_CITY_NAME, OfferSortingOption } from 'src/consts/consts';
import { Offers } from 'src/types/types';

const initialState = {
  cityName: INITIAL_CITY_NAME,
  offers: [] as Offers,
  offerFetchStatus: FetchStatus.NotStarted as FetchStatus,
  offersFetchStatus: FetchStatus.NotStarted as FetchStatus,
  sortingType: DEFAULT_OFFER_SORTING_KEY_NAME as OfferSortingOption,
};

export const data = createSlice({
  name: DomainNamespace.BusinessData,
  initialState,
  reducers: {
    setCityNameAction: (state, { payload }: PayloadAction<string>) => {
      state.cityName = payload;
    },

    setSortingTypeAction: (state, { payload }: PayloadAction<OfferSortingOption>) => {
      state.sortingType = payload;
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

        state.offerFetchStatus = FetchStatus.NotStarted;
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
      });
  },
});

export const { setCityNameAction, setSortingTypeAction } = data.actions;
