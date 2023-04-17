import { createSlice } from '@reduxjs/toolkit';
import { DomainNamespace } from 'src/consts/domain';
import { OfferId, Offers } from 'src/types/types';
import { fetchNearbyOffersAction } from '../api-actions';
import { FetchStatus } from 'src/consts/api';

const initialState = {
  items: [] as Offers,
  offerId: null as OfferId | null,
  fetchStatus: FetchStatus.NotStarted as FetchStatus,
};

export const nearbyOffers = createSlice({
  name: DomainNamespace.NearbyOffers,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNearbyOffersAction.fulfilled, (state, { payload, meta }) => {
        state.items = payload;
        state.offerId = meta.arg;
        state.fetchStatus = FetchStatus.FetchedWithNoError;
      })

      .addCase(fetchNearbyOffersAction.pending, (state, { meta }) => {
        state.fetchStatus = FetchStatus.Pending;
        state.items = [];
        state.offerId = meta.arg;
      })

      .addCase(fetchNearbyOffersAction.rejected, (state, { meta }) => {
        state.fetchStatus = FetchStatus.FetchedWithError;
        state.offerId = meta.arg;
      });
  },
});
