import thunk, { ThunkDispatch } from 'redux-thunk';
import { createMemoryHistory } from 'history';
import { fireEvent, render, screen } from '@testing-library/react';
import { Action } from '@reduxjs/toolkit';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { internet } from 'faker';
import NavHeader from './nav-header';
import HistoryRouter from '../history-router/history-router';
import { createAPI } from 'src/services/api';
import { MockBrowserRouterWrapper } from 'src/utils/mock-common';
import { AppState } from 'src/types/store';
import { Provider } from 'react-redux';
import { AuthorizationStatus } from 'src/consts/api';
import { DomainNamespace } from 'src/consts/domain';
import { logUserOutAction } from 'src/store/api-user/api-user.actions';
import { AppRoute } from 'src/consts/consts';

const SIGN_IN_LINK_TEXT = 'Sign in';
const SIGN_OUT_LINK_TEXT = 'Sign out';

const api = createAPI();
const middlewares = [ thunk ];
const makeMockStore = configureMockStore<
  AppState,
  Action<string>,
  ThunkDispatch<AppState, typeof api, Action>
>(middlewares);

const mockLogin = internet.email();

const userAuthrizedState = {
  [ DomainNamespace.User ]: {
    authorizationStatus: AuthorizationStatus.Authorized,
    avatarUrl: internet.url(),
    login: mockLogin,
  },
};

const userNotAuthrizedState = {
  [ DomainNamespace.User ]: {
    authorizationStatus: AuthorizationStatus.NotAuthorized,
    login: mockLogin,
  }
};

const userAuthorizationStateUnknown = {
  [ DomainNamespace.User ]: {
    authorizationStatus: AuthorizationStatus.Unknown,
    login: mockLogin,
  },
};


describe('Component: <Header>', () => {
  it('renders block — user is nor authorized, nor not-authorized', () => {
    const mockStore = makeMockStore(userAuthorizationStateUnknown);

    render(
      <Provider store={mockStore}>
        <MockBrowserRouterWrapper>
          <NavHeader />
        </MockBrowserRouterWrapper>
      </Provider>
    );

    expect(screen.queryByText(mockLogin)).not.toBeInTheDocument();
    expect(screen.queryByText(SIGN_IN_LINK_TEXT)).not.toBeInTheDocument();
    expect(screen.queryByText(SIGN_OUT_LINK_TEXT)).not.toBeInTheDocument();
  });


  it('renders block — user is authorized', () => {
    const mockStore = makeMockStore(userAuthrizedState);

    render(
      <Provider store={mockStore}>
        <MockBrowserRouterWrapper>
          <NavHeader />
        </MockBrowserRouterWrapper>
      </Provider>
    );

    expect(screen.getByText(mockLogin)).toBeInTheDocument();
    expect(screen.getByText(SIGN_OUT_LINK_TEXT)).toBeInTheDocument();
    expect(screen.queryByText(SIGN_IN_LINK_TEXT)).not.toBeInTheDocument();
  });


  it('renders block — user is not authorized', () => {
    const mockStore = makeMockStore(userNotAuthrizedState);

    render(
      <Provider store={mockStore}>
        <MockBrowserRouterWrapper>
          <NavHeader />
        </MockBrowserRouterWrapper>
      </Provider>
    );

    expect(screen.queryByText(mockLogin)).not.toBeInTheDocument();
    expect(screen.getByText(SIGN_IN_LINK_TEXT)).toBeInTheDocument();
    expect(screen.queryByText(SIGN_OUT_LINK_TEXT)).not.toBeInTheDocument();
  });


  it('dispatches "sign out" when clicked', () => {
    const mockStore = makeMockStore(userAuthrizedState);

    render(
      <Provider store={mockStore}>
        <MockBrowserRouterWrapper>
          <NavHeader />
        </MockBrowserRouterWrapper>
      </Provider>
    );

    fireEvent.click(screen.getByRole('link', { name: 'Sign out' }));

    expect(mockStore.getActions().map((action) => action.type))
      .toEqual([ logUserOutAction.pending.type ]);
  });


  it('does not show "Sign in", "Sign out" signs on "/login" page - user is not authorized', () => {
    const mockStore = makeMockStore(userNotAuthrizedState);
    const mockHistory = createMemoryHistory({ initialEntries: [ AppRoute.Login ] });

    render(
      <Provider store={mockStore}>
        <HistoryRouter history={mockHistory}>
          <NavHeader />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.queryByRole('link', { name: SIGN_IN_LINK_TEXT }))
      .not.toBeInTheDocument();

    expect(screen.queryByRole('link', { name: SIGN_OUT_LINK_TEXT }))
      .not.toBeInTheDocument();
  });


  it('does not show "Sign in", "Sign out" signs on "/login" page - user authorization is unknown', () => {
    const mockStore = makeMockStore(userAuthorizationStateUnknown);
    const mockHistory = createMemoryHistory({ initialEntries: [ AppRoute.Login ] });

    render(
      <Provider store={mockStore}>
        <HistoryRouter history={mockHistory}>
          <NavHeader />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.queryByRole('link', { name: SIGN_IN_LINK_TEXT }))
      .not.toBeInTheDocument();

    expect(screen.queryByRole('link', { name: SIGN_OUT_LINK_TEXT }))
      .not.toBeInTheDocument();
  });
});
