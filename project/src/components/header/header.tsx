import { MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import HeaderNav from './header-nav';
import { useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'src/hooks';
import { isCurrentPage } from 'src/utils/utils';
import { AppRoute } from 'src/consts/consts';
import { AuthorizationStatus } from 'src/consts/api';
import { logUserOut } from 'src/store/api-actions';

function HeaderMain(): JSX.Element {
  const { pathname: currentPath } = useLocation();
  const userLogin = useAppSelector((state) => state.userLogin);
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const dispatch = useAppDispatch();
  const linkClassName = isCurrentPage(currentPath, AppRoute.Root) ?
    'header__logo-link header__logo-link--active' :
    'header__logo-link';

  const handleOnClick = (evt: MouseEvent) => {
    if (authorizationStatus !== AuthorizationStatus.Authorized) {
      return;
    }

    evt.preventDefault();
    dispatch(logUserOut());
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link className={linkClassName} to="/">
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
            </Link>
          </div>

          {
            isCurrentPage(currentPath, AppRoute.Login) ?
              null :
              <HeaderNav
                onClick={handleOnClick}
                userLogin={authorizationStatus === AuthorizationStatus.Authorized ? userLogin : ''}
              />
          }
        </div>
      </div>
    </header>
  );
}

export default HeaderMain;
