import { UserLogin } from 'src/types/types';
import LoginLogout from './login-logout';

type HeaderNavProps = {
  userLogin: UserLogin;
}

export default HeaderNav;

function HeaderNav({ userLogin }: HeaderNavProps): JSX.Element {
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
          <LoginLogout userLogin={userLogin} />
        </li>
      </ul>
    </nav>
  );
}
