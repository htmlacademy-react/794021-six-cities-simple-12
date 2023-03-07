import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from 'src/pages/main/main';
import Login from 'src/pages/login/login';
import Rooms from 'src/components/rooms/rooms';
import NotFound from 'src/components/not-found/not-found';
import { Cities, City, Offers, Reviews, UserLogin } from 'src/types/types';

type AppProps = {
  cities: Cities;
  currentCity: City;
  offers: Offers;
  offersCount: number;
  reviews: Reviews;
  userLogin: UserLogin;
};

function App(props: AppProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/'>
          <Route index element={<Main {...props} />}/>
          <Route path='login' element={<Login />} />
          <Route
            path='offer/:id'
            element={
              <Rooms offers={props.offers} reviews={props.reviews} userLogin={props.userLogin} />
            }
          />
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
