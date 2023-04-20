import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { APIRoute } from 'src/consts/api';
import { AppDispatch, AppState } from 'src/types/store';
import { Offer, OfferId, Offers } from 'src/types/types';

export const fetchNearbyOffersAction = createAsyncThunk<Offers, OfferId, {
  dispatch: AppDispatch;
  state: AppState;
  extra: AxiosInstance;
}>(
  'data/fetchNearbyOffers',
  async (offerId, { extra: api }) => {
    const url = `${APIRoute.Offer}${offerId}${APIRoute.NearbyOffersForOffer}`;
    const { data } = await api.get<Offers>(url);
    return data;
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

