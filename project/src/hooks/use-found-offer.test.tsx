import { renderHook } from '@testing-library/react';
import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { useFoundOffer } from './use-found-offer';
import { FetchStatus } from 'src/consts/api';
import { Offers } from 'src/types/types';
import { Provider } from 'react-redux';

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

const offers = [
  { id: 1, city: { name: 'Paris' }},
  { id: 2, city: { name: 'Paris' }},
  { id: 3, city: { name: 'Amsterdam' }},
];

const searchedOfferExist = {
  DATA: {
    offers,
    offersFetchStatus: FetchStatus.FetchedWithError,
    isOfferFetching: true,
  },
};

const offersNotStartedFetching = {
  DATA: {
    offers: [{ id: 1, city: { name: 'Paris' }}] as Offers,
    offersFetchStatus: FetchStatus.NotStarted,
  },
};

const offersFetchIsInPendingState = {
  DATA: {
    offers: [{ id: 1, city: { name: 'Paris' }}] as Offers,
    offersFetchStatus: FetchStatus.Pending,
  },
};

describe('Hook: <useFoundOffer>', () => {
  it('returns offer if it is in the store, no matter what the fetch status is', () => {
    const offerId = 2;
    const offer = offers.find(({ id }) => id === offerId);
    const store = mockStore(searchedOfferExist);

    const { result } = renderHook(
      () => useFoundOffer(offerId.toString()),
      { wrapper: ({ children }) => <Provider store={store}>{children}</Provider> },
    );

    const { offer: foundOffer, isNotFound } = result.current;

    expect(foundOffer).toEqual(offer);
    expect(isNotFound).toEqual(false);
  });


  it('returns "isNotFound" if offer is not in the store', () => {
    const offerId = 4;
    const store = mockStore(searchedOfferExist);

    const { result } = renderHook(
      () => useFoundOffer(offerId.toString()),
      { wrapper: ({ children }) => <Provider store={store}>{children}</Provider> },
    );

    const { offer, isNotFound } = result.current;

    expect(offer).toEqual(null);
    expect(isNotFound).toEqual(true);
  });
});
