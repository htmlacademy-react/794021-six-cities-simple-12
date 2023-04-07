import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { checkIfUserAuthorized } from 'src/store/api-actions';
import { getAuthorizationStatus, getUserAvatarUrl, getUserLogin } from 'src/store/user/user.selectors';
import { useAppDispatch, useAppSelector } from 'src/hooks';
import PathnameChangeEffectExecutor from
  'src/components/pathname-change-effect-executor/pathname-change-effect-executor';
import Main from 'src/pages/main/main';
import Login from 'src/pages/login/login';
import Header from 'src/components/header/header';
import RoomWrapper from 'src/components/room-wrapper/room-wrapper';
import NotFound from 'src/components/not-found/not-found';
import { scrollToTop } from 'src/utils/utils';
import { AppRoute } from 'src/consts/consts';
import { AuthorizationStatus } from 'src/consts/api';
import { CityNames } from 'src/types/types';

type AppProps = {
  cityNames: CityNames;
};

function App(props: AppProps): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const userLogin = useAppSelector(getUserLogin);
  const userAvatarUrl = useAppSelector(getUserAvatarUrl);
  const dispatch = useAppDispatch();

  const headerBlock = (
    <Header
      isAuthorized={authorizationStatus === AuthorizationStatus.Authorized}
      isNotAuthorized={authorizationStatus === AuthorizationStatus.NotAuthorized}
      userLogin={userLogin}
      userAvatarUrl={userAvatarUrl}
    />
  );

  useEffect(() => {
    authorizationStatus === AuthorizationStatus.Unknown && dispatch(checkIfUserAuthorized());
  }, [authorizationStatus, dispatch]);

  return (
    <BrowserRouter>
      <PathnameChangeEffectExecutor onPathnameChange={scrollToTop} />
      <Routes>
        <Route path={AppRoute.Root}>
          <Route index element={<Main {...props} headerBlock={headerBlock} />}/>
          <Route path={AppRoute.Login} element={<Login headerBlock={headerBlock} />} />
          <Route
            path={AppRoute.Offer}
            element={
              <RoomWrapper
                headerBlock={headerBlock}
                isUserLoggedIn={authorizationStatus !== AuthorizationStatus.NotAuthorized}
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
