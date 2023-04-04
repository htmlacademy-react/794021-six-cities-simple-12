import { Navigate, useParams } from 'react-router-dom';
import Room from 'src/pages/room/room';
import { parseInteger } from 'src/utils/utils';
import { AppRoute } from 'src/consts/consts';
import { store } from 'src/store';


type RoomWrapperProps = {
  headerBlock?: JSX.Element;
  isUserLoggedIn: boolean;
}

function RoomWrapper(props: RoomWrapperProps): JSX.Element | null {
  const { id: offerId } = useParams();
  const offerIdAsInt = parseInteger(offerId);

  const { offers: allOffers } = store.getState();
  const offer = allOffers.find(({ id }) => id === offerIdAsInt) ?? null;

  if (offerIdAsInt === undefined || offerIdAsInt === null || !offer) {
    return <Navigate to={AppRoute.NotFound} />;
  }

  return (
    <Room
      offer={offer}
      headerBlock={props.headerBlock}
      isUserLoggedIn={props.isUserLoggedIn}
    />
  );
}

export default RoomWrapper;
