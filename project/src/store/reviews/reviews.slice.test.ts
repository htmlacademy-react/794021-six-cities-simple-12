import { FetchStatus } from 'src/consts/api';
import { fetchReviewsAction } from 'src/store/api-reviews/api-reviews.actions';
import { reviews } from './reviews.slice';
import { makeMockReviews } from 'src/utils/mock-review';

const { reducer } = reviews;
const action = fetchReviewsAction;

describe('Reviews fetching', () => {
  it('checks fulfilled status', () => {
    const initialState = reducer(undefined, { type: 'NON_EXISTENT_ACTION' });
    const offerId = 1;
    const mockReviews = makeMockReviews(20, offerId);

    const stateToBe = {
      ...initialState,
      dataMap: {[ offerId ]: mockReviews },
      fetchStatus: FetchStatus.FetchedWithNoError,
    };

    expect(reducer(initialState, {
      type: action.fulfilled.type,
      payload: mockReviews,
      meta: { arg: { id: 1 }}
    }))
      .toEqual(stateToBe);
  });

  it('checks pending status', () => {
    const initialState = reducer(undefined, { type: 'NON_EXISTENT_ACTION' });

    const stateToBe = {
      ...initialState,
      fetchStatus: FetchStatus.Pending,
    };

    expect(reducer(initialState, { type: action.pending.type }))
      .toEqual(stateToBe);
  });

  it('checks rejected status', () => {
    const initialState = reducer(undefined, { type: 'NON_EXISTENT_ACTION' });

    const stateToBe = {
      ...initialState,
      fetchStatus: FetchStatus.FetchedWithError,
    };

    expect(reducer(initialState, { type: action.rejected.type }))
      .toEqual(stateToBe);
  });
});
