import { Action } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import {configureMockStore} from '@jedmao/redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import { checkIfUserAuthorizedAction, fetchOfferAction, fetchOffersAction, logUserInAction, logUserOutAction } from './api-actions';
import { createAPI } from 'src/services/api';
import { AppState } from 'src/types/store';
import { APIRoute } from 'src/consts/api';
import { makeMockOffer, makeMockOffers } from 'src/utils/mock-offer';
import { internet } from 'faker';

const api = createAPI();
const mockAPI = new MockAdapter(api);
const middlewares = [thunk.withExtraArgument(api)];

const mockStore = configureMockStore<
  AppState,
  Action<string>,
  ThunkDispatch<AppState, typeof api, Action>
>(middlewares);

describe('Async API user-related actions', () => {
  it('gives "pending and fulfilled" states if authorization successful', async () => {
    const store = mockStore();
    mockAPI
      .onGet(APIRoute.Login)
      .reply(200, []);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(checkIfUserAuthorizedAction());

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      checkIfUserAuthorizedAction.pending.type,
      checkIfUserAuthorizedAction.fulfilled.type,
    ]);
  });

  it('gives "pending and rejected" states if authorization failed', async () => {
    const action = checkIfUserAuthorizedAction;
    const store = mockStore();
    mockAPI
      .onGet(APIRoute.Login)
      .reply(401, []);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(action());

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      action.pending.type,
      action.rejected.type,
    ]);
  });

  it('gives "pending and fulfilled" states if logs in successfully', async () => {
    const action = logUserInAction;
    const userAuthorizationData = { email: internet.email(), password: internet.password() };
    const store = mockStore();
    mockAPI
      .onPost(APIRoute.Login)
      .reply(200);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(action(userAuthorizationData));

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      action.pending.type,
      action.fulfilled.type,
    ]);
  });

  it('gives "pending and fulfilled" states if logs out', async () => {
    const action = logUserOutAction;
    const store = mockStore();
    mockAPI
      .onDelete(APIRoute.Logout)
      .reply(204);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(action());

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      action.pending.type,
      action.fulfilled.type,
    ]);
  });
});


describe('Async API offer-related actions', () => {
  it('checks "pending and fulfilled" states when one offer fetched successfully', async () => {
    const offerId = 1;
    const offer = makeMockOffer();
    const action = fetchOfferAction;
    const store = mockStore();
    mockAPI
      .onGet(`${APIRoute.Offer}${offerId}`)
      .reply(200, offer);

    await store.dispatch(action(offerId));
    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      action.pending.type,
      action.fulfilled.type
    ]);
  });

  it('checks "pending and rejected" states when one offer fetching failed', async () => {
    const offerId = 1;
    const action = fetchOfferAction;
    const store = mockStore();
    mockAPI
      .onGet(`${APIRoute.Offer}${offerId}`)
      .reply(404);

    await store.dispatch(action(offerId));
    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      action.pending.type,
      action.rejected.type
    ]);
  });

  it('checks "pending and fulfilled" states when offers fetched successfully', async () => {
    const offers = makeMockOffers(30);
    const action = fetchOffersAction;
    const store = mockStore();
    mockAPI
      .onGet(APIRoute.Offers)
      .reply(200, offers);

    await store.dispatch(action());
    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      action.pending.type,
      action.fulfilled.type
    ]);
  });

  it('checks "pending and rejected" states when offers fetching failed', async () => {
    const action = fetchOffersAction;
    const store = mockStore();
    mockAPI
      .onGet(APIRoute.Offers)
      .reply(400);

    await store.dispatch(action());
    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      action.pending.type,
      action.rejected.type
    ]);
  });
});
