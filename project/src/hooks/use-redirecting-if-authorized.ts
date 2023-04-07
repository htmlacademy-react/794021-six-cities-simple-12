import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuthorizationStatus } from 'src/store/user/user.selectors';
import { useAppSelector } from 'src/hooks';
import { AuthorizationStatus } from 'src/consts/api';

export function useRedirectingIfAuthorized(link: string): void {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const navigate = useNavigate();

  useEffect(() => {
    if (
      authorizationStatus === AuthorizationStatus.Authorized &&
      link &&
      navigate &&
      true
    ) {
      navigate(link);
    }
  }, [authorizationStatus, link, navigate]);
}
