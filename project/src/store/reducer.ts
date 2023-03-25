import { createReducer } from '@reduxjs/toolkit';
import { currentCity } from 'src/mocks/mocks';
import { offers as allOffers} from 'src/mocks/offers';
import { filterOffersByCityName } from 'src/utils/utils';
import { changeCity, resetCity } from './action';

const initialState = {
  cityName: currentCity.name,
  offers: filterOffersByCityName(allOffers, currentCity.name),
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(resetCity, (state) => {
      if (state.cityName === initialState.cityName) {
        return;
      }
      state.cityName = initialState.cityName;
      state.offers = initialState.offers;
    })
    .addCase(changeCity, (state, action) => {
      if (action.payload === state.cityName) {
        return;
      }
      state.cityName = action.payload;
      state.offers = filterOffersByCityName(allOffers, action.payload);
    });
});

