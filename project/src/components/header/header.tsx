import { MouseEvent } from 'react';
import { Link, useLocation } from 'react-router-dom';
import cn from 'classnames';
import { useAppDispatch } from 'src/hooks';
import { isCurrentPage } from 'src/utils/utils';
import { AppRoute } from 'src/consts/consts';
import { logUserOutAction } from 'src/store/api-actions';

type HeaderProps = {
  isAuthorized: boolean;
  isNotAuthorized: boolean;
  userAvatarUrl: string;
  userLogin: string;
}

function Header(props: HeaderProps): JSX.Element {
  const dispatch = useAppDispatch();
  const { pathname: locationPathname } = useLocation();
  const avatarCssStyle = { backgroundImage: `url(${props.userAvatarUrl})` };

  let signInOutLinkHref = '';
  let signInOutLinkText = '';

  if (props.isAuthorized) {
    signInOutLinkText = 'Sign out';
    signInOutLinkHref = '';
  } else if (props.isNotAuthorized) {
    signInOutLinkText = 'Sign in';
    signInOutLinkHref = AppRoute.Login;
  }

  const handleOnClick = (evt: MouseEvent) => {
    if (!props.isAuthorized) {
      return;
    }
    evt.preventDefault();
    dispatch(logUserOutAction());
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
                    props.isAuthorized &&
                    <li className="header__nav-item user">
                      <div className="header__nav-profile">
                        <div className="header__avatar-wrapper user__avatar-wrapper" style={avatarCssStyle}></div>
                        <span className="header__user-name user__name">{props.userLogin}</span>
                      </div>
                    </li>
                  }

                  <li className="header__nav-item">
                    <Link className="header__nav-link" to={signInOutLinkHref} onClick={props.isAuthorized ? handleOnClick : undefined}>
                      {
                        props.isAuthorized ?
                          <div className="header__avatar-wrapper user__avatar-wrapper"></div> :
                          null
                      }
                      <span
                        className={cn({
                          'header__signout': props.isAuthorized,
                          'header__login': props.isNotAuthorized,
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

export default Header;
