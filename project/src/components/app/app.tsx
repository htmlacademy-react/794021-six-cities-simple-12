import { Route, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { checkIfUserAuthorizedAction } from 'src/store/api-user/api-user.actions';
import { store } from 'src/store';
import Main from 'src/pages/main/main';
import Login from 'src/pages/login/login';
import Room from 'src/pages/room/room';
import NotFound from 'src/components/not-found/not-found';
import { AppRoute } from 'src/consts/consts';

store.dispatch(checkIfUserAuthorizedAction());

function App(): JSX.Element {
  return (
    <HelmetProvider>
      <Routes>
        <Route path={AppRoute.Root}>
          <Route index element={<Main />}/>
          <Route path={AppRoute.Login} element={<Login />} />
          <Route path={AppRoute.Offer} element={<Room />} />
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </HelmetProvider>
  );
}

export default App;
