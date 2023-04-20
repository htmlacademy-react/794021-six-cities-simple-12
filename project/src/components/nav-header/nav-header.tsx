import { MouseEvent } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { store } from 'src/store';
import { getAuthorizationStatus, getUserAvatarUrl, getUserLogin } from 'src/store/user/user.selectors';
import cn from 'classnames';
import { logUserOutAction } from 'src/store/api-user/api-user.actions';
import { isCurrentPage } from 'src/utils/utils';
import { AppRoute } from 'src/consts/consts';
import { AuthorizationStatus } from 'src/consts/api';

function NavHeader(): JSX.Element {
  const authorizationStatus = useSelector(getAuthorizationStatus) || AuthorizationStatus.Unknown;
  const userAvatarUrl = useSelector(getUserAvatarUrl) || '';
  const userLogin = useSelector(getUserLogin) || '';
  const { pathname: locationPathname } = useLocation();
  const avatarCssStyle = { backgroundImage: `url(${userAvatarUrl})` };

  let signInOutLinkHref = '';
  let signInOutLinkText = '';

  if (authorizationStatus === AuthorizationStatus.Authorized) {
    signInOutLinkText = 'Sign out';
    signInOutLinkHref = '';
  } else if (authorizationStatus === AuthorizationStatus.NotAuthorized) {
    signInOutLinkText = 'Sign in';
    signInOutLinkHref = AppRoute.Login;
  }

  const handleSignInOutClick = (evt: MouseEvent) => {
    if (authorizationStatus !== AuthorizationStatus.Authorized) {
      return;
    }
    evt.preventDefault();
    store.dispatch(logUserOutAction());
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link
              className={cn(
                'header__logo-link',
                {'header__logo-link--active':  isCurrentPage(locationPathname, AppRoute.Root)}
              )}
              to="/"
            >
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
            </Link>
          </div>

          {
            isCurrentPage(locationPathname, AppRoute.Login) ?
              null :
              <nav className="header__nav">
                <ul className="header__nav-list">
                  {
                    authorizationStatus === AuthorizationStatus.Authorized &&
                    <li className="header__nav-item user">
                      <div className="header__nav-profile">
                        <div className="header__avatar-wrapper user__avatar-wrapper" style={avatarCssStyle}></div>
                        <span className="header__user-name user__name">{userLogin}</span>
                      </div>
                    </li>
                  }

                  <li className="header__nav-item">
                    <Link className="header__nav-link" to={signInOutLinkHref} onClick={handleSignInOutClick}>
                      {
                        authorizationStatus === AuthorizationStatus.Authorized ?
                          <div className="header__avatar-wrapper user__avatar-wrapper"></div> :
                          null
                      }
                      <span
                        className={cn({
                          'header__signout': authorizationStatus === AuthorizationStatus.Authorized,
                          'header__login': authorizationStatus === AuthorizationStatus.NotAuthorized,
                        })}
                      >
                        {signInOutLinkText}
                      </span>
                    </Link>
                  </li>
                </ul>
              </nav>
          }
        </div>
      </div>
    </header>
  );
}

export default NavHeader;
