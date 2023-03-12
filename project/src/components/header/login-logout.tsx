import { UserLogin } from 'src/types/types';

type LoginLogoutProps = {
  userLogin: UserLogin;
}

function LoginLogout({ userLogin }: LoginLogoutProps): JSX.Element {
  let linkText = 'Sign in';
  let isNotLoggedBlock: JSX.Element | null =
    <div className="header__avatar-wrapper user__avatar-wrapper"></div>;

  if (userLogin !== null) {
    linkText = 'Sign out';
    isNotLoggedBlock = null;
  }

  return (
    // TODO: remove eslint rule eventually
    // eslint-disable-next-line jsx-a11y/anchor-is-valid
    <a className="header__nav-link" href="#">
      {isNotLoggedBlock}
      <span className="header__signout">{linkText}</span>
    </a>
  );
}

export default LoginLogout;
