import { Action } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import {configureMockStore} from '@jedmao/redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import { checkIfUserAuthorizedAction, logUserInAction, logUserOutAction } from './api-user.actions';
import { createAPI } from 'src/services/api';
import { AppState } from 'src/types/store';
import { APIRoute } from 'src/consts/api';
import { internet } from 'faker';

const api = createAPI();
const mockAPI = new MockAdapter(api);
const middlewares = [thunk.withExtraArgument(api)];

const makeMockStore = configureMockStore<
  AppState,
  Action<string>,
  ThunkDispatch<AppState, typeof api, Action>
>(middlewares);

const mockStore = makeMockStore();

describe('Async API user-related actions', () => {
  beforeEach(() => mockStore.clearActions());

  it('checks authorization by token with "pending and fulfilled" states', async () => {
    mockAPI
      .onGet(APIRoute.Login)
      .reply(200, []);

    expect(mockStore.getActions()).toEqual([]);

    await mockStore.dispatch(checkIfUserAuthorizedAction());

    const actions = mockStore.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      checkIfUserAuthorizedAction.pending.type,
      checkIfUserAuthorizedAction.fulfilled.type,
    ]);
  });

  it('checks authorization by token with "pending and rejected" states', async () => {
    const action = checkIfUserAuthorizedAction;
    mockAPI
      .onGet(APIRoute.Login)
      .reply(401, []);

    expect(mockStore.getActions()).toEqual([]);

    await mockStore.dispatch(action());

    const actions = mockStore.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      action.pending.type,
      action.rejected.type,
    ]);
  });

  it('logs in with "pending and fulfilled" states', async () => {
    const action = logUserInAction;
    const userAuthorizationData = { email: internet.email(), password: internet.password() };
    mockAPI
      .onPost(APIRoute.Login)
      .reply(200);

    expect(mockStore.getActions()).toEqual([]);

    await mockStore.dispatch(action(userAuthorizationData));

    const actions = mockStore.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      action.pending.type,
      action.fulfilled.type,
    ]);
  });

  it('logs out with "pending and fulfilled" states', async () => {
    const action = logUserOutAction;
    mockAPI
      .onDelete(APIRoute.Logout)
      .reply(204);

    expect(mockStore.getActions()).toEqual([]);

    await mockStore.dispatch(action());

    const actions = mockStore.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      action.pending.type,
      action.fulfilled.type,
    ]);
  });
});
