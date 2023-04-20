import { renderHook } from '@testing-library/react';
import { Provider } from 'react-redux';
import { useRedirectingIfAuthorized } from './use-redirecting-if-authorized';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { AuthorizationStatus } from 'src/consts/api';
import { DomainNamespace } from 'src/consts/domain';

const makeMockStore = configureMockStore();

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}));


describe('Hook: useRedirectingIfAuthorized()', () => {
  it('redirects to specified link if the user is authorized', () => {
    const LINK = '/MOCK-REDIRECT-LINK';

    const mockStore = makeMockStore({
      [ DomainNamespace.User ]: {
        authorizationStatus: AuthorizationStatus.Authorized,
      },
    });

    renderHook(
      () => useRedirectingIfAuthorized(LINK),
      { wrapper: ({ children }) => (<Provider store={mockStore}>{children}</Provider>) },
    );

    expect(mockNavigate)
      .toBeCalledWith(LINK);
  });


  it('do not redirect if the user is not authorized', () => {
    const LINK = '/MOCK-LINK';

    const mockStore = makeMockStore({
      [ DomainNamespace.User ]: {
        authorizationStatus: AuthorizationStatus.NotAuthorized,
      },
    });

    renderHook(
      () => useRedirectingIfAuthorized(LINK),
      { wrapper: ({ children }) => (<Provider store={mockStore}>{children}</Provider>) },
    );

    expect(mockNavigate).not.toBeCalledWith(LINK);
  });


  it('do not redirect if link is empty', () => {
    const LINK = '';

    const mockStore = makeMockStore({
      [ DomainNamespace.User ]: {
        authorizationStatus: AuthorizationStatus.Authorized,
      },
    });

    renderHook(
      () => useRedirectingIfAuthorized(LINK),
      { wrapper: ({ children }) => (<Provider store={mockStore}>{children}</Provider>) },
    );

    expect(mockNavigate).not.toBeCalledWith(LINK);
  });
});
