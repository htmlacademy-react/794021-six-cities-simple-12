import { combineReducers } from '@reduxjs/toolkit';
import { data } from 'src/store/data/data.slice';
import { nearbyOffers } from './nearby-offers/nearby-offers.slice';
import { reviews } from 'src/store/reviews/reviews.slice';
import { user } from 'src/store/user/user.slice';
import { DomainNamespace } from 'src/consts/domain';

export const rootReducer = combineReducers({
  [DomainNamespace.BusinessData]: data.reducer,
  [DomainNamespace.NearbyOffers]: nearbyOffers.reducer,
  [DomainNamespace.Reviews]: reviews.reducer,
  [DomainNamespace.User]: user.reducer,
});
