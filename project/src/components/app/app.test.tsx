import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { HelmetProvider } from 'react-helmet-async';
import { render, screen } from '@testing-library/react';
import { address } from 'faker';
import App from './app';
import HistoryRouter from 'src/components/history-router/history-router';
import { makeMockOffer } from 'src/utils/mock-offer';
import { AuthorizationStatus } from 'src/consts/api';
import { AppRoute } from 'src/consts/consts';
import { DomainNamespace } from 'src/consts/domain';
import { Offers } from 'src/types/types';

const history = createMemoryHistory();
const mockStore = configureMockStore();

const store = mockStore({
  [ DomainNamespace.BusinessData ]: {
    cityName: address.cityName(),
    offers: [
      makeMockOffer(),
    ] as Offers,
  },

  [ DomainNamespace.User ]: {
    authorizationStatus: AuthorizationStatus.NotAuthorized as AuthorizationStatus,
  },
});

const MockApp = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </HistoryRouter>
  </Provider>
);

describe('Routing component: <App>', () => {
  it('renders <Login> when opens "/login"', () => {
    history.push(AppRoute.Login);

    render(MockApp);

    expect(screen.getByRole('heading'))
      .toHaveTextContent(/Sign in/i);
  });

  it('renders <Main> when opens "/"', () => {
    history.push(AppRoute.Root);

    render(MockApp);

    expect(screen.getByRole('heading'))
      .toHaveTextContent(/Cities/i);
  });

  it('renders <NotFound> when navigates to non-existent route', () => {
    history.push('/non-existent-mock-route');

    render(MockApp);

    expect(screen.getByRole('heading'))
      .toHaveAccessibleName('404 Not Found');
  });
});
