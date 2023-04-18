import thunk, { ThunkDispatch } from 'redux-thunk';
import { render, screen } from '@testing-library/react';
import { Action } from '@reduxjs/toolkit';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { internet } from 'faker';
import NavHeader from './nav-header';
import { createAPI } from 'src/services/api';
import { MockBrowserRouterWrapper } from 'src/utils/mock-common';
import { AppState } from 'src/types/store';
import { Provider } from 'react-redux';
import { AuthorizationStatus } from 'src/consts/api';

const api = createAPI();
const middlewares = [ thunk ];
const makeMockStore = configureMockStore<
  AppState,
  Action<string>,
  ThunkDispatch<AppState, typeof api, Action>
>(middlewares);

const mockLogin = internet.email();

const userAuthrizedState = {
  USER: {
    authorizationStatus: AuthorizationStatus.Authorized,
    avatarUrl: internet.url(),
    login: mockLogin,
  },
};

const userNotAuthrizedState = {
  USER: {
    authorizationStatus: AuthorizationStatus.NotAuthorized,
    login: mockLogin,
  }
};

const userAuthorizationStateUnknown = {
  USER: {
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
    expect(screen.queryByText('Sign in')).not.toBeInTheDocument();
    expect(screen.queryByText('Sign out')).not.toBeInTheDocument();
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
    expect(screen.getByText('Sign out')).toBeInTheDocument();
    expect(screen.queryByText('Sign in')).not.toBeInTheDocument();
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
    expect(screen.getByText('Sign in')).toBeInTheDocument();
    expect(screen.queryByText('Sign out')).not.toBeInTheDocument();
  });
});
