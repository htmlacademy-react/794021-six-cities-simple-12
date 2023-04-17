import { renderHook } from '@testing-library/react';
import { Provider } from 'react-redux';
import * as useAppSelector from 'src/hooks';
import { useRedirectingIfAuthorized } from './use-redirecting-if-authorized';
import { configureMockStore } from '@jedmao/redux-mock-store';

const makeMockStore = configureMockStore();
const mockStore = makeMockStore();

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}));

jest.mock('src/store/user/user.selectors', () => ({
  getAuthorizationStatus: jest.fn(),
}));


describe('Hook: useRedirectingIfAuthorized()', () => {
  it('redirects to specified link if the user is authorized', () => {
    const LINK = '/MOCK-LINK';

    jest
      .spyOn(useAppSelector, 'useAppSelector')
      .mockImplementation(() => 'AUTHORIZED');

    renderHook(
      () => useRedirectingIfAuthorized(LINK),
      { wrapper: ({ children }) => (<Provider store={mockStore}>{children}</Provider>) },
    );

    expect(mockNavigate)
      .toBeCalledWith(LINK);
  });


  it('do not redirect if the user is not authorized', () => {
    const LINK = '/MOCK-LINK';

    jest.mock('src/hooks', () => ({
      useAppSelector: () => 'NOT_AUTHORIZED',
    }));

    renderHook(
      () => useRedirectingIfAuthorized(LINK),
      { wrapper: ({ children }) => (<Provider store={mockStore}>{children}</Provider>) },
    );

    expect(mockNavigate).not.toBeCalledWith(LINK);
  });

  it('do not redirect if link is empty', () => {
    const LINK = '';

    jest.mock('src/hooks', () => ({
      useAppSelector: () => 'NOT_AUTHORIZED',
    }));

    renderHook(
      () => useRedirectingIfAuthorized(LINK),
      { wrapper: ({ children }) => (<Provider store={mockStore}>{children}</Provider>) },
    );

    expect(mockNavigate).not.toBeCalledWith(LINK);
  });
});
