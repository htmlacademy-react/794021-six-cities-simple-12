import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { store } from 'src/store';
import {
  setIsFetchingOffers, setOffers, setIsFetchedOffers,
  setIsFetchingReviews, setReviews,
  setIsUserLoggingIn, setAuthorizationStatus, setUserLogin, setUserAvatarUrl,
} from 'src/store/action';
import { Token, dropToken, setToken } from 'src/services/token';
import { APIRoute, AuthorizationStatus } from 'src/consts/api';
import { AppRoute } from 'src/consts/consts';
import { AppDispatch, AppState } from 'src/types/state';
import { Offer, Offers, Reviews } from 'src/types/types';
import { UserAuthorizationData, UserData } from 'src/types/api';

export const fetchOffers = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: AppState;
  extra: AxiosInstance;
}>(
  'data/fetchQuestions',
  async (_arg, { dispatch, extra: api }) => {
    if (store.getState().isFetchingOffers) {
      return;
    }
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
  'user/logIn',
  async (authData, { dispatch, extra: api }) => {
    if (store.getState().isUserLoggingIn) {
      return;
    }
    dispatch(setIsUserLoggingIn(true));
    dispatch(setUserLogin(authData.email));
    try {
      const { data } = await api.post<UserData>(
        APIRoute.Login,
        authData,
      );
      setToken(data.token);
      dispatch(setAuthorizationStatus(AuthorizationStatus.Authorized));
      dispatch(setUserLogin(data.email));
      dispatch(setUserAvatarUrl(data.avatarUrl));
    } catch (_err) {
      dispatch(setAuthorizationStatus(AuthorizationStatus.NotAuthorized));
    } finally {
      dispatch(setIsUserLoggingIn(false));
    }
  },
);

export const logUserOut = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: AppState;
  extra: AxiosInstance;
}>(
  'user/logOut',
  async (_arg, { dispatch, extra: api }) => {
    dropToken();
    dispatch(setAuthorizationStatus(AuthorizationStatus.NotAuthorized));
    dispatch(setUserLogin(''));
    await api.delete<Token>(APIRoute.Logout);
  }
);

export const checkIfUserAuthorized = createAsyncThunk<void, void, {
  dispatch: AppDispatch;
  state: AppState;
  extra: AxiosInstance;
}>(
  'user/checkIfAuthorized',
  async (_arg, { dispatch, extra: api }) => {
    if (store.getState().isUserLoggingIn) {
      return;
    }
    dispatch(setIsUserLoggingIn(true));
    try {
      const { data } = await api.get<UserData>(AppRoute.Login);
      setToken(data.token);
      dispatch(setAuthorizationStatus(AuthorizationStatus.Authorized));
      dispatch(setUserLogin(data.email));
      dispatch(setUserAvatarUrl(data.avatarUrl));
    } catch (_err) {
      dispatch(setAuthorizationStatus(AuthorizationStatus.NotAuthorized));
    } finally {
      dispatch(setIsUserLoggingIn(false));
    }
  }
);
