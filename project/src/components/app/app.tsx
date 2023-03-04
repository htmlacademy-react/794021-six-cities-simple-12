import Main from 'src/pages/main/main';
import Room from 'src/pages/room/room';
import { City, Offers } from 'src/types/types';

type AppProps = {
  city: City;
  offers: Offers;
  offersCount: number;
};

function App(props: AppProps): JSX.Element {
  const { offers: [ offer ] } = props;

  // FIXME: display all components at once as a proof-of-concept
  return (
    <>
      <Room offer={offer} />
      <Main
        {...props}
      />
    </>
  );
}

export default App;
