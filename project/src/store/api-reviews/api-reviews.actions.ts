import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { APIRoute } from 'src/consts/api';
import { AppDispatch, AppState } from 'src/types/store';
import { Offer, Reviews } from 'src/types/types';
import { UserReviewSendingData } from 'src/types/api';
import { DomainNamespace } from 'src/consts/domain';


export const fetchReviewsAction = createAsyncThunk<Reviews, Offer, {
  dispatch: AppDispatch;
  state: AppState;
  extra: AxiosInstance;
}>(
  'reviews/fetch',
  async (offer, { extra: api }) => {
    const url = `${APIRoute.Reviews}${offer.id.toString()}`;
    const { data: reviews } = await api.get<Reviews>(url);
    return reviews;
  },
);

export const sendReviewAction = createAsyncThunk<Reviews, undefined, {
  dispatch: AppDispatch;
  state: AppState;
  extra: AxiosInstance;
}>(
  'reviews/sendOne',
  async (_arg, { getState, extra: api }) => {
    const { userComment, userOfferId, userRating } = getState()[DomainNamespace.Reviews];
    if (!userOfferId) {
      throw new Error('No offer-id provided for the comment');
    }
    const apiPath = `${APIRoute.Reviews}${userOfferId.toString()}`;
    const review: UserReviewSendingData = {
      comment: userComment,
      rating: userRating,
    };
    const { data: reviews } = await api.post<Reviews>(
      apiPath,
      review,
    );
    return reviews;
  },
);
