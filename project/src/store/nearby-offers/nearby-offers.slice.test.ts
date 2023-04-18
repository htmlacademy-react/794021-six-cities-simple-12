import { FetchStatus } from 'src/consts/api';
import { nearbyOffers } from './nearby-offers.slice';
import { makeMockOffers } from 'src/utils/mock-offer';
import { fetchNearbyOffersAction } from '../api-actions';

const { reducer } = nearbyOffers;
const ACTION = fetchNearbyOffersAction;

describe('Reducer: nearbyOffers', () => {
  it('returns initial state if sent unknown action', () => {
    expect(reducer(undefined, { type: 'NON_EXISTENT_ACTION' }))
      .toEqual({
        fetchStatus: FetchStatus.NotStarted,
        items: [],
        offerId: null,
      });
  });


  it('sets data if fetching was fulfilled', () => {
    const initialState = reducer(undefined, { type: 'NON_EXISTENT_ACTION' });
    const offerId = 1;
    const offers = makeMockOffers(10);

    const stateToBe = {
      ...initialState,
      fetchStatus: FetchStatus.FetchedWithNoError,
      items: offers,
      offerId,
    };

    expect(reducer(initialState, { type: ACTION.fulfilled.type, payload: offers, meta: { arg: offerId } }))
      .toEqual(stateToBe);
  });


  it('checks if fetch is pending', () => {
    const initialState = reducer(undefined, { type: 'NON_EXISTENT_ACTION' });
    const offerId = 1;

    const stateToBe = {
      ...initialState,
      fetchStatus: FetchStatus.Pending,
      items: [],
      offerId,
    };

    expect(reducer(initialState, { type: ACTION.pending.type, meta: { arg: offerId } }))
      .toEqual(stateToBe);
  });


  it('checks if fetching was rejected', () => {
    const initialState = reducer(undefined, { type: 'NON_EXISTENT_ACTION' });
    const offerId = 1;

    const stateToBe = {
      ...initialState,
      fetchStatus: FetchStatus.FetchedWithError,
      items: [],
      offerId,
    };

    expect(reducer(initialState, { type: ACTION.rejected.type, meta: { arg: offerId } }))
      .toEqual(stateToBe);
  });
});
