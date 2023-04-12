import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { store } from 'src/store';
import { getCityName } from 'src/store/data/data.selectors';
import { logUserInAction } from 'src/store/api-actions';
import { useAppDispatch, useAppSelector } from 'src/hooks';
import { useRedirectingIfAuthorized } from 'src/hooks/use-redirecting-if-authorized';
import { AppRoute } from 'src/consts/consts';
import { DomainNamespace } from 'src/consts/domain';
import { UserLogin } from 'src/types/types';
import { UserAuthorizationData } from 'src/types/api';

type LoginProps = {
  headerBlock?: JSX.Element;
}
// TODO add '-screen' to filename?
function Login({ headerBlock }: LoginProps): JSX.Element {
  const { login: storeUserLogin } = store.getState()[DomainNamespace.User];
  const [ userLogin, setUserLogin ] = useState<UserLogin>(storeUserLogin);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useAppDispatch();
  const currentCity = useAppSelector(getCityName);
  useRedirectingIfAuthorized(AppRoute.Root);

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (!userLogin || !passwordRef.current) {
      return;
    }
    const authData: UserAuthorizationData = {
      email: userLogin,
      password: passwordRef.current.value,
    };

    dispatch(logUserInAction(authData));
  };

  const handleInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { value } = evt.target;
    setUserLogin(value);
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
                  onChange={handleInputChange}
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
