import { Link, useLocation } from 'react-router-dom';
import { getAuthorizationStatus, getUserAvatarUrl, getUserLogin } from 'src/store/user/user.selectors';
import { useAppDispatch, useAppSelector } from 'src/hooks';
import cn from 'classnames';
import { logUserOutAction } from 'src/store/api-user/api-user.actions';
import { isCurrentPage } from 'src/utils/utils';
import { AppRoute } from 'src/consts/consts';
import { AuthorizationStatus } from 'src/consts/api';

function NavHeader(): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const userAvatarUrl = useAppSelector(getUserAvatarUrl);
  const userLogin = useAppSelector(getUserLogin);
  const { pathname: locationPathname } = useLocation();
  const avatarCssStyle = { backgroundImage: `url(${userAvatarUrl})` };

  let linkBlock: JSX.Element;

  switch (authorizationStatus) {
    case AuthorizationStatus.Authorized:
      linkBlock = <SignOutLink />;
      break;
    case AuthorizationStatus.NotAuthorized:
      linkBlock = <SignInLink />;
      break;
    default:
      linkBlock = <NoLink />;
  }

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
                    { linkBlock }
                  </li>
                </ul>
              </nav>
          }
        </div>
      </div>
    </header>
  );
}

function SignInLink(): JSX.Element {
  return (
    <Link className="header__nav-link" to={AppRoute.Login}>
      <span className="header__login">Sign in</span>
    </Link>
  );
}

function SignOutLink(): JSX.Element {
  const dispatch = useAppDispatch();

  return (
    <Link className="header__nav-link" to="/#" onClick={
      (evt) => {
        evt.preventDefault();
        dispatch(logUserOutAction());
      }
    }
    >
      <div className="header__avatar-wrapper user__avatar-wrapper"></div>
      <span className="header__signout">Sign out</span>
    </Link>
  );
}

function NoLink(): JSX.Element {
  return (
    <div className="header__nav-link">
      <span></span>
    </div>
  );
}

export default NavHeader;
