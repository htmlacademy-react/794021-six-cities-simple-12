import { AuthorizationStatus } from 'src/consts/api';
import { checkIfUserAuthorizedAction, logUserInAction, logUserOutAction } from '../api-actions';
import { user } from './user.slice';
const { reducer } = user;

const AUTH_STATUS_AUTHORIZED = 'AUTHORIZED' as AuthorizationStatus;
const AUTH_STATUS_NOT_AUTHORIZED = 'NOT_AUTHORIZED' as const;
const AUTH_STATUS_UNKNONW = 'UNKNOWN' as const;
const EMAIL_FROM_BACKEND = 'fake@fake.fake' as const;
const USER_AVATAR_URL_FROM_BACKEND = 'http://fake.fake/fake.jpeg' as const;

describe('Reducer: user', () => {
  it('returns initial state if sent unknown action', () => {
    expect(reducer(undefined, { type: 'FAKE_ACTION' }))
      .toEqual({
        authorizationStatus: AUTH_STATUS_UNKNONW,
        avatarUrl: '',
        login: '',
      });
  });

  it('sets user authorization status if authorizition is successful', () => {
    const initialState = reducer(undefined, { type: 'FAKE_ACTION' });

    const stateToBe = {
      ...initialState,
      authorizationStatus: AUTH_STATUS_AUTHORIZED,
      avatarUrl: USER_AVATAR_URL_FROM_BACKEND,
      login: EMAIL_FROM_BACKEND,
    };

    const action = {
      payload: { avatarUrl: USER_AVATAR_URL_FROM_BACKEND, email: EMAIL_FROM_BACKEND },
      type: checkIfUserAuthorizedAction.fulfilled.type,
    };

    const afterState = user.reducer(initialState, action);

    expect(afterState)
      .toEqual(stateToBe);
  });


  it('sets user authorization status if authorizition is rejected', () => {
    const initialState = reducer(undefined, { type: 'FAKE_ACTION' });

    const stateToBe = {
      ...initialState,
      authorizationStatus: AUTH_STATUS_NOT_AUTHORIZED,
    };

    const action = {
      type: checkIfUserAuthorizedAction.rejected.type,
    };

    const afterState = user.reducer(initialState, action);

    expect(afterState)
      .toEqual(stateToBe);
  });

  it('sets user data when logging-in is successful', () => {
    const initialState = reducer(undefined, { type: 'FAKE_ACTION' });

    const stateToBe = {
      ...initialState,
      authorizationStatus: AUTH_STATUS_AUTHORIZED,
      avatarUrl: USER_AVATAR_URL_FROM_BACKEND,
      login: EMAIL_FROM_BACKEND,
    };
    const action = {
      payload: { avatarUrl: USER_AVATAR_URL_FROM_BACKEND, email: EMAIL_FROM_BACKEND },
      type: logUserInAction.fulfilled.type,
    };
    const afterState = user.reducer(initialState, action);

    expect(afterState)
      .toEqual(stateToBe);
  });

  it('sets user data when logging-in is pending', () => {
    const initialState = reducer(undefined, { type: 'FAKE_ACTION' });

    const stateToBe = {
      ...initialState,
      login: EMAIL_FROM_BACKEND,
    };
    const action = {
      meta: { arg: { email: EMAIL_FROM_BACKEND }},
      type: logUserInAction.pending.type,
    };
    const afterState = user.reducer(initialState, action);

    expect(afterState)
      .toEqual(stateToBe);
  });

  it('sets user data when logging-in is rejected', () => {
    const initialState = reducer(undefined, { type: 'FAKE_ACTION' });

    const stateToBe = {
      ...initialState,
      authorizationStatus: AUTH_STATUS_NOT_AUTHORIZED,
    };

    const action = {
      type: logUserInAction.rejected.type,
    };

    const afterState = user.reducer(initialState, action);

    expect(afterState)
      .toEqual(stateToBe);
  });

  it('sets user data when logging-out is pending', () => {
    const initialState = {
      ...reducer(undefined, { type: 'FAKE_ACTION' }),
      authorizationStatus: AUTH_STATUS_AUTHORIZED,
      login: EMAIL_FROM_BACKEND,
    };

    const action = {
      type: logUserOutAction.pending.type,
    };

    const stateToBe = {
      ...initialState,
      login: '',
      authorizationStatus: AUTH_STATUS_NOT_AUTHORIZED,
    };

    const afterState = user.reducer(initialState, action);

    expect(afterState)
      .toEqual(stateToBe);
  });
});
