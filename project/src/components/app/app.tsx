import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { fetchOffers } from 'src/store/api-actions';
import { useAppDispatch } from 'src/hooks';
import Main from 'src/pages/main/main';
import Login from 'src/pages/login/login';
import Header from 'src/components/header/header';
import RoomWrapper from 'src/components/room-wrapper/room-wrapper';
import NotFound from 'src/components/not-found/not-found';
import PathnameChangeEffectExecutor from
  'src/components/pathname-change-effect-executor/pathname-change-effect-executor';
import { scrollToTop } from 'src/utils/utils';
import { CityNames, Reviews, UserLogin } from 'src/types/types';
import { AppRoute } from 'src/consts/consts';

type AppProps = {
  cityNames: CityNames;
  reviews: Reviews;
  userLogin: UserLogin;
};

function App(props: AppProps): JSX.Element {
  const headerBlock = <Header userLogin={props.userLogin} />;

  const dispatch = useAppDispatch();
  dispatch(fetchOffers());

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
                isUserLoggedIn={props.userLogin !== undefined}
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
