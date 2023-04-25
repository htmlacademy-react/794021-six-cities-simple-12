import { Action } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { HelmetProvider } from 'react-helmet-async';
import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { fetchOffersAction } from 'src/store/api-actions';
import { address } from 'faker';
import Main from './main';
import NoOfferBlock from 'src/components/no-offer-block/no-offer-block';
import HistoryRouter from 'src/components/history-router/history-router';
import { createAPI } from 'src/services/api';
import { makeMockOffers } from 'src/utils/mock-offer';
import { FetchStatus } from 'src/consts/api';
import { DomainNamespace } from 'src/consts/domain';
import { AppState } from 'src/types/store';

const api = createAPI();
const middlewares = [ thunk ];
const makeMockStore = configureMockStore<
  AppState,
  Action<string>,
  ThunkDispatch<AppState, typeof api, Action>
>(middlewares);

const history = createMemoryHistory();

const mockCityName = address.cityName();
const mockOffers = makeMockOffers(10, { city: { name: mockCityName }});

const someOffersInTheCurrentCityState = {
  [ DomainNamespace.BusinessData ]: {
    cityName: mockCityName,
    offers: mockOffers,
  },
};

const oneOfferInTheCurrentCityState = {
  [ DomainNamespace.BusinessData ]: {
    cityName: mockCityName,
    offers: [ mockOffers[0] ],
  },
};

const offersArePendingState = {
  [ DomainNamespace.BusinessData ]: {
    cityName: mockCityName,
    offersFetchStatus: FetchStatus.Pending,
    offers: [],
  },
};

const offersNotStartedFethingState = {
  [ DomainNamespace.BusinessData ]: {
    cityName: mockCityName,
    offersFetchStatus: FetchStatus.NotStarted,
    offers: [],
  },
};

const offersForCurrentCityAbsentState = {
  [ DomainNamespace.BusinessData ]: {
    cityName: mockCityName,
    offersFetchStatus: FetchStatus.FetchedWithNoError,
    offers: makeMockOffers(10, { city: { name: address.cityName() }}),
  },
};

describe('Component: <Main>', () => {
  it('renders several offers', () => {
    const mockStore = makeMockStore(someOffersInTheCurrentCityState);

    render(
      <Provider store={mockStore}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <Main />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>
    );

    expect(screen)
      .not.toContain(NoOfferBlock);

    const offerCount = mockOffers.length.toString();
    const text = `${offerCount} places to stay in ${mockCityName}`;
    expect(screen.getByText(new RegExp(text, 'i')))
      .toBeInTheDocument();

    expect(screen.getByTestId(/main__offer-cards-with-geo-map/i))
      .toBeInTheDocument();
  });

  it('renders one offer', () => {
    const mockStore = makeMockStore(oneOfferInTheCurrentCityState);

    render(
      <Provider store={mockStore}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <Main />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>
    );

    expect(screen)
      .not.toContain(NoOfferBlock);

    const text = `1 place to stay in ${mockCityName}`;
    expect(screen.getByText(new RegExp(text, 'i')))
      .toBeInTheDocument();

    expect(screen.getByTestId(/main__offer-cards-with-geo-map/i))
      .toBeInTheDocument();
  });


  it('renders spinner if fetch is pending', () => {
    const mockStore = makeMockStore(offersArePendingState);

    render(
      <Provider store={mockStore}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <Main />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Offers are loading .../i))
      .toBeInTheDocument();

    expect(screen.queryByTestId(/no-offers-container/i))
      .not.toBeInTheDocument();

    const actionNames = mockStore.getActions().map(({ type }) => type);
    expect(actionNames)
      .toHaveLength(0);
  });


  it('renders spinner and dispatches fetching if fetching has not started yet', () => {
    const mockStore = makeMockStore(offersNotStartedFethingState);

    render(
      <Provider store={mockStore}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <Main />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Offers are loading .../i))
      .toBeInTheDocument();

    expect(screen.queryByTestId(/main__no-offers-container/i))
      .not.toBeInTheDocument();

    const actionNames = mockStore.getActions().map(({ type }) => type);

    expect(actionNames)
      .toEqual([ fetchOffersAction.pending.type ]);
  });


  it('renders empty container block if no offers of the current city', () => {
    const mockStore = makeMockStore(offersForCurrentCityAbsentState);

    render(
      <Provider store={mockStore}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <Main />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId(/no-offers-container/i))
      .toBeInTheDocument();

    expect(screen.queryByText(/Offers are loading .../i))
      .not.toBeInTheDocument();

    const actionNames = mockStore.getActions().map(({ type }) => type);
    expect(actionNames)
      .toHaveLength(0);
  });
});
