import Main from 'src/pages/main/main';
import { City, Offers} from 'src/types/types';

type AppProps = {
  city: City;
  offers: Offers;
  offersCount: number;
};

function App(props: AppProps): JSX.Element {
  return (
    <Main
      {...props}
    />
  );
}

export default App;
