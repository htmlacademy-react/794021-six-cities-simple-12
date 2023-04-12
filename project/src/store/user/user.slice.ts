import { createSlice } from '@reduxjs/toolkit';
import { AuthorizationStatus } from 'src/consts/api';
import { DomainNamespace } from 'src/consts/domain';
import { UserLogin } from 'src/types/types';
import { checkIfUserAuthorizedAction, logUserInAction, logUserOutAction } from '../api-actions';
import { dropToken, setToken } from 'src/services/token';

const initialState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  avatarUrl: '' as string,
  login: '' as UserLogin,
};

export const user = createSlice({
  name: DomainNamespace.User,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(checkIfUserAuthorizedAction.fulfilled, (state, { payload }) => {
        state.authorizationStatus = AuthorizationStatus.Authorized;
        state.login = payload.email;
        state.avatarUrl = payload.avatarUrl;
      })

      .addCase(checkIfUserAuthorizedAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NotAuthorized;
      })

      .addCase(logUserInAction.fulfilled, (state, { payload }) => {
        setToken(payload.token);
        state.avatarUrl = payload.avatarUrl;
        state.login = payload.email;
        state.authorizationStatus = AuthorizationStatus.Authorized;
      })

      .addCase(logUserInAction.pending, (state, { meta }) => {
        state.login = meta.arg?.email;
      })

      .addCase(logUserInAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NotAuthorized;
      })

      .addCase(logUserOutAction.pending, (state) => {
        dropToken();
        state.login = '';
        state.authorizationStatus = AuthorizationStatus.NotAuthorized;
      });
  }
});
