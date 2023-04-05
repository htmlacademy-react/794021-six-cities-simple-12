import { MouseEvent } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAppDispatch } from 'src/hooks';
import { isCurrentPage } from 'src/utils/utils';
import { AppRoute } from 'src/consts/consts';
import { logUserOut } from 'src/store/api-actions';

type HeaderProps = {
  isAuthorized: boolean;
  isNotAuthorized: boolean;
  userLogin: string;
}

function Header(props: HeaderProps): JSX.Element {
  const dispatch = useAppDispatch();
  const { pathname: locationPathname } = useLocation();

  let href = '';
  let signInOutClassName = '';
  let linkText = '';

  if (props.isAuthorized) {
    signInOutClassName = 'header__signout';
    linkText = 'Sign out';
    href = '';
  } else if (props.isNotAuthorized) {
    signInOutClassName = 'header__login';
    linkText = 'Sign in';
    href = AppRoute.Login;
  }

  const linkClassName = isCurrentPage(locationPathname, AppRoute.Root) ?
    'header__logo-link header__logo-link--active' :
    'header__logo-link';

  const handleOnClick = (evt: MouseEvent) => {
    if (!props.isAuthorized) {
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
            isCurrentPage(locationPathname, AppRoute.Login) ?
              null :
              <nav className="header__nav">
                <ul className="header__nav-list">
                  {
                    props.isAuthorized &&
                    <li className="header__nav-item user">
                      <div className="header__nav-profile">
                        <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                        <span className="header__user-name user__name">{props.userLogin}</span>
                      </div>
                    </li>
                  }

                  <li className="header__nav-item">
                    <Link className="header__nav-link" to={href} onClick={props.isAuthorized ? handleOnClick : undefined}>
                      {
                        !props.isAuthorized ?
                          null :
                          <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                      }
                      <span
                        className={signInOutClassName}
                      >
                        {linkText}
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
