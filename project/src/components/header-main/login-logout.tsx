import { UserLogin } from 'src/types/types';

type LoginLogoutProps = {
  userLogin: UserLogin;
}

export default LoginLogout;

function LoginLogout({ userLogin }: LoginLogoutProps): JSX.Element {
  const text = userLogin === null ?
    'Sign in' :
    'Sign out';

  return (
    <a className="header__nav-link" href="#">
      <span className="header__signout">{text}</span>
    </a>
  );
}
