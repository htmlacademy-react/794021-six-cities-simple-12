import { FetchStatus } from 'src/consts/api';
import { fetchReviewsAction, sendReviewAction } from 'src/store/api-reviews/api-reviews.actions';
import { resetUserReviewAction, reviews, setUserCommentAction, setUserRatingAction } from './reviews.slice';
import { makeMockRating, makeMockReviews } from 'src/utils/mock-review';
import { datatype, lorem } from 'faker';
import { Reviews } from 'src/types/types';

const { reducer } = reviews;

describe('Reducer: reviews. Fetch actions', () => {
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
      type: fetchReviewsAction.fulfilled.type,
    }))
      .toEqual(stateToBe);
  });


  it('checks fetch pending status', () => {
    const initialState = reducer(undefined, { type: 'NON_EXISTENT_ACTION' });

    const stateToBe = {
      ...initialState,
      fetchStatus: FetchStatus.Pending,
    };

    expect(reducer(initialState, { type: fetchReviewsAction.pending.type }))
      .toEqual(stateToBe);
  });


  it('checks fetch rejected status', () => {
    const initialState = reducer(undefined, { type: 'NON_EXISTENT_ACTION' });

    const stateToBe = {
      ...initialState,
      fetchStatus: FetchStatus.FetchedWithError,
    };

    expect(reducer(initialState, { type: fetchReviewsAction.rejected.type }))
      .toEqual(stateToBe);
  });
});


describe('Reducer: reviews. Send actions', () => {
  it('sends review with "fulfilled" status', () => {
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
      type: sendReviewAction.fulfilled.type,
    }))
      .toEqual(stateToBe);
  });


  it('sends review with "fulfilled" status if no offer-id in the store (strange, but satisfies possible nullish-offer-id)', () => {
    const offerId = null;
    const mockReviews = [] as Reviews;

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
      dataMap: {},
      sendStatus: FetchStatus.FetchedWithNoError,
      userComment: '',
      userOfferId: null,
      userRating: NaN,
    };

    expect(reducer(stateBefore, {
      payload: mockReviews,
      type: sendReviewAction.fulfilled.type,
    }))
      .toEqual(stateToBe);
  });


  it('checks pending state of send action', () => {
    const initialState = reducer(undefined, { type: 'NON_EXISTENT_ACTION' });

    const stateToBe = {
      ...initialState,
      sendStatus: FetchStatus.Pending,
    };

    const action = {
      type: sendReviewAction.pending.type,
    };

    expect(reducer(initialState, action))
      .toEqual(stateToBe);
  });


  it('sends review with "Reject" state and error.message', () => {
    const initialState = reducer(undefined, { type: 'NON_EXISTENT_ACTION' });

    const stateToBe = {
      ...initialState,
      sendStatus: FetchStatus.FetchedWithError,
    };

    expect(reducer(initialState, {
      error: { message: 'something happend during sending review' },
      type: sendReviewAction.rejected.type,
    }))
      .toEqual(stateToBe);
  });

  it('sends review with "Reject" state with no error.message', () => {
    const initialState = reducer(undefined, { type: 'NON_EXISTENT_ACTION' });

    const stateBefore = {
      ...initialState,
      sendStatus: FetchStatus.Pending,
      userComment: lorem.sentence(),
      userRating: makeMockRating(),
      userOfferIf: datatype.number({ min: 1 }),
    };

    const stateToBe = {
      ...stateBefore,
      sendStatus: FetchStatus.FetchedWithError,
    };

    expect(reducer(stateBefore, {
      type: sendReviewAction.rejected.type,
      error: {},
    }))
      .toEqual(stateToBe);
  });
});


describe('Reducer: reviews. State actions', () => {
  it('clears user review data', () => {
    const initialState = reducer(undefined, { type: 'NON_EXISTENT_ACTION' });

    const stateBefore = {
      ...initialState,
      userComment: lorem.sentence(),
      userOfferId: datatype.number({ min: 1 }),
      userRating: makeMockRating(),
    };

    const action = {
      type: resetUserReviewAction.type,
    };

    expect(reducer(stateBefore, action))
      .toEqual(initialState);
  });


  it('sets user comment of the same offer', () => {
    const initialState = reducer(undefined, { type: 'NON_EXISTENT_ACTION' });
    const offerId = datatype.number({ min: 1 });
    const newComment = lorem.sentence();

    const stateBefore = {
      ...initialState,
      userComment: lorem.sentence(),
      userOfferId: offerId,
    };

    const stateToBe = {
      ...stateBefore,
      userComment: newComment,
    };

    expect(reducer(stateBefore, {
      type: setUserCommentAction.type,
      payload: { offerId, value: newComment },
    }))
      .toEqual(stateToBe);
  });


  it('sets user comment of another offer', () => {
    const initialState = reducer(undefined, { type: 'NON_EXISTENT_ACTION' });
    const oldOfferId = datatype.number({ min: 1 });
    const newOfferId = oldOfferId + 1;
    const newComment = lorem.sentence();

    const stateBefore = {
      ...initialState,
      userComment: lorem.sentence(),
      userRating: makeMockRating(),
      userOfferId: oldOfferId,
    };

    const stateToBe = {
      ...stateBefore,
      userComment: newComment,
      userOfferId: newOfferId,
      userRating: NaN,
    };

    const action = {
      type: setUserCommentAction.type,
      payload: { offerId: newOfferId, value: newComment },
    };

    expect(reducer(stateBefore, action))
      .toEqual(stateToBe);
  });


  it('sets user rating of the same offer', () => {
    const initialState = reducer(undefined, { type: 'NON_EXISTENT_ACTION' });
    const offerId = datatype.number({ min: 1 });
    const oldRating = makeMockRating();
    const newRating = makeMockRating() + 1;

    const stateBefore = {
      ...initialState,
      userComment: lorem.sentence(),
      userOfferId: offerId,
      userRating: oldRating,
    };

    const stateToBe = {
      ...stateBefore,
      userRating: newRating,
    };

    const action = {
      type: setUserRatingAction.type,
      payload: { offerId, value: newRating },
    };

    expect(reducer(stateBefore, action))
      .toEqual(stateToBe);
  });


  it('sets user rating of another offer', () => {
    const initialState = reducer(undefined, { type: 'NON_EXISTENT_ACTION' });

    const oldOfferId = datatype.number({ min: 1 });
    const newOfferId = oldOfferId + 1;

    const oldRating = makeMockRating();
    const newRating = makeMockRating() + 1;

    const stateBefore = {
      ...initialState,
      userComment: lorem.sentence(),
      userOfferId: oldOfferId,
      userRating: oldRating,
    };

    const stateToBe = {
      ...stateBefore,
      userComment: '',
      userOfferId: newOfferId,
      userRating: newRating,
    };

    const action = {
      type: setUserRatingAction.type,
      payload: { offerId: newOfferId, value: newRating },
    };

    expect(reducer(stateBefore, action))
      .toEqual(stateToBe);
  });
});
