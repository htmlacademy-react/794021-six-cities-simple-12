import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { checkIfUserAuthorized, fetchOffers } from 'src/store/api-actions';
import { useAppDispatch, useAppSelector } from 'src/hooks';
import Main from 'src/pages/main/main';
import Login from 'src/pages/login/login';
import Header from 'src/components/header/header';
import RoomWrapper from 'src/components/room-wrapper/room-wrapper';
import NotFound from 'src/components/not-found/not-found';
import PathnameChangeEffectExecutor from
  'src/components/pathname-change-effect-executor/pathname-change-effect-executor';
import { scrollToTop } from 'src/utils/utils';
import { CityNames } from 'src/types/types';
import { AppRoute } from 'src/consts/consts';
import { AuthorizationStatus } from 'src/consts/api';
import { useEffect } from 'react';

type AppProps = {
  cityNames: CityNames;
};

function App(props: AppProps): JSX.Element {
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const isFetchedOffers = useAppSelector((state) => state.isFetchedOffers);
  const userLogin = useAppSelector((state) => state.userLogin);
  const dispatch = useAppDispatch();

  const headerBlock = (
    <Header
      isAuthorized={authorizationStatus === AuthorizationStatus.Authorized}
      isNotAuthorized={authorizationStatus === AuthorizationStatus.NotAuthorized}
      userLogin={userLogin}
    />
  );

  useEffect(() => {
    authorizationStatus === AuthorizationStatus.Unknown && dispatch(checkIfUserAuthorized());
    !isFetchedOffers && dispatch(fetchOffers());
  }, [authorizationStatus, dispatch, isFetchedOffers]);

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
