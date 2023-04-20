import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Token } from 'src/services/token';
import { APIRoute } from 'src/consts/api';
import { AppRoute } from 'src/consts/consts';
import { AppDispatch, AppState } from 'src/types/store';
import { UserAuthorizationData, UserData } from 'src/types/api';

export const checkIfUserAuthorizedAction = createAsyncThunk<UserData, void, {
  extra: AxiosInstance;
}>(
  'user/checkIfAuthorized',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<UserData>(AppRoute.Login);
    return data;
  }
);

export const logUserInAction = createAsyncThunk<UserData, UserAuthorizationData, {
  dispatch: AppDispatch;
  state: AppState;
  extra: AxiosInstance;
}>(
  'user/logIn',
  async (authData, { extra: api }) => {
    const { data: userData } = await api.post<UserData>(
      APIRoute.Login,
      authData,
    );
    return userData;
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
