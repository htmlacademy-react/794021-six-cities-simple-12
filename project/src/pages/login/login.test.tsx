import { Provider } from 'react-redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { Action } from '@reduxjs/toolkit';
import { HelmetProvider } from 'react-helmet-async';
import { createMemoryHistory } from 'history';
import { address, datatype, internet, lorem } from 'faker';
import { fireEvent, render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { logUserInAction } from 'src/store/api-user/api-user.actions';
import Login from './login';
import HistoryRouter from 'src/components/history-router/history-router';
import { AuthorizationStatus } from 'src/consts/api';
import { AppRoute } from 'src/consts/consts';
import { DomainNamespace } from 'src/consts/domain';
import { createAPI } from 'src/services/api';
import { AppState } from 'src/types/store';
import { setUserLoginAction } from 'src/store/user/user.slice';

const history = createMemoryHistory();

const api = createAPI();
const middlewares = [ thunk ];
const makeMockStore = configureMockStore<
  AppState,
  Action<string>,
  ThunkDispatch<AppState, typeof api, Action>
>(middlewares);

const commonMockState = {
  [ DomainNamespace.BusinessData ]: { cityName: address.cityName() },
};


describe('Component: <Login>', () => {
  it('renders correctly, user is not authorized', () => {
    const mockState = {
      ...commonMockState,
      [ DomainNamespace.User ]: {
        authorizationStatus: AuthorizationStatus.NotAuthorized,
      },
    };

    const mockStore = makeMockStore(mockState);
    history.push(AppRoute.Login);

    render(
      <Provider store={mockStore}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <Login />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>
    );

    expect(history.location.pathname)
      .toEqual(AppRoute.Login);

    expect(screen.getByRole('heading'))
      .toHaveAccessibleName(/Sign in/i);

    expect(screen.getByRole('textbox'))
      .toHaveProperty('name', 'email');

    expect(screen.getByLabelText(/Password/i))
      .toBeInTheDocument();
  });


  it('redirects to <Main> page if user is authorized', () => {
    const mockState = {
      [ DomainNamespace.User ]: {
        authorizationStatus: AuthorizationStatus.Authorized,
      },
    };

    const mockStore = makeMockStore(mockState);
    history.push(AppRoute.Login);

    render(
      <Provider store={mockStore}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <Login />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>
    );

    expect(history.location.pathname)
      .toEqual(AppRoute.Root);
  });


  it('goes to <Main> page if clicked on the city link', () => {
    const mockState = {
      ...commonMockState,
      [ DomainNamespace.User ]: {
        authorizationStatus: AuthorizationStatus.NotAuthorized,
      },
    };

    const mockStore = makeMockStore(mockState);
    history.push(AppRoute.Login);

    render(
      <Provider store={mockStore}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <Login />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>
    );

    const cityLink = screen.getByTestId('login__city-link');
    fireEvent(cityLink, new MouseEvent('click', { bubbles: true, cancelable: true }));

    expect(history.location.pathname)
      .toEqual(AppRoute.Root);
  });
});


describe('Component: <Login>. Set login/password', () => {
  it('sets login (email)', () => {
    const mockState = {
      ...commonMockState,
      [ DomainNamespace.User ]: {
        authorizationStatus: AuthorizationStatus.NotAuthorized,
        login: '',
      },
    };

    const mockStore = makeMockStore(mockState);

    render(
      <Provider store={mockStore}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <Login />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>
    );

    const loginCharactersCount = datatype.number(10) + 3;
    const mockLogin = lorem.word(loginCharactersCount);
    const loginInput = screen.getByTestId('login__email-input');

    fireEvent.change(loginInput, { target: { value: mockLogin }});

    const actionNames = mockStore.getActions().map(({ type }) => type);

    expect(actionNames.length)
      .toEqual(1);

    actionNames.forEach((actionName) => {
      expect(actionName)
        .toEqual(setUserLoginAction.type);
    });
  });


  it('submits when password is not valid', () => {
    const mockState = {
      ...commonMockState,
      [ DomainNamespace.User ]: {
        authorizationStatus: AuthorizationStatus.NotAuthorized,
        login: internet.email(),
      },
    };

    const mockStore = makeMockStore(mockState);

    render(
      <Provider store={mockStore}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <Login />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>
    );

    const password = lorem.word(1);
    const passwordInput = screen.getByTestId('login__password-input');
    const submitButton = screen.getByTestId('login__submit-button');

    fireEvent.change(passwordInput, { target: { value: password }});
    fireEvent(submitButton, new MouseEvent('click', { bubbles: true, cancelable: true }));

    const actionNames = mockStore.getActions().map(({ type }) => type);

    expect(actionNames.length)
      .toEqual(0);
  });


  it('submits when password is valid', () => {
    const mockState = {
      ...commonMockState,
      [ DomainNamespace.User ]: {
        authorizationStatus: AuthorizationStatus.NotAuthorized,
        login: internet.email(),
      },
    };

    const mockStore = makeMockStore(mockState);

    render(
      <Provider store={mockStore}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <Login />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>
    );

    const password = `${lorem.word(1)}${datatype.number()}`;
    const passwordInput = screen.getByTestId('login__password-input');
    const submitButton = screen.getByTestId('login__submit-button');

    fireEvent.change(passwordInput, { target: { value: password }});
    fireEvent(submitButton, new MouseEvent('click', { bubbles: true, cancelable: true }));

    const actionNames = mockStore.getActions().map(({ type }) => type);

    expect(actionNames)
      .toEqual([ logUserInAction.pending.type ]);
  });
});
