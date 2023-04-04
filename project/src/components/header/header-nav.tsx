import { MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from 'src/consts/consts';
import { UserLogin } from 'src/types/types';

type HeaderNavProps = {
  onClick: (evt: MouseEvent) => void;
  userLogin: UserLogin;
}

function HeaderNav({ onClick, userLogin }: HeaderNavProps): JSX.Element {
  const linkText = userLogin ? 'Sign out' : 'Sign in';
  const href = userLogin ? '' : AppRoute.Login;
  const signClassName = userLogin ? 'header__signout' : 'header__login';

  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        {
          userLogin &&
          <li className="header__nav-item user">
            <div className="header__nav-profile">
              <div className="header__avatar-wrapper user__avatar-wrapper"></div>
              <span className="header__user-name user__name">{userLogin}</span>
            </div>
          </li>
        }

        <li className="header__nav-item">
          <Link className="header__nav-link" to={href} onClick={onClick}>
            {
              userLogin ?
                null :
                <div className="header__avatar-wrapper user__avatar-wrapper"></div>
            }
            <span
              className={signClassName}
            >
              {linkText}
            </span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default HeaderNav;
