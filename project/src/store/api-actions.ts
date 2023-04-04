import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { store } from 'src/store';
import {
  setIsFetchingOffers, setOffers, setIsFetchedOffers,
  setIsFetchingReviews, setReviews,
  setIsUserLoggingIn, setAuthorizationStatus, setUserLogin,
} from 'src/store/action';
import { Token, setToken } from 'src/services/token';
import { APIRoute, AuthorizationStatus } from 'src/consts/api';
import { AppDispatch, AppState } from 'src/types/state';
import { Offer, Offers, Reviews } from 'src/types/types';
import { UserAuthorizationData } from 'src/types/api';

export const fetchOffers = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: AppState;
  extra: AxiosInstance;
}>(
  'data/fetchQuestions',
  async (_arg, { dispatch, extra: api }) => {
    dispatch(setIsFetchingOffers(true));
    try {
      const { data: offers } = await api.get<Offers>(APIRoute.Offers);
      dispatch(setOffers(offers));
      dispatch(setIsFetchedOffers(true));
    } finally {
      dispatch(setIsFetchingOffers(false));
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

export const logUserIn = createAsyncThunk<void, UserAuthorizationData, {
  dispatch: AppDispatch;
  state: AppState;
  extra: AxiosInstance;
}>(
  'user/login',
  async (authData, { dispatch, extra: api }) => {
    if (store.getState().isUserLoggingIn) {
      return;
    }
    dispatch(setIsUserLoggingIn(true));
    try {
      const { data: token } = await api.post<Token>(
        APIRoute.Login,
        authData,
      );
      setToken(token);
      dispatch(setAuthorizationStatus(AuthorizationStatus.Authorized));
    } catch {
      dispatch(setAuthorizationStatus(AuthorizationStatus.NotAuthorized));
    } finally {
      dispatch(setUserLogin(authData.email));
      dispatch(setIsUserLoggingIn(false));
    }
  },
);

export const logoutUser = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: AppState;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, { dispatch, extra: api }) => {
    setToken('');
    dispatch(setAuthorizationStatus(AuthorizationStatus.NotAuthorized));
    dispatch(setUserLogin(''));
    await api.delete<Token>(APIRoute.Logout);
  }
);
