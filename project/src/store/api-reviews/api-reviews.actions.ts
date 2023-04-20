import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { APIRoute } from 'src/consts/api';
import { AppDispatch, AppState } from 'src/types/store';
import { Offer, Reviews } from 'src/types/types';
import { UserReviewActionData, UserReviewSendingData } from 'src/types/api';


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

export const sendReviewAction = createAsyncThunk<Reviews, UserReviewActionData, {
  dispatch: AppDispatch;
  state: AppState;
  extra: AxiosInstance;
}>(
  'reviews/sendOne',
  async (reviewData, { extra: api }) => {
    const apiPath = `${APIRoute.Reviews}${reviewData.id.toString()}`;
    const review: UserReviewSendingData = {
      comment: reviewData.comment,
      rating: reviewData.rating,
    };
    const { data: reviews } = await api.post<Reviews>(
      apiPath,
      review,
    );
    return reviews;
  },
);
