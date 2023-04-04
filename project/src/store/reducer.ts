import { createReducer } from '@reduxjs/toolkit';
import { INITIAL_CITY_NAME } from 'src/consts/consts';
import { changeCity,setOffers, setOffersFetchingFinishedStatus } from './action';
import { Offers } from 'src/types/types';

const initialState = {
  cityName: INITIAL_CITY_NAME,
  isFinishedOffersFetching: false,
  offers: [] as Offers,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      if (action.payload === state.cityName) {
        return;
      }
      state.cityName = action.payload;
    })

    .addCase(setOffers, (state, action) => {
      state.offers = action.payload;
    })

    .addCase(setOffersFetchingFinishedStatus, (state, action) => {
      state.isFinishedOffersFetching = action.payload;
    })

    });
});

