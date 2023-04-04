import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, AppState } from 'src/types/state';
import { setOffersFetchingFinishedStatus, setOffers } from 'src/store/action';
import { APIRoute } from 'src/consts/api';
import { Offers } from 'src/types/types';

export const fetchOffers = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: AppState;
  extra: AxiosInstance;
}>(
  'data/fetchQuestions',
  async (_arg, { dispatch, extra: api }) => {
    dispatch(setOffersFetchingFinishedStatus(false));
    try {
      const { data: offers } = await api.get<Offers>(APIRoute.Offers);
      dispatch(setOffers(offers));
    } finally {
      dispatch(setOffersFetchingFinishedStatus(true));
    }
  },
);
    }
  },
);
