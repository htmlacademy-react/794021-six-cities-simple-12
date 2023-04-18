import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import Login from './login';
import { UserLogin } from 'src/types/types';
import HistoryRouter from 'src/components/history-router/history-router';
import { address } from 'faker';

const makeMockStore = configureMockStore();

const mockStore = makeMockStore({
  DATA: {
    cityName: address.cityName(),
  },
  USER: {
    authorizationStatus: 'NOT_AUTHORIZED',
    login: 'fake@fake.fake' as UserLogin,
  }
});

const history = createMemoryHistory();


describe('Component: <Login>', () => {
  it('should render correctly', () => {
    render(
      <Provider store={mockStore}>
        <HistoryRouter history={history}>
          <Login
            headerBlock={undefined}
          />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByRole('heading'))
      .toHaveAccessibleName(/Sign in/i);

    expect(screen.getByRole('textbox'))
      .toHaveProperty('name', 'email');

    expect(screen.getByLabelText(/Password/i))
      .toBeInTheDocument();

    const { DATA: { cityName } } = mockStore.getState();
    expect(screen.getByText(cityName as string))
      .toBeInTheDocument();
  });
});
