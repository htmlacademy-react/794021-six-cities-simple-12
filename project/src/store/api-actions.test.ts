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

const mockStore = configureMockStore<
  AppState,
  Action<string>,
  ThunkDispatch<AppState, typeof api, Action>
>(middlewares);


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
