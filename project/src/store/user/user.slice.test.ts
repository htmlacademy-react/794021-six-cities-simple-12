import { AuthorizationStatus } from 'src/consts/api';
import { checkIfUserAuthorizedAction, logUserInAction, logUserOutAction } from '../api-actions';
import { setUserLoginAction, user } from './user.slice';
import { internet } from 'faker';

const { reducer } = user;
const mockEmail = internet.email();
const mockUserAvatarUrl = internet.url();

describe('Reducer: user', () => {
  it('returns initial state if sent unknown action', () => {
    const initialState = reducer(undefined, { type: 'FAKE_ACTION' });

    expect(initialState)
      .toEqual({
        authorizationStatus: AuthorizationStatus.Unknown,
        avatarUrl: '',
        login: '',
      });
  });


  it('sets user authorization status if authorizition is successful', () => {
    const initialState = reducer(undefined, { type: 'FAKE_ACTION' });

    const stateToBe = {
      ...initialState,
      authorizationStatus: AuthorizationStatus.Authorized,
      avatarUrl: mockUserAvatarUrl,
      login: mockEmail,
    };

    const action = {
      payload: { avatarUrl: mockUserAvatarUrl, email: mockEmail },
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
      authorizationStatus: AuthorizationStatus.NotAuthorized,
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
      authorizationStatus: AuthorizationStatus.Authorized,
      avatarUrl: mockUserAvatarUrl,
      login: mockEmail,
    };
    const action = {
      payload: { avatarUrl: mockUserAvatarUrl, email: mockEmail },
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
      login: mockEmail,
    };
    const action = {
      meta: { arg: { email: mockEmail }},
      type: logUserInAction.pending.type,
    };

    expect(user.reducer(initialState, action))
      .toEqual(stateToBe);
  });


  it('sets user data when logging-in is rejected', () => {
    const initialState = reducer(undefined, { type: 'FAKE_ACTION' });

    const stateToBe = {
      ...initialState,
      authorizationStatus: AuthorizationStatus.NotAuthorized,
    };

    const action = {
      type: logUserInAction.rejected.type,
    };

    expect(user.reducer(initialState, action))
      .toEqual(stateToBe);
  });


  it('sets user data when logging-out is pending', () => {
    const initialState = {
      ...reducer(undefined, { type: 'FAKE_ACTION' }),
      authorizationStatus: AuthorizationStatus.Authorized,
      login: mockEmail,
    };

    const action = {
      type: logUserOutAction.pending.type,
    };

    const stateToBe = {
      ...initialState,
      login: '',
      authorizationStatus: AuthorizationStatus.NotAuthorized,
    };

    expect(user.reducer(initialState, action))
      .toEqual(stateToBe);
  });


  it('sets user login', () => {
    const initialState = {
      ...reducer(undefined, { type: 'FAKE_ACTION' }),
      login: '',
    };

    const stateToBe = {
      ...initialState,
      login: mockEmail,
    };

    const action = {
      payload: mockEmail,
      type: setUserLoginAction.type,
    };

    expect(user.reducer(initialState, action))
      .toEqual(stateToBe);
  });
});
