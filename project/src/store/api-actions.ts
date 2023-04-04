import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, AppState } from 'src/types/state';
import { setOffersFetchingFinishedStatus, setOffers, setIsFetchingReviews, setReviews } from 'src/store/action';
import { APIRoute } from 'src/consts/api';
import { Offer, Offers, Reviews } from 'src/types/types';
import { store } from '.';

export const fetchOffers = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: AppState;
  extra: AxiosInstance;
}>(
  'data/fetchQuestions',
  async (_arg, { dispatch, extra: api }) => {
    dispatch(setOffersFetchingFinishedStatus(false));
    try {
      const { data: offers } = await api.get<Offers>(APIRoute.Offers);
      dispatch(setOffers(offers));
    } finally {
      dispatch(setOffersFetchingFinishedStatus(true));
    }
  },
);

export const fetchReviwes = createAsyncThunk<void, Offer, {
  dispatch: AppDispatch;
  state: AppState;
  extra: AxiosInstance;
}>(
  'data/fetchReviews',
  async (offer, { dispatch, extra: api }) => {
    if (store.getState().isFetchingReviews) {
      return;
    }

    dispatch(setIsFetchingReviews(true));
    const url = `${APIRoute.Reviews}/${offer.id.toString()}`;
    try {
      const { data: reviews } = await api.get<Reviews>(url);
      dispatch(setReviews(reviews));
    } finally {
      dispatch(setIsFetchingReviews(false));
    }
  },
);
