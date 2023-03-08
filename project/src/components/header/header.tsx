import { Link } from 'react-router-dom';
import { UserLogin } from 'src/types/types';
import HeaderNav from './header-nav';
import { useLocation } from 'react-router-dom';
import { AppRoute } from 'src/utils/consts';
import { isCurrentPage } from 'src/utils/utils';

type HeaderMainProps = {
  userLogin: UserLogin;
}

export default HeaderMain;

function HeaderMain({ userLogin }: HeaderMainProps): JSX.Element {
  const { pathname: currentPath } = useLocation();
  const linkClassName = isCurrentPage(currentPath, AppRoute.Root) ?
    'header__logo-link header__logo-link--active' :
    'header__logo-link';

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link className={linkClassName} to="/">
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
            </Link>
          </div>

          {isCurrentPage(currentPath, AppRoute.Login) ? null : <HeaderNav userLogin={userLogin} />}
        </div>
      </div>
    </header>
  );
}
