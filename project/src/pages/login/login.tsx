import { FormEvent, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'src/hooks';
import { useRedirectingIfAuthorized } from 'src/hooks/use-redirecting-if-authorized';
import { AppRoute } from 'src/consts/consts';
import { UserAuthorizationData } from 'src/types/api';
import { logUserIn } from 'src/store/api-actions';

type LoginProps = {
  headerBlock?: JSX.Element;
}
// TODO add '-screen' to filename?
function Login({ headerBlock }: LoginProps): JSX.Element {
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useAppDispatch();
  const currentCity = useAppSelector((state) => state.cityName);
  useRedirectingIfAuthorized(AppRoute.Root);

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (!loginRef.current || !passwordRef.current) {
      return;
    }
    const authData: UserAuthorizationData = {
      email: loginRef.current.value,
      password: passwordRef.current.value,
    };

    dispatch(logUserIn(authData));
  };

  return (
    <div className="page page--gray page--login">
      {headerBlock}
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form" action="#" method="post"
              onSubmit={handleSubmit}
            >
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input className="login__input form__input" type="email" name="email" placeholder="Email" required
                  ref={loginRef}
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input className="login__input form__input" type="password" name="password" placeholder="Password" required
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

export default Login;
