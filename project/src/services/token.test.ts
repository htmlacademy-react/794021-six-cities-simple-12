import { datatype } from 'faker';
import { dropToken, getToken, setToken } from './token';

const localStorageMock = (function localStorageMock () {
  let store = {} as Record<string, string>;

  return {
    getItem(key: string) {
      return store[key];
    },

    setItem(key: string, value: string) {
      store[key] = value;
    },

    clear() {
      store = {};
    },

    removeItem(key: string) {
      delete store[key];
    },

    getAll() {
      return store;
    },
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });


describe('Service function: "token"-related', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('tests function: getToken() of empty sotre', () => {
    const token = getToken();
    expect(token)
      .toEqual('');
  });

  it('tests functions: setToken() + getToken', () => {
    const mockToken1 = datatype.string(10);
    const mockToken2 = datatype.string(10);
    const mockToken3 = datatype.string(10);

    setToken(mockToken1);
    expect(getToken()).toEqual(mockToken1);
    expect(getToken()).toEqual(mockToken1);

    setToken(mockToken2);
    setToken(mockToken3);
    expect(getToken()).toEqual(mockToken3);
    expect(getToken()).toEqual(mockToken3);
  });


  it('tests function: dropToken() called several times', () => {
    const mockToken = datatype.string(10);

    setToken(mockToken);

    dropToken();
    expect(getToken()).toEqual('');
    expect(getToken()).toEqual('');

    dropToken();
    dropToken();
    expect(getToken()).toEqual('');
  });
});

