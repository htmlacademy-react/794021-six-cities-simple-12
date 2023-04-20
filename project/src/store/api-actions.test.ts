import { Action } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import {configureMockStore} from '@jedmao/redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import { fetchOfferAction, fetchOffersAction } from './api-actions';
import { createAPI } from 'src/services/api';
import { AppState } from 'src/types/store';
import { APIRoute } from 'src/consts/api';
import { makeMockOffer, makeMockOffers } from 'src/utils/mock-offer';

const api = createAPI();
const mockAPI = new MockAdapter(api);
const middlewares = [thunk.withExtraArgument(api)];

const makeMockStore = configureMockStore<
  AppState,
  Action<string>,
  ThunkDispatch<AppState, typeof api, Action>
>(middlewares);


describe('Async API offer-related actions', () => {
  it('fetches one offer with "pending and fulfilled" states', async () => {
    const offerId = 1;
    const offer = makeMockOffer();
    const action = fetchOfferAction;
    const store = makeMockStore();

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

  it('fetches one offer with "pending and rejected" states', async () => {
    const offerId = 1;
    const action = fetchOfferAction;
    const store = makeMockStore();

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

  it('fetches all offers with "pending and fulfilled" states', async () => {
    const mockOffers = makeMockOffers(30);
    const action = fetchOffersAction;
    const mockStore = makeMockStore();

    mockAPI
      .onGet(APIRoute.Offers)
      .reply(200, mockOffers);

    await mockStore.dispatch(action());
    const actions = mockStore.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      action.pending.type,
      action.fulfilled.type
    ]);
  });

  it('fetches all offers with "pending and rejected" states', async () => {
    const action = fetchOffersAction;
    const store = makeMockStore();

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
