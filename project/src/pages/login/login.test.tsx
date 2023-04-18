import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { address, lorem } from 'faker';
import Login from './login';
import HistoryRouter from 'src/components/history-router/history-router';
import { AuthorizationStatus } from 'src/consts/api';
import { AppRoute } from 'src/consts/consts';

const history = createMemoryHistory();
const mockHeaderBlock = <div>{lorem.paragraphs()}</div>;

const makeMockStore = configureMockStore();

const userAuthorizedState = {
  DATA: { cityName: address.cityName() },
  USER: {
    authorizationStatus: AuthorizationStatus.NotAuthorized,
  }
};

const userNotAuthorizedState = {
  DATA: { cityName: address.cityName() },
  USER: {
    authorizationStatus: AuthorizationStatus.Authorized,
  }
};

describe('Component: <Login>', () => {
  it('renders correctly', () => {
    const mockStore = makeMockStore(userAuthorizedState);

    render(
      <Provider store={mockStore}>
        <HistoryRouter history={history}>
          <Login headerBlock={mockHeaderBlock} />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByRole('heading'))
      .toHaveAccessibleName(/Sign in/i);

    expect(screen.getByRole('textbox'))
      .toHaveProperty('name', 'email');

    expect(screen.getByLabelText(/Password/i))
      .toBeInTheDocument();

    expect(screen.getByText(userAuthorizedState.DATA.cityName))
      .toBeInTheDocument();
  });


  it('redirects to <Main> page if user is authorized', () => {
    const mockStore = makeMockStore(userNotAuthorizedState);

    render(
      <Provider store={mockStore}>
        <HistoryRouter history={history}>
          <Login headerBlock={undefined} />
        </HistoryRouter>
      </Provider>
    );

    expect(history.location.pathname)
      .toEqual(AppRoute.Root);
  });
});
