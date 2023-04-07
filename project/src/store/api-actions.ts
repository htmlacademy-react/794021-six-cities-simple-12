import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { store } from 'src/store';
import {
  setIsFetchingOffersAction, setOffersAction, setIsFetchedOffersAction,
  setIsFetchingReviewsAction, setReviewsAction, setOfferAction,
} from 'src/store/data/data.slice';
import {
  setIsUserLoggingInAction, setAuthorizationStatusAction, setUserLoginAction, setUserAvatarUrlAction,
} from 'src/store/user/user.slice';
import { Token, dropToken, setToken } from 'src/services/token';
import { APIRoute, AuthorizationStatus } from 'src/consts/api';
import { AppRoute } from 'src/consts/consts';
import { DomainNamespace } from 'src/consts/domain';
import { AppDispatch, AppState } from 'src/types/store';
import { Offer, OfferId, Offers, Reviews } from 'src/types/types';
import { UserAuthorizationData, UserData } from 'src/types/api';

export const fetchOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: AppState;
  extra: AxiosInstance;
}>(
  'data/fetchOffers',
  async (_arg, { dispatch, extra: api }) => {
    const state = store.getState();
    if (state[DomainNamespace.BusinessData].isFetchingOffers) {
      return;
    }
    dispatch(setIsFetchingOffersAction(true));
    try {
      const { data: offers } = await api.get<Offers>(APIRoute.Offers);
      dispatch(setOffersAction(offers));
      dispatch(setIsFetchedOffersAction(true));
    } finally {
      dispatch(setIsFetchingOffersAction(false));
    }
  },
);

export const fetchOfferAction = createAsyncThunk<void, OfferId, {
  dispatch: AppDispatch;
  state: AppState;
  extra: AxiosInstance;
}>(
  'data/fetchOffer',
  async (offerId, { dispatch, extra: api }) => {
    const state = store.getState();
    if (state[DomainNamespace.BusinessData].isFetchingOffers) {
      return;
    }
    dispatch(setIsFetchingOffersAction(true));
    try {
      const url = `${APIRoute.Offer}${offerId}`;
      const { data: offer } = await api.get<Offer>(url);
      dispatch(setOfferAction(offer));
    } finally {
      dispatch(setIsFetchingOffersAction(false));
    }
  },
);

export const fetchReviwesAction = createAsyncThunk<void, Offer, {
  dispatch: AppDispatch;
  state: AppState;
  extra: AxiosInstance;
}>(
  'data/fetchReviews',
  async (offer, { dispatch, extra: api }) => {
    const state = store.getState();
    if (state[DomainNamespace.BusinessData].isFetchingReviews) {
      return;
    }

    dispatch(setIsFetchingReviewsAction(true));
    const url = `${APIRoute.Reviews}/${offer.id.toString()}`;
    try {
      const { data: reviews } = await api.get<Reviews>(url);
      dispatch(setReviewsAction(reviews));
    } finally {
      dispatch(setIsFetchingReviewsAction(false));
    }
  },
);

export const logUserInAction = createAsyncThunk<void, UserAuthorizationData, {
  dispatch: AppDispatch;
  state: AppState;
  extra: AxiosInstance;
}>(
  'user/logIn',
  async (authData, { dispatch, extra: api }) => {
    const state = store.getState();
    if (state[DomainNamespace.User].isUserLoggingIn) {
      return;
    }
    dispatch(setIsUserLoggingInAction(true));
    dispatch(setUserLoginAction(authData.email));
    try {
      const { data } = await api.post<UserData>(
        APIRoute.Login,
        authData,
      );
      setToken(data.token);
      dispatch(setAuthorizationStatusAction(AuthorizationStatus.Authorized));
      dispatch(setUserLoginAction(data.email));
      dispatch(setUserAvatarUrlAction(data.avatarUrl));
    } catch (_err) {
      dispatch(setAuthorizationStatusAction(AuthorizationStatus.NotAuthorized));
    } finally {
      dispatch(setIsUserLoggingInAction(false));
    }
  },
);

export const logUserOutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: AppState;
  extra: AxiosInstance;
}>(
  'user/logOut',
  async (_arg, { dispatch, extra: api }) => {
    dropToken();
    dispatch(setAuthorizationStatusAction(AuthorizationStatus.NotAuthorized));
    dispatch(setUserLoginAction(''));
    await api.delete<Token>(APIRoute.Logout);
  }
);

export const checkIfUserAuthorizedAction = createAsyncThunk<void, void, {
  dispatch: AppDispatch;
  state: AppState;
  extra: AxiosInstance;
}>(
  'user/checkIfAuthorized',
  async (_arg, { dispatch, extra: api, getState }) => {
    const state = getState();
    if (state[DomainNamespace.User].isUserLoggingIn) {
      return;
    }
    if (state[DomainNamespace.User].authorizationStatus !== AuthorizationStatus.Unknown) {
      return;
    }
    dispatch(setIsUserLoggingInAction(true));
    try {
      const { data } = await api.get<UserData>(AppRoute.Login);
      setToken(data.token);
      dispatch(setAuthorizationStatusAction(AuthorizationStatus.Authorized));
      dispatch(setUserLoginAction(data.email));
      dispatch(setUserAvatarUrlAction(data.avatarUrl));
    } catch (_err) {
      dispatch(setAuthorizationStatusAction(AuthorizationStatus.NotAuthorized));
    } finally {
      dispatch(setIsUserLoggingInAction(false));
    }
  }
);

