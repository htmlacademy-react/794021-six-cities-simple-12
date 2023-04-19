import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { APIRoute } from 'src/consts/api';
import { AppDispatch, AppState } from 'src/types/store';
import { Offer, Reviews } from 'src/types/types';


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
