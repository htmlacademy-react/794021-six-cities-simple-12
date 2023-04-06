export const BACKEND_URL = 'https://12.react.pages.academy/six-cities-simple';
export const BACKEND_URL_DESCRIPTION = 'https://12.react.pages.academy/six-cities-simple/spec';

export enum APIRoute {
  Login = '/login',
  Logout = '/logout',
  Offer = '/hotels/',
  Offers = '/hotels',
  Reviews = '/comments',
}

export const TOKEN_HEADER_NAME = 'X-Token';

export const REQUEST_TIMEOUT = 5000;

export enum AuthorizationStatus {
  Authorized = 'AUTHORIZED',
  NotAuthorized = 'NOT_AUTHORIZED',
  Unknown = 'UNKNOWN',
}
