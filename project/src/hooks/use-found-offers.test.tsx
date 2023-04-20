import { renderHook } from '@testing-library/react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { useFoundOffers } from './use-found-offers';
import { FetchStatus } from 'src/consts/api';
import { Offers } from 'src/types/types';
import { fetchOffersAction } from 'src/store/api-actions';
import { address } from 'faker';
import { DomainNamespace } from 'src/consts/domain';

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

const firstCityName = address.cityName();
const secondCityName = address.cityName();

const firstCityOffers = [
  { id: 1, city: { name: firstCityName }},
  { id: 2, city: { name: firstCityName }},
];

const secondCityOffers = [
  { id: 3, city: { name: secondCityName }},
];

const offers = [
  ...firstCityOffers,
  ...secondCityOffers,
];

const fetchedWithNoErrorState = {
  [ DomainNamespace.BusinessData ]: {
    offers,
    offersFetchStatus: FetchStatus.FetchedWithNoError,
  },
};

const offersNotStartedFetching = {
  [ DomainNamespace.BusinessData ]: {
    offers: [{ id: 1, city: { name: firstCityName }}] as Offers,
    offersFetchStatus: FetchStatus.NotStarted,
  },
};

const offersFetchIsInPendingState = {
  [ DomainNamespace.BusinessData ]: {
    offers: [{ id: 1, city: { name: firstCityName }}] as Offers,
    offersFetchStatus: FetchStatus.Pending,
  },
};

describe('Hook: <useFoundOffers>', () => {
  it('returns: offers for the curent city with "no error" fetch status', () => {
    const store = mockStore(fetchedWithNoErrorState);

    const { result } = renderHook(() => useFoundOffers(firstCityName), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    expect(result.current.offers)
      .toHaveLength(firstCityOffers.length);

    expect(result.current.fetchStatus)
      .toBe(FetchStatus.FetchedWithNoError);
  });


  it('started fetching offers if fetchStatus is "NotStarted"', () => {
    const store = mockStore(offersNotStartedFetching);

    const { result } = renderHook(() => useFoundOffers(firstCityName), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    const actions = store.getActions();
    expect(actions.length)
      .toBe(1);

    expect(actions[0].type)
      .toEqual(fetchOffersAction.pending.type);

    expect(result.current.offers)
      .toHaveLength(1);
  });


  it('dispatches no action when fetchStatus is "Pending"', () => {
    const store = mockStore(offersFetchIsInPendingState);

    renderHook(() => useFoundOffers(firstCityName), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    expect(store.getActions())
      .toEqual([]);
  });
});
