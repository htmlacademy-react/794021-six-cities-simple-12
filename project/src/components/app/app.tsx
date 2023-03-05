import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from 'src/pages/main/main';
import Login from 'src/pages/login/login';
import Room from 'src/pages/room/room';
import NotFound from 'src/components/not-found/not-found';
import { Cities, City, Offers, UserLogin } from 'src/types/types';

type AppProps = {
  cities: Cities;
  currentCity: City;
  offers: Offers;
  offersCount: number;
  userLogin: UserLogin;
};

function App(props: AppProps): JSX.Element {
  const [ firstOffer ] = props.offers;
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/'>
          <Route index element={<Main {...props} />}/>
          <Route path='login' element={<Login />} />
          <Route
            path='offer/:id'
            element={
              <Room offer={firstOffer} userLogin={props.userLogin} />
            }
          />
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
