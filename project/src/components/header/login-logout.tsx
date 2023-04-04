import { Link } from 'react-router-dom';
import { AppRoute } from 'src/consts/consts';
import { UserLogin } from 'src/types/types';

type LoginLogoutProps = {
  userLogin: UserLogin;
}

function LoginLogout({ userLogin }: LoginLogoutProps): JSX.Element {
  const linkText = userLogin ? 'Sign out' : 'Sign in';
  const href = userLogin ? '' : AppRoute.Login;

  return (
    <Link className="header__nav-link" to={href}>
      {
        userLogin ?
          <div className="header__avatar-wrapper user__avatar-wrapper"></div> :
          null
      }
      <span className="header__signout">{linkText}</span>
    </Link>
  );
}

export default LoginLogout;
