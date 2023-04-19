import { createSlice } from '@reduxjs/toolkit';
import { fetchReviewsAction } from 'src/store/api-reviews/api-reviews.actions';
import { DomainNamespace } from 'src/consts/domain';
import { FetchStatus } from 'src/consts/api';
import { ReviewsMap } from 'src/types/types';

const initialState = {
  dataMap: {} as ReviewsMap,
  fetchStatus: FetchStatus.NotStarted as FetchStatus,
};

export const reviews = createSlice({
  name: DomainNamespace.Reviews,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviewsAction.fulfilled, (state, { payload, meta }) => {
        const { id } = meta.arg;
        state.dataMap[id] = payload;
        state.fetchStatus = FetchStatus.FetchedWithNoError;
      })

      .addCase(fetchReviewsAction.pending, (state, { meta }) => {
        state.fetchStatus = FetchStatus.Pending;
      })

      .addCase(fetchReviewsAction.rejected, (state) => {
        state.fetchStatus = FetchStatus.FetchedWithError;
      });
  },
});
