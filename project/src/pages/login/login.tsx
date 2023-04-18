import { ChangeEvent, FormEvent, useRef } from 'react';
import { Link } from 'react-router-dom';
import { getCityName } from 'src/store/data/data.selectors';
import { logUserInAction } from 'src/store/api-actions';
import { getUserLogin } from 'src/store/user/user.selectors';
import { setUserLoginAction } from 'src/store/user/user.slice';
import { useAppDispatch, useAppSelector } from 'src/hooks';
import { useRedirectingIfAuthorized } from 'src/hooks/use-redirecting-if-authorized';
import { AppRoute } from 'src/consts/consts';

type LoginProps = {
  headerBlock?: JSX.Element;
}

function Login({ headerBlock }: LoginProps): JSX.Element {
  useRedirectingIfAuthorized(AppRoute.Root);
  const userLogin = useAppSelector(getUserLogin);
  const currentCity = useAppSelector(getCityName);
  const dispatch = useAppDispatch();
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleCredentialsSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (!areCredentialsValid(userLogin, passwordRef.current?.value)) {
      return;
    }

    dispatch(logUserInAction({
      email: userLogin,
      password: passwordRef.current?.value ?? '',
    }));
  };

  const handleLoginChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    dispatch(setUserLoginAction(target.value ?? ''));
  };

  return (
    <div className="page page--gray page--login">
      {headerBlock}
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form" action="#" method="post"
              onSubmit={handleCredentialsSubmit}
            >
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden" htmlFor="login">E-mail</label>
                <input className="login__input form__input" id="login"
                  type="email" name="email" placeholder="Email" required
                  onChange={handleLoginChange}
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden" htmlFor="password">Password</label>
                <input className="login__input form__input" id="password"
                  type="password" name="password" placeholder="Password" required
                  ref={passwordRef}
                />
              </div>
              <button className="login__submit form__submit button" type="submit">Sign in</button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link className="locations__item-link" to={AppRoute.Root}>
                <span>{currentCity}</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

function areCredentialsValid(email: string, password: string | undefined) {
  if (
    !password ||
    email.length <= 4 ||
    password.length < 2 ||
    !/\d/.test(password) ||
    !/\D/i.test(password) ||
    false
  ) {
    return false;
  }

  return true;
}

export default Login;
