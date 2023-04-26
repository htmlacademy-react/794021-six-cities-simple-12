import thunk, { ThunkDispatch } from 'redux-thunk';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import { datatype, lorem } from 'faker';
import { fireEvent, render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import RoomReviewForm from './room-review-form';
import HistoryRouter from '../history-router/history-router';
import { FetchStatus } from 'src/consts/api';
import { DomainNamespace } from 'src/consts/domain';
import { AppState } from 'src/types/store';
import { Action } from '@reduxjs/toolkit';
import { sendReviewAction } from 'src/store/api-reviews/api-reviews.actions';
import { createAPI } from 'src/services/api';
import { setUserCommentAction, setUserRatingAction } from 'src/store/reviews/reviews.slice';
import { RoomReview } from 'src/consts/consts';

const history = createMemoryHistory();

const api = createAPI();
const middlewares = [ thunk ];
const makeMockStore = configureMockStore<
  AppState,
  Action<string>,
  ThunkDispatch<AppState, typeof api, Action>
>(middlewares);

const baseState = {
  [ DomainNamespace.Reviews ]: {
    sendStatus: FetchStatus.NotStarted,
    userComment: '',
    userOfferId: null,
    userRating: NaN,
  },
};


describe('Component: <RoomReviewForm>', () => {
  it('renders plain block', () => {
    const offerId = datatype.number({ min: 1 });
    const mockStore = makeMockStore(baseState);

    render(
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

    expect(screen.getByRole('textbox'))
      .toHaveAttribute('maxlength', `${RoomReview.TextCharacterMaxLimit}`);

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


  it('submits form', () => {
    const offerId = datatype.number({ min: 1 });
    const mockStore = makeMockStore(baseState);
    mockStore.clearActions();

    render(
      <Provider store={mockStore}>
        <HistoryRouter history={history}>
          <RoomReviewForm offerId={offerId} dataTestId={'form-test-id'} />
        </HistoryRouter>
      </Provider>
    );

    fireEvent.submit(screen.getByTestId('form-test-id'));
    const actionNames = mockStore.getActions().map(({ type }) => type);

    expect(actionNames)
      .toEqual([ sendReviewAction.pending.type ]);
  });


  it('edits review', () => {
    const offerId = datatype.number({ min: 1 });
    const mockStore = makeMockStore(baseState);
    const textReview = lorem.sentence();
    mockStore.clearActions();

    render(
      <Provider store={mockStore}>
        <HistoryRouter history={history}>
          <RoomReviewForm offerId={offerId} dataTestId={'form-test-id'} />
        </HistoryRouter>
      </Provider>
    );

    fireEvent.change(screen.getByTestId('room-review-form__text'), { target: { value: textReview } });
    const actionNames = mockStore.getActions().map(({ type }) => type);

    expect(actionNames)
      .toEqual([ setUserCommentAction.type ]);
  });


  it('sets rating', () => {
    const offerId = datatype.number({ min: 1 });
    const mockStore = makeMockStore(baseState);

    render(
      <Provider store={mockStore}>
        <HistoryRouter history={history}>
          <RoomReviewForm offerId={offerId} dataTestId={'form-test-id'} />
        </HistoryRouter>
      </Provider>
    );

    const ratingInputs = screen.getAllByTestId('room-review-form__rating-input');
    ratingInputs.forEach((ratingInput) => {
      mockStore.clearActions();
      fireEvent.click(ratingInput);

      const actions = mockStore.getActions();
      const [ action ] = actions;

      expect(actions.length)
        .toBe(1);

      expect(action.type)
        .toEqual(setUserRatingAction.type);
    });
  });


  it('checks submit button state: send review is pending', () => {
    const offerId = datatype.number({ min: 1 });
    const mockReviewText = datatype.string(RoomReview.TextCharacterMinLimit + 1);
    const mockRating = datatype.number({ min: 1, max: 5 });

    const mockStore = makeMockStore({
      [ DomainNamespace.Reviews ]: {
        sendStatus: FetchStatus.Pending,
        userComment: mockReviewText,
        userOfferId: offerId,
        userRating: mockRating,
      }
    });

    render(
      <Provider store={mockStore}>
        <HistoryRouter history={history}>
          <RoomReviewForm offerId={offerId} dataTestId={'form-test-id'} />
        </HistoryRouter>
      </Provider>
    );

    const submitButton = screen.getByTestId('room-review-form__submit-button');

    expect(submitButton.hasAttribute('disabled'))
      .toBe(true);
  });


  it('checks submit button state: comment lesser than min limit', () => {
    const offerId = datatype.number({ min: 1 });
    const mockReviewText = datatype.string(RoomReview.TextCharacterMinLimit - 1);
    const mockRating = datatype.number({ min: 1, max: 5 });

    const mockStore = makeMockStore({
      [ DomainNamespace.Reviews ]: {
        sendStatus: FetchStatus.NotStarted,
        userComment: mockReviewText,
        userOfferId: offerId,
        userRating: mockRating,
      }
    });

    render(
      <Provider store={mockStore}>
        <HistoryRouter history={history}>
          <RoomReviewForm offerId={offerId} dataTestId={'form-test-id'} />
        </HistoryRouter>
      </Provider>
    );

    const submitButton = screen.getByTestId('room-review-form__submit-button');

    expect(submitButton.hasAttribute('disabled'))
      .toBe(true);
  });


  it('checks submit button state: comment equals to min limit', () => {
    const offerId = datatype.number({ min: 1 });
    const mockReviewText = datatype.string(RoomReview.TextCharacterMinLimit);
    const mockRating = datatype.number({ min: 1, max: 5 });

    const mockStore = makeMockStore({
      [ DomainNamespace.Reviews ]: {
        sendStatus: FetchStatus.NotStarted,
        userComment: mockReviewText,
        userOfferId: offerId,
        userRating: mockRating,
      }
    });

    render(
      <Provider store={mockStore}>
        <HistoryRouter history={history}>
          <RoomReviewForm offerId={offerId} dataTestId={'form-test-id'} />
        </HistoryRouter>
      </Provider>
    );

    const submitButton = screen.getByTestId('room-review-form__submit-button');

    expect(submitButton.hasAttribute('disabled'))
      .toBe(false);
  });
});
