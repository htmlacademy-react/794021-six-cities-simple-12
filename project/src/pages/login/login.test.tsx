import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { address } from 'faker';
import Login from './login';
import HistoryRouter from 'src/components/history-router/history-router';
import { AuthorizationStatus } from 'src/consts/api';
import { AppRoute } from 'src/consts/consts';
import { DomainNamespace } from 'src/consts/domain';

const history = createMemoryHistory();

const makeMockStore = configureMockStore();

const userAuthorizedState = {
  [ DomainNamespace.BusinessData ]: { cityName: address.cityName() },
  [ DomainNamespace.User ]: {
    authorizationStatus: AuthorizationStatus.NotAuthorized,
  }
};

const userNotAuthorizedState = {
  [ DomainNamespace.BusinessData ]: { cityName: address.cityName() },
  [ DomainNamespace.User ]: {
    authorizationStatus: AuthorizationStatus.Authorized,
  }
};

describe('Component: <Login>', () => {
  it('renders correctly', () => {
    const mockStore = makeMockStore(userAuthorizedState);

    render(
      <Provider store={mockStore}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <Login />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByRole('heading'))
      .toHaveAccessibleName(/Sign in/i);

    expect(screen.getByRole('textbox'))
      .toHaveProperty('name', 'email');

    expect(screen.getByLabelText(/Password/i))
      .toBeInTheDocument();
  });


  it('redirects to <Main> page if user is authorized', () => {
    const mockStore = makeMockStore(userNotAuthorizedState);

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
});
