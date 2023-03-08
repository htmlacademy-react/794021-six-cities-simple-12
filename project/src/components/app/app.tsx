import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from 'src/pages/main/main';
import Login from 'src/pages/login/login';
import Header from 'src/components/header/header';
import Rooms from 'src/components/rooms/rooms';
import NotFound from 'src/components/not-found/not-found';
import { Cities, City, GetNearbyOffers, Offers, Reviews, UserLogin } from 'src/types/types';
import { AppRoute } from 'src/utils/consts';

type AppProps = {
  cities: Cities;
  currentCity: City;
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
      <Routes>
        <Route path={AppRoute.Root}>
          <Route index element={<Main {...props} headerBlock={headerBlock} />}/>
          <Route path={AppRoute.Login} element={<Login userLogin={props.userLogin} />} />
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
