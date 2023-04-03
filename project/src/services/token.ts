import { Token } from 'src/types/local-storage';
import { AUTH_TOKEN_LOCAL_STORAGE_KEY_NAME } from 'src/consts/local-storage';

export const getToken = (): Token => {
  const token = localStorage.getItem(AUTH_TOKEN_LOCAL_STORAGE_KEY_NAME);
  return token ?? '';
};

export const saveToken = (token: Token): void => {
  localStorage.setItem(AUTH_TOKEN_LOCAL_STORAGE_KEY_NAME, token);
};

export const deleteToken = (): void => {
  localStorage.removeItem(AUTH_TOKEN_LOCAL_STORAGE_KEY_NAME);
};
