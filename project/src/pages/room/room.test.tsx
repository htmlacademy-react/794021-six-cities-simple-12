import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action } from '@reduxjs/toolkit';
import { HelmetProvider } from 'react-helmet-async';
import { address, datatype } from 'faker';
import { fetchOfferAction } from 'src/store/api-actions';
import Room from './room';
import { createAPI } from 'src/services/api';
import HistoryRouter from 'src/components/history-router/history-router';
import NotFound from 'src/components/not-found/not-found';
import { makeMockOffer, makeMockOffers } from 'src/utils/mock-offer';
import { makeMockReviews } from 'src/utils/mock-review';
import { AuthorizationStatus, FetchStatus } from 'src/consts/api';
import { AppRoute } from 'src/consts/consts';
import { DomainNamespace } from 'src/consts/domain';
import { AppState } from 'src/types/store';
import { resetUserReviewAction } from 'src/store/reviews/reviews.slice';


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
const mockReviews = makeMockReviews(20, offerId);
const urlPath = AppRoute.Offer.replace(':id', offerId.toString());

const baseState = {
  [ DomainNamespace.BusinessData ]: {
    offers: [ offer ],
    offerFetchStatus: FetchStatus.FetchedWithNoError,
  },
  [ DomainNamespace.NearbyOffers ]: {
    items: makeMockOffers(10, { city: { name: cityName }}),
    offerId,
  },
  [ DomainNamespace.Reviews ]: {
    dataMap: {
      [ offerId ]: mockReviews,
    },
    userComment: '',
    userOfferId: null,
    userRating: NaN,
  },
  [ DomainNamespace.User ]: {
    authorizationStatus: AuthorizationStatus.Authorized,
  },
};


describe('Component: <Room>', () => {
  it('renders offer details', () => {
    const mockStore = makeMockStore(baseState);
    history.push(urlPath);

    render(
      <Provider store={mockStore}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <Routes>
              <Route path={AppRoute.Offer} element={<Room />} />
            </Routes>
          </HelmetProvider>
        </HistoryRouter>
      </Provider>
    );

    expect(history.location.pathname)
      .toEqual(urlPath);

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
    expect(screen.getByTestId(/room__reviews-list/i)).toBeInTheDocument();
    expect(screen.getByTestId(/room-review-post-form/i)).toBeInTheDocument();
    expect(screen.getByTestId(/room-geo-map/i)).toBeInTheDocument();
    expect(screen.getByTestId(/room-nearby-offers/i)).toBeInTheDocument();
  });


  it('do not render user review form, if not authorized', () => {
    const mockStore = makeMockStore({
      ...baseState,
      [ DomainNamespace.User ]: {
        authorizationStatus: AuthorizationStatus.NotAuthorized,
      },
    });

    history.push(urlPath);

    render(
      <Provider store={mockStore}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <Routes>
              <Route path={AppRoute.Offer} element={<Room />} />
            </Routes>
          </HelmetProvider>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.queryByTestId(/room-review-post-form/i))
      .not.toBeInTheDocument();
  });


  it('renders spinner and dispatches offer fetch (if fetch has not been started yet)', () => {
    const mockStore = makeMockStore({
      ...baseState,
      [ DomainNamespace.BusinessData ]: {
        offers: makeMockOffers(1, { id: offerId + 1 }),
        offerFetchStatus: FetchStatus.NotStarted,
      },
    });

    history.push(urlPath);

    render(
      <Provider store={mockStore}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <Routes>
              <Route path={AppRoute.Offer} element={<Room />} />
            </Routes>
          </HelmetProvider>
        </HistoryRouter>
      </Provider>
    );

    expect(history.location.pathname)
      .toEqual(urlPath);

    expect(screen.getByText(/Loading offer .../i))
      .toBeInTheDocument();

    const actionNames = mockStore.getActions().map(({ type }) => type);

    expect(actionNames)
      .toEqual([
        fetchOfferAction.pending.type,
        resetUserReviewAction.type,
      ]);
  });


  it('renders spinner and not dispatches anything (if fetch is pending)', () => {
    const mockStore = makeMockStore({
      ...baseState,
      [ DomainNamespace.BusinessData ]: {
        offers: makeMockOffers(1, { id: offerId + 1 }),
        offerFetchStatus: FetchStatus.Pending,
      },
    });

    history.push(urlPath);

    render(
      <Provider store={mockStore}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <Room />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>
    );

    expect(history.location.pathname)
      .toEqual(urlPath);

    expect(screen.getByText(/Loading offer .../i))
      .toBeInTheDocument();

    const actionNames = mockStore.getActions().map(({ type }) => type);
    expect(actionNames.length)
      .toEqual(1);

    expect(actionNames)
      .toEqual([
        resetUserReviewAction.type,
      ]);
  });


  it('redirects to "Not found" page', () => {
    const mockStore = makeMockStore({
      ...baseState,
      [ DomainNamespace.BusinessData ]: {
        offers: makeMockOffers(1, { id: offerId + 1 }),
        offerFetchStatus: FetchStatus.FetchedWithNoError,
      },
    });

    const url = AppRoute.Offer.replace(':id', 'MOCK_MEANINGLESS_ID');
    history.push(url);

    render(
      <Provider store={mockStore}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <Routes>
              <Route path={AppRoute.Offer} element={<Room />} />
              <Route path={AppRoute.NotFound} element={<NotFound />} />
            </Routes>
          </HelmetProvider>
        </HistoryRouter>
      </Provider>
    );

    expect(history.location.pathname)
      .toEqual(url);

    const actionNames = mockStore.getActions().map(({ type }) => type);

    expect(actionNames.length)
      .toEqual(1);

    expect(actionNames)
      .toEqual([
        resetUserReviewAction.type,
      ]);
  });
});
