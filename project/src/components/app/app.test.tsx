import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { AppRoute } from 'src/consts/consts';
import App from './app';
import { render, screen } from '@testing-library/react';
import { AuthorizationStatus } from 'src/consts/api';
import { Offers } from 'src/types/types';
import HistoryRouter from '../history-router/history-router';
import { makeMockOffer } from 'src/utils/mock-offer';

const history = createMemoryHistory();
const mockStore = configureMockStore();

const store = mockStore({
  DATA: {
    cityName: 'Paris',
    offers: [
      makeMockOffer(),
    ] as Offers,
  },

  USER: {
    authorizationStatus: AuthorizationStatus.NotAuthorized as AuthorizationStatus,
  },
});

const MockApp = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <App />
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
