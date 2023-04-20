import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action } from '@reduxjs/toolkit';
import { address, datatype } from 'faker';
import { fetchOfferAction } from 'src/store/api-actions';
import Room from './room';
import { createAPI } from 'src/services/api';
import HistoryRouter from 'src/components/history-router/history-router';
import { makeMockOffer, makeMockOffers } from 'src/utils/mock-offer';
import { makeMockReviews } from 'src/utils/mock-review';
import { AuthorizationStatus, FetchStatus } from 'src/consts/api';
import { AppRoute } from 'src/consts/consts';
import { AppState } from 'src/types/store';
import { DomainNamespace } from 'src/consts/domain';


const api = createAPI();
const middlewares = [ thunk ];
const makeMockStore = configureMockStore<
  AppState,
  Action<string>,
  ThunkDispatch<AppState, typeof api, Action>
>(middlewares);

const history = createMemoryHistory();

const offerId = datatype.number();
const cityName = address.cityName();
const offer = makeMockOffer({ id: offerId, city: { name: cityName }});


describe('Component: <Room>', () => {
  it('renders offer details', () => {
    const mockReviews = makeMockReviews(20, offerId);
    const mockStore = makeMockStore({
      [ DomainNamespace.BusinessData ]: {
        offers: [ offer ],
      },
      [ DomainNamespace.NearbyOffers ]: {
        items: makeMockOffers(10, { city: { name: cityName }}),
        offerId,
      },
      [ DomainNamespace.Reviews ]: {
        dataMap: {
          [ offerId ]: mockReviews,
        },
      },
      [ DomainNamespace.User ]: {
        authorizationStatus: AuthorizationStatus.Authorized,
      },
    });

    const path = AppRoute.Offer.replace(':id', offerId.toString());
    history.push(path);

    render(
      <Provider store={mockStore}>
        <HistoryRouter history={history}>
          <Routes>
            <Route path={AppRoute.Offer} element={<Room />} />
          </Routes>
        </HistoryRouter>
      </Provider>
    );

    expect(history.location.pathname)
      .toEqual(path);

    expect(screen.getByRole('heading', { name: offer.title }))
      .toBeInTheDocument();

    expect(screen.getByTestId(/room-gallery/i)).toBeInTheDocument();
    expect(screen.getByTestId(/room-title/i)).toBeInTheDocument();
    expect(screen.getByTestId(/room-detailed-description/i)).toBeInTheDocument();
    expect(screen.getByTestId(/room-type/i)).toBeInTheDocument();
    expect(screen.getByTestId(/room-rating/i)).toBeInTheDocument();
    expect(screen.getByTestId(/room-bedroom-count/i)).toBeInTheDocument();
    expect(screen.getByTestId(/room-max-adult-count/i)).toBeInTheDocument();
    expect(screen.getByTestId(/room-price-per-night/i)).toBeInTheDocument();
    expect(screen.getByTestId(/room-hardware-features/i)).toBeInTheDocument();
    expect(screen.getByTestId(/room-host-description/i)).toBeInTheDocument();
    expect(screen.getByTestId(/room-user-reviews/i)).toBeInTheDocument();
    expect(screen.getByTestId(/room-geo-map/i)).toBeInTheDocument();
    expect(screen.getByTestId(/room-nearby-offers/i)).toBeInTheDocument();

    expect(screen.getByTestId('room-review-post-form'))
      .toBeInTheDocument();

    expect(screen.getByRole('heading', { name: /Reviews/i }))
      .toHaveTextContent(new RegExp(mockReviews.length.toString(), 'i'));
  });


  it('do not render user review form, if not authorized', () => {
    const mockStore = makeMockStore({
      [ DomainNamespace.BusinessData ]: { offers: [ offer ] },
      [ DomainNamespace.NearbyOffers ]: {},
      [ DomainNamespace.Reviews ]: { dataMap: {} },
      [ DomainNamespace.User ]: {
        authorizationStatus: AuthorizationStatus.NotAuthorized,
      },
    });

    render(
      <Provider store={mockStore}>
        <HistoryRouter history={history}>
          <Routes>
            <Route path={AppRoute.Offer} element={<Room />} />
          </Routes>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.queryByTestId('room-review-post-form'))
      .not.toBeInTheDocument();
  });

  it('renders spinner and dispatches offer fetch', () => {
    const mockStore = makeMockStore({
      [ DomainNamespace.BusinessData ]: {
        offers: makeMockOffers(1, { id: offerId + 1 }),
        offerFetchStatus: FetchStatus.NotStarted,
      },
      [ DomainNamespace.NearbyOffers ]: { items: [] },
      [ DomainNamespace.Reviews ]: { dataMap: {} },
      [ DomainNamespace.User ]: {
        authorizationStatus: AuthorizationStatus.Authorized,
      },
    });

    const path = AppRoute.Offer.replace(':id', offerId.toString());
    history.push(path);

    render(
      <Provider store={mockStore}>
        <HistoryRouter history={history}>
          <Routes>
            <Route path={AppRoute.Offer} element={<Room />} />
          </Routes>
        </HistoryRouter>
      </Provider>
    );

    expect(history.location.pathname)
      .toEqual(path);

    expect(screen.getByText('Loading offer ...'))
      .toBeInTheDocument();

    const actionNames = mockStore.getActions().map(({ type }) => type);
    expect(actionNames)
      .toEqual([ fetchOfferAction.pending.type ]);
  });


  it('renders spinner and not dispatches anything', () => {
    const mockStore = makeMockStore({
      [ DomainNamespace.BusinessData ]: {
        offers: makeMockOffers(1, { id: offerId + 1 }),
        offerFetchStatus: FetchStatus.Pending,
      },
      [ DomainNamespace.NearbyOffers ]: { items: [] },
      [ DomainNamespace.Reviews ]: { dataMap: {} },
      [ DomainNamespace.User ]: {
        authorizationStatus: AuthorizationStatus.Authorized,
      },
    });

    const path = AppRoute.Offer.replace(':id', offerId.toString());
    history.push(path);

    render(
      <Provider store={mockStore}>
        <HistoryRouter history={history}>
          <Routes>
            <Route path={AppRoute.Offer} element={<Room />} />
          </Routes>
        </HistoryRouter>
      </Provider>
    );

    expect(history.location.pathname)
      .toEqual(path);

    expect(screen.getByText('Loading offer ...'))
      .toBeInTheDocument();

    const actionNames = mockStore.getActions().map(({ type }) => type);
    expect(actionNames.length)
      .toEqual(0);
  });


  it('redirects to "Not found" page', () => {
    const mockStore = makeMockStore({
      [ DomainNamespace.BusinessData ]: {
        offers: makeMockOffers(1, { id: offerId + 1 }),
        offerFetchStatus: FetchStatus.FetchedWithNoError,
      },
      [ DomainNamespace.NearbyOffers ]: { items: [] },
      [ DomainNamespace.Reviews ]: { dataMap: {} },
      [ DomainNamespace.User ]: {
        authorizationStatus: AuthorizationStatus.Authorized,
      },
    });

    const path = AppRoute.Offer.replace(':id', 'MOCK_MEANINGLESS_ID');
    history.push(path);

    render(
      <Provider store={mockStore}>
        <HistoryRouter history={history}>
          <Routes>
            <Route path={AppRoute.Offer} element={<Room />} />
          </Routes>
        </HistoryRouter>
      </Provider>
    );

    expect(history.location.pathname)
      .toEqual(AppRoute.NotFound);

    const actionNames = mockStore.getActions().map(({ type }) => type);
    expect(actionNames.length)
      .toEqual(0);
  });
});
