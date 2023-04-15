import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { checkIfUserAuthorizedAction } from 'src/store/api-actions';
import { store } from 'src/store';
import { getAuthorizationStatus, getUserAvatarUrl, getUserLogin } from 'src/store/user/user.selectors';
import { useAppSelector } from 'src/hooks';
import PathnameChangeEffectExecutor from
  'src/components/pathname-change-effect-executor/pathname-change-effect-executor';
import Main from 'src/pages/main/main';
import Login from 'src/pages/login/login';
import Header from 'src/components/header/header';
import NotFound from 'src/components/not-found/not-found';
import { scrollToTop } from 'src/utils/utils';
import { AppRoute } from 'src/consts/consts';
import { AuthorizationStatus } from 'src/consts/api';
import { CityNames } from 'src/types/types';
import Room from 'src/pages/room/room';

type AppProps = {
  cityNames: CityNames;
};

store.dispatch(checkIfUserAuthorizedAction());

function App(props: AppProps): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const userLogin = useAppSelector(getUserLogin);
  const userAvatarUrl = useAppSelector(getUserAvatarUrl);

  const headerBlock = (
    <Header
      isAuthorized={authorizationStatus === AuthorizationStatus.Authorized}
      isNotAuthorized={authorizationStatus === AuthorizationStatus.NotAuthorized}
      userLogin={userLogin}
      userAvatarUrl={userAvatarUrl}
    />
  );

  return (
    <BrowserRouter>
      <PathnameChangeEffectExecutor onPathnameChange={scrollToTop} />
      <Routes>
        <Route path={AppRoute.Root}>
          <Route index element={<Main {...props} headerBlock={headerBlock} />}/>
          <Route path={AppRoute.Login} element={<Login headerBlock={headerBlock} />} />
          <Route path={AppRoute.Offer} element={
            <Room
              headerBlock={headerBlock}
              isUserLoggedIn={authorizationStatus === AuthorizationStatus.Authorized}
            />
          }
          />
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
