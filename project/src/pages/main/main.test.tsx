import { Action } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { fetchOffersAction } from 'src/store/api-actions';
import { address, lorem } from 'faker';
import Main from './main';
import NoOfferBlock from 'src/components/no-offer-block/no-offer-block';
import { createAPI } from 'src/services/api';
import { makeMockOffers } from 'src/utils/mock-offer';
import { FetchStatus } from 'src/consts/api';
import { AppState } from 'src/types/store';
import HistoryRouter from 'src/components/history-router/history-router';

const api = createAPI();
const middlewares = [ thunk ];
const makeMockStore = configureMockStore<
  AppState,
  Action<string>,
  ThunkDispatch<AppState, typeof api, Action>
>(middlewares);

const history = createMemoryHistory();
const mockHeaderBlock = <div>{lorem.paragraphs()}</div>;

describe('Component: <Main>', () => {
  it('should render offers', () => {
    const cityName = address.cityName();

    const mockStoreWithOffersInTheCurrentCity = makeMockStore({
      DATA: {
        cityName: cityName,
        offers: makeMockOffers(10, { city: { name: cityName }}),
      },
    });

    render(
      <Provider store={mockStoreWithOffersInTheCurrentCity}>
        <HistoryRouter history={history}>
          <Main
            headerBlock={mockHeaderBlock}
          />
        </HistoryRouter>
      </Provider>
    );

    expect(screen)
      .not.toContain(NoOfferBlock);

    const stateSlice = mockStoreWithOffersInTheCurrentCity.getState().DATA;
    const offerCount = stateSlice?.offers?.length?.toString() || '0';
    const text = `${offerCount} places to stay in ${cityName}`;
    expect(screen.getByText(new RegExp(text, 'i')))
      .toBeInTheDocument();

    expect(screen.getByTestId('offer-cards-with-geo-map'))
      .toBeInTheDocument();
  });


  it('renders spinner if fetch is pending', () => {
    const cityName = address.cityName();

    const mockStoreWithOffersInTheCurrentCity = makeMockStore({
      DATA: {
        cityName,
        offersFetchStatus: FetchStatus.Pending,
        offers: makeMockOffers(10, { city: { name: cityName }}),
      },
    });

    render(
      <Provider store={mockStoreWithOffersInTheCurrentCity}>
        <HistoryRouter history={history}>
          <Main
            headerBlock={mockHeaderBlock}
          />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText('Offers are loading ...'))
      .toBeInTheDocument();

    const actionNames = mockStoreWithOffersInTheCurrentCity.getActions().map(({ type }) => type);
    expect(actionNames)
      .toHaveLength(0);
  });


  it('renders spinner and dispatches fetching if fetching has not started yet', () => {
    const cityName = address.cityName();

    const mockStoreWithOffersInTheCurrentCity = makeMockStore({
      DATA: {
        cityName,
        offersFetchStatus: FetchStatus.NotStarted,
        offers: makeMockOffers(10, { city: { name: cityName }}),
      },
    });

    render(
      <Provider store={mockStoreWithOffersInTheCurrentCity}>
        <HistoryRouter history={history}>
          <Main
            headerBlock={mockHeaderBlock}
          />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText('Offers are loading ...'))
      .toBeInTheDocument();

    const actionNames = mockStoreWithOffersInTheCurrentCity.getActions().map(({ type }) => type);
    expect(actionNames)
      .toHaveLength(1);

    expect(actionNames)
      .toEqual([ fetchOffersAction.pending.type ]);
  });


  it('renders empty block if no offers in the current city', () => {
    const mockStoreWithOffersInOtherCity = makeMockStore({
      DATA: {
        cityName: address.cityName(),
        offersFetchStatus: FetchStatus.FetchedWithError,
        offers: makeMockOffers(10, { city: { name: address.cityName() }}),
      },
    });

    render(
      <Provider store={mockStoreWithOffersInOtherCity}>
        <HistoryRouter history={history}>
          <Main
            headerBlock={mockHeaderBlock}
          />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('no-offers-container'))
      .toBeInTheDocument();

    expect(screen.queryByText('Offers are loading ...'))
      .not.toBeInTheDocument();

    const actionNames = mockStoreWithOffersInOtherCity.getActions().map(({ type }) => type);
    expect(actionNames)
      .toHaveLength(0);
  });
});
