import Login from 'src/pages/login/login';
import Main from 'src/pages/main/main';
import Room from 'src/pages/room/room';
import { City, Offers, UserLogin } from 'src/types/types';

type AppProps = {
  city: City;
  offers: Offers;
  offersCount: number;
  userLogin: UserLogin;
};

function App(props: AppProps): JSX.Element {
  const { offers: [ offer ] } = props;
  const { userLogin } = props;

  // FIXME: display all components at once as a proof-of-concept
  return (
    <>
      <Login />
      <Room offer={offer} userLogin={userLogin} />
      <Main
        {...props}
      />
    </>
  );
}

export default App;
