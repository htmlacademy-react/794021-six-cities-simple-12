import MockAdapter from 'axios-mock-adapter';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { fetchReviewsAction } from './api-reviews.actions';
import { APIRoute } from 'src/consts/api';
import { createAPI } from 'src/services/api';
import { makeMockOffer } from 'src/utils/mock-offer';
import { makeMockReviewsMap } from 'src/utils/mock-review';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { AppState } from 'src/types/store';
import { Action } from '@reduxjs/toolkit';

const api = createAPI();
const mockAPI = new MockAdapter(api);
const middlewares = [thunk.withExtraArgument(api)];

const makeMockStore = configureMockStore<
  AppState,
  Action<string>,
  ThunkDispatch<AppState, typeof api, Action>
>(middlewares);


describe('Async API review-related actions', () => {
  const action = fetchReviewsAction;

  it('checks "pending and fulfilled" states when reviews fetched successfully', async () => {
    const offer = makeMockOffer();
    const reviewsMap = makeMockReviewsMap(offer.id, 30);
    const store = makeMockStore();
    mockAPI
      .onGet(`${APIRoute.Reviews}${offer.id}`)
      .reply(200, reviewsMap);

    await store.dispatch(action(offer));
    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      action.pending.type,
      action.fulfilled.type
    ]);
  });

  it('checks "pending and rejected" states when reviews fetching failed', async () => {
    const offer = makeMockOffer();
    const store = makeMockStore();
    mockAPI
      .onGet(`${APIRoute.Reviews}${offer.id}`)
      .reply(404);

    await store.dispatch(action(offer));
    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      action.pending.type,
      action.rejected.type
    ]);
  });
});

