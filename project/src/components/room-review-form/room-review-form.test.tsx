import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { datatype } from 'faker';
import { Provider } from 'react-redux';
import RoomReviewForm from './room-review-form';
import HistoryRouter from '../history-router/history-router';
import { FetchStatus } from 'src/consts/api';
import { DomainNamespace } from 'src/consts/domain';

const history = createMemoryHistory();

const makeMockStore = configureMockStore();
const mockStore = makeMockStore({
  [ DomainNamespace.Reviews ]: {
    sendReviewStatus: FetchStatus.NotStarted,
    userComment: '',
    userOfferId: null,
    userRating: NaN,
  },
});

describe('Component: <RoomReviewForm>', () => {
  it('renders plain block', () => {
    const offerId = datatype.number({ min: 1 });

    render (
      <Provider store={mockStore}>
        <HistoryRouter history={history}>
          <RoomReviewForm offerId={offerId} />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByRole('textbox'))
      .toHaveAccessibleName('Your review');

    expect(screen.getByRole('textbox'))
      .not.toHaveAttribute('disabled');

    expect(screen.getByRole('radio', { name: /perfect/i }))
      .toBeInTheDocument();

    expect(screen.getByRole('radio', { name: /good/i }))
      .toBeInTheDocument();

    expect(screen.getByRole('radio', { name: /not bad/i }))
      .toBeInTheDocument();

    expect(screen.getByRole('radio', { name: /badly/i }))
      .toBeInTheDocument();

    expect(screen.getByRole('radio', { name: /terribly/i }))
      .toBeInTheDocument();

    expect(screen.getByRole('button', { name: /Submit/i }))
      .toBeInTheDocument();
  });
});
