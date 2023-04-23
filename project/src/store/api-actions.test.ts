import { Action } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import {configureMockStore} from '@jedmao/redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import { fetchNearbyOffersAction, fetchOfferAction, fetchOffersAction } from './api-actions';
import { createAPI } from 'src/services/api';
import { AppState } from 'src/types/store';
import { APIRoute } from 'src/consts/api';
import { makeMockOffer, makeMockOffers } from 'src/utils/mock-offer';
import { datatype } from 'faker';

const api = createAPI();
const mockAPI = new MockAdapter(api);
const middlewares = [thunk.withExtraArgument(api)];

const makeMockStore = configureMockStore<
  AppState,
  Action<string>,
  ThunkDispatch<AppState, typeof api, Action>
>(middlewares);

const mockStore = makeMockStore();

describe('Async API offer-related actions', () => {
  beforeEach(() => mockStore.clearActions());

  it('fetches one offer with "pending and fulfilled" states', async () => {
    const action = fetchOfferAction;
    const offerId = 1;
    const offer = makeMockOffer();

    mockAPI
      .onGet(`${APIRoute.Offer}${offerId}`)
      .reply(200, offer);

    await mockStore.dispatch(action(offerId));

    const actions = mockStore.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      action.pending.type,
      action.fulfilled.type
    ]);
  });

  it('fetches one offer with "pending and rejected" states', async () => {
    const action = fetchOfferAction;
    const offerId = 1;

    mockAPI
      .onGet(`${APIRoute.Offer}${offerId}`)
      .reply(404);

    await mockStore.dispatch(action(offerId));

    const actions = mockStore.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      action.pending.type,
      action.rejected.type
    ]);
  });

  it('fetches all offers with "pending and fulfilled" states', async () => {
    const mockOffers = makeMockOffers(30);
    const action = fetchOffersAction;

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

    mockAPI
      .onGet(APIRoute.Offers)
      .reply(400);

    await mockStore.dispatch(action());
    const actions = mockStore.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      action.pending.type,
      action.rejected.type
    ]);
  });


  it('fetches nearby offers with "pending and fulfilled" states', async () => {
    const action = fetchNearbyOffersAction;
    const mockOfferId = datatype.number({ min: 1 });
    const mockOffers = makeMockOffers(5);

    mockAPI
      .onGet(`${APIRoute.Offer}${mockOfferId}${APIRoute.NearbyOffersForOffer}`)
      .reply(200, mockOffers);

    await mockStore.dispatch(action(mockOfferId));

    const actions = mockStore.getActions().map(({ type }) => type);
    expect(actions).toEqual([
      action.pending.type,
      action.fulfilled.type
    ]);
  });


  it('fetches nearby offers with "pending and rejected" states', async () => {
    const action = fetchNearbyOffersAction;
    const mockOfferId = datatype.number({ min: 1 });

    mockAPI
      .onGet(`${APIRoute.Offer}${mockOfferId}${APIRoute.NearbyOffersForOffer}`)
      .reply(404);

    await mockStore.dispatch(action(mockOfferId));

    const actions = mockStore.getActions().map(({ type }) => type);
    expect(actions).toEqual([
      action.pending.type,
      action.rejected.type
    ]);
  });
});
