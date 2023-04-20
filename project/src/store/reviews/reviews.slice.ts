import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { fetchReviewsAction, sendReviewAction } from 'src/store/api-reviews/api-reviews.actions';
import { DomainNamespace } from 'src/consts/domain';
import { FetchStatus } from 'src/consts/api';
import { OfferId, ReviewsMap } from 'src/types/types';

type CommentData = {
  value: string;
  offerId: OfferId;
}

type RatingData = {
  value: number;
  offerId: OfferId;
}

const initialState = {
  dataMap: {} as ReviewsMap,
  fetchStatus: FetchStatus.NotStarted as FetchStatus,
  sendStatus: FetchStatus.NotStarted as FetchStatus,
  userOfferId: null as OfferId | null,
  userComment: '' as string,
  userRating: NaN,
};

export const reviews = createSlice({
  name: DomainNamespace.Reviews,
  initialState,
  reducers: {
    setUserCommentAction: (state, { payload }: PayloadAction<CommentData>) => {
      if (payload.offerId !== state.userOfferId) {
        state.userOfferId = payload.offerId;
        state.userRating = NaN;
      }
      state.userComment = payload.value;
    },

    setUserRatingAction: (state, { payload }: PayloadAction<RatingData>) => {
      if (payload.offerId !== state.userOfferId) {
        state.userOfferId = payload.offerId;
        state.userComment = '';
      }
      state.userRating = payload.value;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviewsAction.fulfilled, (state, { payload, meta }) => {
        const { id } = meta.arg;
        state.dataMap[id] = payload;
        state.fetchStatus = FetchStatus.FetchedWithNoError;
      })

      .addCase(fetchReviewsAction.pending, (state) => {
        state.fetchStatus = FetchStatus.Pending;
      })

      .addCase(fetchReviewsAction.rejected, (state) => {
        state.fetchStatus = FetchStatus.FetchedWithError;
      })

      .addCase(sendReviewAction.fulfilled, (state, { payload }) => {
        if (state.userOfferId) {
          state.dataMap[state.userOfferId] = payload;
        }
        state.sendStatus = FetchStatus.FetchedWithNoError;
        state.userComment = '';
        state.userRating = NaN;
        state.userOfferId = null;
      })

      .addCase(sendReviewAction.pending, (state) => {
        state.sendStatus = FetchStatus.Pending;
      })

      .addCase(sendReviewAction.rejected, (state) => {
        state.sendStatus = FetchStatus.FetchedWithError;
      });
  },
});

export const { setUserCommentAction, setUserRatingAction } = reviews.actions;
