import { configureStore } from '@reduxjs/toolkit';
import { reducer } from 'src/store/reducer';
import { createAPI } from 'src/services/api';

export const api = createAPI();

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});
