import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthorizationStatus } from 'src/consts/api';
import { useAppSelector } from 'src/hooks';

export function useRedirectingIfAuthorized(link: string): void {
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
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
