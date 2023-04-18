import { Route, Routes } from 'react-router-dom';
import { checkIfUserAuthorizedAction } from 'src/store/api-actions';
import { store } from 'src/store';
import Main from 'src/pages/main/main';
import Login from 'src/pages/login/login';
import NotFound from 'src/components/not-found/not-found';
import { AppRoute } from 'src/consts/consts';
import Room from 'src/pages/room/room';

store.dispatch(checkIfUserAuthorizedAction());

function App(): JSX.Element {
  return (
    <Routes>
      <Route path={AppRoute.Root}>
        <Route index element={<Main />}/>
        <Route path={AppRoute.Login} element={<Login />} />
        <Route path={AppRoute.Offer} element={<Room />} />
        <Route path='*' element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
