import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  setIsFetchingReviewsAction, setReviewsAction,
} from 'src/store/data/data.slice';
import { Token } from 'src/services/token';
import { APIRoute } from 'src/consts/api';
import { AppRoute } from 'src/consts/consts';
import { DomainNamespace } from 'src/consts/domain';
import { AppDispatch, AppState } from 'src/types/store';
import { Offer, OfferId, Offers, Reviews } from 'src/types/types';
import { UserAuthorizationData, UserData } from 'src/types/api';

export const fetchOffersAction = createAsyncThunk<Offers, undefined, {
  dispatch: AppDispatch;
  state: AppState;
  extra: AxiosInstance;
}>(
  'data/fetchOffers',
  async (_arg, { extra: api }) => {
    const { data: offers } = await api.get<Offers>(APIRoute.Offers);
    return offers;
  },
);

export const fetchOfferAction = createAsyncThunk<Offer, OfferId, {
  dispatch: AppDispatch;
  state: AppState;
  extra: AxiosInstance;
}>(
  'data/fetchOffer',
  async (offerId, { extra: api }) => {
    const url = `${APIRoute.Offer}${offerId}`;
    const { data } = await api.get<Offer>(url);
    return data;
  },
);

export const fetchReviewsAction = createAsyncThunk<void, Offer, {
  dispatch: AppDispatch;
  state: AppState;
  extra: AxiosInstance;
}>(
  'data/fetchReviews',
  async (offer, { dispatch, extra: api, getState }) => {
    const state = getState();
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

export const logUserInAction = createAsyncThunk<Token, UserAuthorizationData, {
  dispatch: AppDispatch;
  state: AppState;
  extra: AxiosInstance;
}>(
  'user/logIn',
  async (authData, { extra: api }) => {
    const { data } = await api.post<UserData>(
      APIRoute.Login,
      authData,
    );
    return data.token;
  },
);

export const logUserOutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: AppState;
  extra: AxiosInstance;
}>(
  'user/logOut',
  async (_arg, { extra: api }) => {
    await api.delete<Token>(APIRoute.Logout);
  }
);

export const checkIfUserAuthorizedAction = createAsyncThunk<UserData, void, {
  extra: AxiosInstance;
}>(
  'user/checkIfAuthorized',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<UserData>(AppRoute.Login);
    return data;
  }
);
