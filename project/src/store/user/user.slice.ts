import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthorizationStatus } from 'src/consts/api';
import { DomainNamespace } from 'src/consts/domain';
import { UserLogin } from 'src/types/types';

const initialState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  avatarUrl: '' as string,
  isUserLoggingIn: false,
  login: '' as UserLogin,
};

export const user = createSlice({
  name: DomainNamespace.User,
  initialState,
  reducers: {
    setAuthorizationStatusAction: (state, { payload }:PayloadAction<AuthorizationStatus>) => {
      state.authorizationStatus = payload;
    },

    setIsUserLoggingInAction: (state, { payload }:PayloadAction<boolean>) => {
      state.isUserLoggingIn = payload;
    },

    setUserAvatarUrlAction: (state, { payload }:PayloadAction<string>) => {
      state.avatarUrl = payload;
    },

    setUserLoginAction: (state, { payload }:PayloadAction<string>) => {
      state.login = payload;
    },
  },
});

export const { setAuthorizationStatusAction, setIsUserLoggingInAction, setUserAvatarUrlAction, setUserLoginAction } = user.actions;
