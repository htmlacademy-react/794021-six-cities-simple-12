import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from 'src/pages/main/main';
import Login from 'src/pages/login/login';
import Header from 'src/components/header/header';
import Rooms from 'src/components/rooms/rooms';
import NotFound from 'src/components/not-found/not-found';
import PathnameChangeEffectExecutor from
  'src/components/pathname-change-effect-executor/pathname-change-effect-executor';
import { scrollToTop } from 'src/utils/utils';
import { CityNames, CityName, GetNearbyOffers, Offers, Reviews, UserLogin } from 'src/types/types';
import { AppRoute } from 'src/utils/consts';

type AppProps = {
  cityNames: CityNames;
  currentCityName: CityName;
  getNearbyOffers: GetNearbyOffers;
  offers: Offers;
  offersCount: number;
  reviews: Reviews;
  userLogin: UserLogin;
};

function App(props: AppProps): JSX.Element {
  const headerBlock = <Header userLogin={props.userLogin} />;

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
              <Rooms
                getNearbyOffers={props.getNearbyOffers}
                headerBlock={headerBlock}
                offers={props.offers}
                reviews={props.reviews}
                userLogin={props.userLogin}
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
