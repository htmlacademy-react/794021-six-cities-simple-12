import { FetchStatus } from 'src/consts/api';
import { fetchReviewsAction, sendReviewAction } from 'src/store/api-reviews/api-reviews.actions';
import { reviews } from './reviews.slice';
import { makeMockRating, makeMockReviews } from 'src/utils/mock-review';
import { datatype, lorem } from 'faker';

const { reducer } = reviews;
const fetchAction = fetchReviewsAction;
const sendAction = sendReviewAction;

describe('Reviews fetching', () => {
  it('checks fetch fulfilled status', () => {
    const initialState = reducer(undefined, { type: 'NON_EXISTENT_ACTION' });
    const offerId = datatype.number({ min: 1 });
    const mockReviews = makeMockReviews(20, offerId);

    const stateToBe = {
      ...initialState,
      dataMap: {[ offerId ]: mockReviews },
      fetchStatus: FetchStatus.FetchedWithNoError,
    };

    expect(reducer(initialState, {
      meta: { arg: { id: offerId }},
      payload: mockReviews,
      type: fetchAction.fulfilled.type,
    }))
      .toEqual(stateToBe);
  });

  it('checks fetch pending status', () => {
    const initialState = reducer(undefined, { type: 'NON_EXISTENT_ACTION' });

    const stateToBe = {
      ...initialState,
      fetchStatus: FetchStatus.Pending,
    };

    expect(reducer(initialState, { type: fetchAction.pending.type }))
      .toEqual(stateToBe);
  });


  it('checks fetch rejected status', () => {
    const initialState = reducer(undefined, { type: 'NON_EXISTENT_ACTION' });

    const stateToBe = {
      ...initialState,
      fetchStatus: FetchStatus.FetchedWithError,
    };

    expect(reducer(initialState, { type: fetchAction.rejected.type }))
      .toEqual(stateToBe);
  });


  it('checks fulfilled state of send action', () => {
    const offerId = datatype.number({ min: 1 });
    const mockReviews = makeMockReviews(2, offerId);

    const initialState = reducer(undefined, { type: 'NON_EXISTENT_ACTION' });

    const stateBefore = {
      ...initialState,
      dataMap: {},
      sendStatus: FetchStatus.NotStarted,
      userComment: lorem.sentence(),
      userOfferId: offerId,
      userRating: makeMockRating(),
    };

    const stateToBe = {
      ...stateBefore,
      dataMap: {[ offerId ]: mockReviews },
      sendStatus: FetchStatus.FetchedWithNoError,
      userComment: '',
      userOfferId: null,
      userRating: NaN,
    };

    expect(reducer(stateBefore, {
      payload: mockReviews,
      type: sendAction.fulfilled.type,
    }))
      .toEqual(stateToBe);
  });


  it('checks pending state of send action', () => {
    const initialState = reducer(undefined, { type: 'NON_EXISTENT_ACTION' });

    const stateToBe = {
      ...initialState,
      sendStatus: FetchStatus.Pending,
    };

    expect(reducer(initialState, {
      type: sendAction.pending.type,
    }))
      .toEqual(stateToBe);
  });


  it('checks rejected state of send action', () => {
    const initialState = reducer(undefined, { type: 'NON_EXISTENT_ACTION' });

    const stateToBe = {
      ...initialState,
      sendStatus: FetchStatus.FetchedWithError,
    };

    expect(reducer(initialState, {
      type: sendAction.rejected.type,
    }))
      .toEqual(stateToBe);
  });
});
