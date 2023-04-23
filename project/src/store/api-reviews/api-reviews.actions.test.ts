import MockAdapter from 'axios-mock-adapter';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { fetchReviewsAction, sendReviewAction } from './api-reviews.actions';
import { APIRoute } from 'src/consts/api';
import { createAPI } from 'src/services/api';
import { makeMockOffer } from 'src/utils/mock-offer';
import { makeMockRating, makeMockReviewsMap } from 'src/utils/mock-review';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { AppState } from 'src/types/store';
import { Action } from '@reduxjs/toolkit';
import { datatype, lorem } from 'faker';
import { UserReviewSendingData } from 'src/types/api';
import { DomainNamespace } from 'src/consts/domain';

const api = createAPI();
const mockAPI = new MockAdapter(api);
const middlewares = [thunk.withExtraArgument(api)];

const makeMockStore = configureMockStore<
  AppState,
  Action<string>,
  ThunkDispatch<AppState, typeof api, Action>
>(middlewares);

describe('Async API review-related actions', () => {
  const fetchAction = fetchReviewsAction;
  const sendAction = sendReviewAction;

  it('fetches reviews, checks "pending and fulfilled" states', async () => {
    const mockStore = makeMockStore();
    const offer = makeMockOffer();
    const reviewsMap = makeMockReviewsMap(offer.id, 30);

    mockAPI
      .onGet(`${APIRoute.Reviews}${offer.id}`)
      .reply(200, reviewsMap);

    await mockStore.dispatch(fetchAction(offer));
    const actions = mockStore.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      fetchAction.pending.type,
      fetchAction.fulfilled.type
    ]);
  });


  it('fetches reviews, checks "pending and rejected" states', async () => {
    const mockStore = makeMockStore();
    const offer = makeMockOffer();

    mockAPI
      .onGet(`${APIRoute.Reviews}${offer.id}`)
      .reply(404);

    await mockStore.dispatch(fetchAction(offer));
    const actions = mockStore.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      fetchAction.pending.type,
      fetchAction.rejected.type
    ]);
  });


  it('sends review, checks "pending and rejected" state if offer-id is null in the Store', async () => {
    const mockOfferId = datatype.number();
    const mockReview: UserReviewSendingData = {
      comment: lorem.sentences(),
      rating: makeMockRating(),
    };
    const mockStore = makeMockStore({
      [ DomainNamespace.Reviews ]: {
        userComment: mockReview.comment,
        userOfferId: null,
        userRating: mockReview.rating,
      },
    });

    mockAPI
      .onPost(`${APIRoute.Reviews}${mockOfferId}`, mockReview)
      .reply(404);

    await mockStore.dispatch(sendAction());

    const actions = mockStore.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      sendAction.pending.type,
      sendAction.rejected.type
    ]);
  });


  it('sends review, checks "pengind and fulfilled" states', async () => {
    const mockOfferId = datatype.number();
    const mockReview: UserReviewSendingData = {
      comment: lorem.sentences(),
      rating: makeMockRating(),
    };
    const mockStore = makeMockStore({
      [ DomainNamespace.Reviews ]: {
        userComment: mockReview.comment,
        userOfferId: mockOfferId,
        userRating: mockReview.rating,
      },
    });

    mockAPI
      .onPost(`${APIRoute.Reviews}${mockOfferId}`, mockReview)
      .reply(200);

    await mockStore.dispatch(sendAction());

    const actions = mockStore.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      sendAction.pending.type,
      sendAction.fulfilled.type
    ]);
  });


  it('sends review, checks "pending and rejected" states', async () => {
    const mockOfferId = datatype.number();
    const mockReview: UserReviewSendingData = {
      comment: lorem.sentences(),
      rating: makeMockRating(),
    };
    const mockStore = makeMockStore({
      [ DomainNamespace.Reviews ]: {
        userComment: mockReview.comment,
        userOfferId: mockOfferId,
        userRating: mockReview.rating,
      },
    });

    mockAPI
      .onPost(`${APIRoute.Reviews}${mockOfferId}`, mockReview )
      .reply(401);

    await mockStore.dispatch(sendAction());

    const actions = mockStore.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      sendAction.pending.type,
      sendAction.rejected.type
    ]);
  });
});

