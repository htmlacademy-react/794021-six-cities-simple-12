import { fetchOfferAction } from '../api-actions';
import { data, setCityNameAction } from './data.slice';
const { reducer } = data;

export enum FetchStatus { // TODO exclude importing, make local
  FetchedWithError = 'fetched-with-error',
  FetchedWithNoError = 'fetched-with-no-error',
  NotStarted = 'not-started',
  Pending = 'pending',
}

describe('Reducer: data', () => {
  it('returns initial state if sent unknown action', () => {
    expect(reducer(undefined, { type: 'FAKE_ACTION' }))
      .toEqual({
        cityName: 'Paris',
        offersFetchStatus: FetchStatus.NotStarted as FetchStatus,
        isOfferFetching: false,
        areReviewsFetching: false,
        offers: [],
        reviewsMap: {},
      });
  });

  it('sets city name', () => {
    const initialState = reducer(undefined, { type: 'FAKE_ACTION' });

    const stateToBe = {
      ...initialState,
      cityName: 'Brazzavile',
    };

    expect(reducer(initialState, { type: setCityNameAction.type, payload: 'Brazzavile' }))
      .toEqual(stateToBe);
  });

  describe('One offer fetching', () => {
    it('checks pending status', () => {
      const initialState = reducer(undefined, { type: 'FAKE_ACTION' });

      const stateToBe = {
        ...initialState,
        isOfferFetching: true,
      };

      expect(reducer(initialState, { type: fetchOfferAction.pending.type }))
        .toEqual(stateToBe);
    });
  });
});
