import { renderHook } from '@testing-library/react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { fetchOfferAction } from 'src/store/api-actions';
import { useFoundOffer } from './use-found-offer';
import { FetchStatus } from 'src/consts/api';
import { address } from 'faker';

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

const firstCity = address.cityName();
const secondCity = address.cityName();

const offers = [
  { id: 1, city: { name: firstCity }},
  { id: 2, city: { name: firstCity }},
  { id: 3, city: { name: secondCity }},
];

const someOffersExist = {
  DATA: {
    offers,
    offerFetchStatus: FetchStatus.NotStarted,
    offersFetchStatus: FetchStatus.FetchedWithError,
  },
};

const offersExistFetchPending = {
  DATA: {
    offers,
    offerFetchStatus: FetchStatus.Pending,
  },
};

describe('Hook: <useFoundOffer>', () => {
  it('returns offer if found in the store, no matter what the fetch status is', () => {
    const offer = offers[offers.length - 1];
    const { id: offerId } = offer;
    const store = mockStore(someOffersExist);

    const { result } = renderHook(
      () => useFoundOffer(offerId.toString()),
      { wrapper: ({ children }) => <Provider store={store}>{children}</Provider> },
    );

    const { offer: foundOffer, isNotFound } = result.current;

    expect(foundOffer).toEqual(offer);
    expect(isNotFound).toEqual(false);
  });


  it('returns "isNotFound" if offer is not in the store, fetches offer', () => {
    const offerId = 1_000_000_000;
    const store = mockStore(someOffersExist);

    const { result } = renderHook(
      () => useFoundOffer(offerId.toString()),
      { wrapper: ({ children }) => <Provider store={store}>{children}</Provider> },
    );

    const { offer, isNotFound } = result.current;
    expect(offer).toEqual(null);
    expect(isNotFound).toEqual(false);

    const actions = store.getActions();
    expect(actions).toHaveLength(1);
    expect(actions[0].type).toEqual(fetchOfferAction.pending.type);
  });

  it('returns "isNotFound" if offer is not in the store, fetches offer even with strange ID', () => {
    const offerId = 'STRANGE_ID_BECAUSE_IT_IS_A_STRING';
    const store = mockStore(someOffersExist);

    const { result } = renderHook(
      () => useFoundOffer(offerId.toString()),
      { wrapper: ({ children }) => <Provider store={store}>{children}</Provider> },
    );

    const { offer, isNotFound } = result.current;
    expect(offer).toEqual(null);
    expect(isNotFound).toEqual(false);

    const actions = store.getActions();
    expect(actions).toHaveLength(1);
    expect(actions[0].type).toEqual(fetchOfferAction.pending.type);
  });


  it('returns data of the pending state', () => {
    const offerId = 1_000_000_000;
    const store = mockStore(offersExistFetchPending);

    const { result } = renderHook(
      () => useFoundOffer(offerId.toString()),
      { wrapper: ({ children }) => <Provider store={store}>{children}</Provider> },
    );

    expect(result.current.isNotFound)
      .toEqual(false);

    expect(store.getActions())
      .toEqual([]);
  });
});
