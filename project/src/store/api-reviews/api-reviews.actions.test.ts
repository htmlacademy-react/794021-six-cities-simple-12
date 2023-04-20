import MockAdapter from 'axios-mock-adapter';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { fetchReviewsAction, sendReviewAction } from './api-reviews.actions';
import { APIRoute } from 'src/consts/api';
import { createAPI } from 'src/services/api';
import { makeMockOffer } from 'src/utils/mock-offer';
import { makeMockReviewsMap } from 'src/utils/mock-review';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { AppState } from 'src/types/store';
import { Action } from '@reduxjs/toolkit';
import { datatype, lorem } from 'faker';
import { UserReviewActionData, UserReviewSendingData } from 'src/types/api';

const api = createAPI();
const mockAPI = new MockAdapter(api);
const middlewares = [thunk.withExtraArgument(api)];

const makeMockStore = configureMockStore<
  AppState,
  Action<string>,
  ThunkDispatch<AppState, typeof api, Action>
>(middlewares);

const store = makeMockStore();

describe('Async API review-related actions', () => {
  const fetchAction = fetchReviewsAction;
  const sendAction = sendReviewAction;

  it('checks "pending and fulfilled" states when reviews fetched successfully', async () => {
    const offer = makeMockOffer();
    const reviewsMap = makeMockReviewsMap(offer.id, 30);
    mockAPI
      .onGet(`${APIRoute.Reviews}${offer.id}`)
      .reply(200, reviewsMap);

    store.clearActions();
    await store.dispatch(fetchAction(offer));
    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      fetchAction.pending.type,
      fetchAction.fulfilled.type
    ]);
  });


  it('checks "pending and rejected" states when reviews fetching failed', async () => {
    const offer = makeMockOffer();
    mockAPI
      .onGet(`${APIRoute.Reviews}${offer.id}`)
      .reply(404);

    store.clearActions();
    await store.dispatch(fetchAction(offer));
    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      fetchAction.pending.type,
      fetchAction.rejected.type
    ]);
  });


  it('sends user review with response 200', async () => {
    const sendingReview: UserReviewSendingData = {
      comment: lorem.sentences(),
      rating: datatype.number({ min: 1, max: 5 }),
    };

    const actionReview: UserReviewActionData = {
      ...sendingReview,
      id: datatype.number(),
    };

    mockAPI
      .onPost(`${APIRoute.Reviews}${actionReview.id}`, sendingReview )
      .reply(200);

    store.clearActions();
    await store.dispatch(sendAction(actionReview));
    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      sendAction.pending.type,
      sendAction.fulfilled.type
    ]);
  });


  it('sends user review with response 400/401', async () => {
    const sendingReview: UserReviewSendingData = {
      comment: lorem.sentences(),
      rating: datatype.number({ min: 1, max: 5 }),
    };

    const actionReview: UserReviewActionData = {
      ...sendingReview,
      id: datatype.number(),
    };

    mockAPI
      .onPost(`${APIRoute.Reviews}${actionReview.id}`, sendingReview )
      .reply(400);

    store.clearActions();
    await store.dispatch(sendAction(actionReview));
    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      sendAction.pending.type,
      sendAction.rejected.type
    ]);
  });
});

