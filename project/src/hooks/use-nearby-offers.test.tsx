import { Action } from 'redux';
import { Provider } from 'react-redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { renderHook } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { fetchNearbyOffersAction } from 'src/store/api-actions';
import { useNearbyOffers } from './use-nearby-offers';
import { createAPI } from 'src/services/api';
import { makeMockOffer, makeMockOffers } from 'src/utils/mock-offer';
import { FetchStatus } from 'src/consts/api';
import { AppState } from 'src/types/store';

const api = createAPI();
const middlewares = [ thunk ];
const makeMockStore = configureMockStore<
  AppState,
  Action<string>,
  ThunkDispatch<AppState, typeof api, Action>
>(middlewares);

const NULLISH_OFFER = null;
const ACTION = fetchNearbyOffersAction;

const mockOfferWithId1 = makeMockOffer({ id: 1 });
const mockOfferWithId2 = makeMockOffer({ id: 2 });

const mockState = {
  NEARBY_OFFERS: {
    fetchStatus: FetchStatus.NotStarted,
    items: makeMockOffers(10),
    offerId: mockOfferWithId1.id,
  },
};

describe('Hook: useNearbyOffers()', () => {
  it('return empty array if the offer is null', () => {
    const mockStore = makeMockStore(mockState);

    const { result } = renderHook(
      () => useNearbyOffers(NULLISH_OFFER, 2),
      { wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider> },
    );

    const nearbyOffers = result.current;

    expect(Array.isArray(nearbyOffers)).toBe(true);
    expect(nearbyOffers.length).toBe(0);
  });


  it('get data from the store, do not dispatch fetching', () => {
    const mockStore = makeMockStore(mockState);

    const { result } = renderHook(
      () => useNearbyOffers(mockOfferWithId1, 1000),
      { wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider> },
    );

    const nearbyOffers = result.current;

    expect(nearbyOffers.length)
      .toBe(mockState.NEARBY_OFFERS.items.length);

    expect(mockStore.getActions().length)
      .toBe(0);
  });


  it('get data from the store, limit by 2, do not dispatch fetching', () => {
    const mockStore = makeMockStore(mockState);
    const limitCount = 2;

    const { result } = renderHook(
      () => useNearbyOffers(mockOfferWithId1, limitCount),
      { wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider> },
    );

    const nearbyOffers = result.current;

    expect(nearbyOffers.length)
      .toBe(Math.min(mockState.NEARBY_OFFERS.items.length, limitCount));

    expect(mockStore.getActions().length)
      .toBe(0);
  });


  it('dispatch fetching if offer-id is not in the store', () => {
    const mockStore = makeMockStore(mockState);

    const { result } = renderHook(
      () => useNearbyOffers(mockOfferWithId2, 1000),
      { wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider> },
    );

    const nearbyOffers = result.current;

    expect(nearbyOffers.length)
      .toBe(0);

    expect(mockStore.getActions().length)
      .toBe(1);

    const actionNames = mockStore.getActions().map(({ type }) => type);
    expect(actionNames)
      .toEqual([
        ACTION.pending.type,
      ]);
  });
});
