import { Navigate, useParams } from 'react-router-dom';
import Room from 'src/pages/room/room';
import { Spinner } from '../spinner/spinner';
import { useFoundOffer } from 'src/hooks/use-found-offer';
import { AppRoute } from 'src/consts/consts';

type RoomWrapperProps = {
  headerBlock?: JSX.Element;
  isUserLoggedIn: boolean;
}

function RoomWrapper(props: RoomWrapperProps): JSX.Element {
  const { id: offerId } = useParams();
  const { isNotFound, offer } = useFoundOffer(offerId ?? '');

  if (isNotFound) {
    return <Navigate to={AppRoute.NotFound} />;
  }

  if (!offer) {
    return <Spinner text={'Loading offers...'} />;
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
