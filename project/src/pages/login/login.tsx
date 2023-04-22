import { ChangeEvent, FormEvent, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';
import { logUserInAction } from 'src/store/api-user/api-user.actions';
import { getUserLogin } from 'src/store/user/user.selectors';
import { setUserLoginAction } from 'src/store/user/user.slice';
import { setCityNameAction } from 'src/store/data/data.slice';
import { useAppDispatch, useAppSelector } from 'src/hooks';
import { useRedirectingIfAuthorized } from 'src/hooks/use-redirecting-if-authorized';
import { getRandomIntegerFromZeroExclusive } from 'src/utils/utils';
import { AppRoute, CityNames } from 'src/consts/consts';

function Login(): JSX.Element {
  useRedirectingIfAuthorized(AppRoute.Root);
  const userLogin = useAppSelector(getUserLogin);
  const dispatch = useAppDispatch();
  const passwordRef = useRef<HTMLInputElement>(null);
  const randomCityName = useMemo(() => CityNames[getRandomIntegerFromZeroExclusive(CityNames.length)], []);

  const handleCredentialsSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (!isPasswordValid(passwordRef.current?.value)) {
      toast.error('Password must contain at least one character and at least one number');
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
    <>
      <Helmet>
        <title>Six cities: Login page</title>
      </Helmet>
      <div className="page page--gray page--login">
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
                    defaultValue={userLogin}
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
                <button className="login__submit form__submit button" type="submit">
                  Sign in
                </button>
              </form>
            </section>
            <section className="locations locations--login locations--current">
              <div className="locations__item">
                <Link
                  className="locations__item-link"
                  onClick={() => dispatch(setCityNameAction(randomCityName))}
                  to={AppRoute.Root}
                >
                  <span>{randomCityName}</span>
                </Link>
              </div>
            </section>
          </div>
        </main>
      </div>
    </>
  );
}

function isPasswordValid(password: string | undefined) {
  if (
    !password ||
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
