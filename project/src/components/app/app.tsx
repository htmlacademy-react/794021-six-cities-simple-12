import Main from 'src/pages/main/main';
import { Cities, City, Offers, UserLogin } from 'src/types/types';

type AppProps = {
  cities: Cities;
  currentCity: City;
  offers: Offers;
  offersCount: number;
  userLogin: UserLogin;
};

function App(props: AppProps): JSX.Element {
  return (
    <Main
      {...props}
    />
  );
}

export default App;
