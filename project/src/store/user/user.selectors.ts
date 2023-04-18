import { AuthorizationStatus } from 'src/consts/api';
import { DomainNamespace } from 'src/consts/domain';
import { AppState } from 'src/types/store';
import { UserLogin } from 'src/types/types';

export function getAuthorizationStatus(state: AppState): AuthorizationStatus {
  return state[DomainNamespace.User].authorizationStatus;
}

export function getUserLogin(state: AppState): UserLogin {
  return state[DomainNamespace.User].login;
}

export function getUserAvatarUrl(state: AppState): string {
  return state[DomainNamespace.User].avatarUrl;
}
