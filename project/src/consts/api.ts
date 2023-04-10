export const BACKEND_URL = 'https://12.react.pages.academy/six-cities-simple' as const;
export const BACKEND_URL_DESCRIPTION = 'https://12.react.pages.academy/six-cities-simple/spec' as const;

export enum APIRoute {
  Login = '/login',
  Logout = '/logout',
  Offer = '/hotels/',
  Offers = '/hotels',
  Reviews = '/comments',
}

export const TOKEN_HEADER_NAME = 'X-Token' as const;

export const REQUEST_TIMEOUT = 5000 as const;

export enum AuthorizationStatus {
  Authorized = 'AUTHORIZED',
  NotAuthorized = 'NOT_AUTHORIZED',
  Unknown = 'UNKNOWN',
}

export enum FetchStatus {
  FetchedWithError = 'fetched-with-error',
  FetchedWithNoError = 'fetched-with-no-error',
  NotStarted = 'not-started',
  Pending = 'pending',
}
