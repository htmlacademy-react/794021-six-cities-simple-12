import { combineReducers } from '@reduxjs/toolkit';
import { data } from 'src/store/data/data.slice';
import { user } from 'src/store/user/user.slice';
import { DomainNamespace } from 'src/consts/domain';

export const rootReducer = combineReducers({
  [DomainNamespace.User]: user.reducer,
  [DomainNamespace.BusinessData]: data.reducer,
});
