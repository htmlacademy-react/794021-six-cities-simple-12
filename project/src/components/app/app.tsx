import Main from 'src/pages/main/main';
import { Offers} from 'src/types/types';

type AppProps = {
  cityName: string;
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
