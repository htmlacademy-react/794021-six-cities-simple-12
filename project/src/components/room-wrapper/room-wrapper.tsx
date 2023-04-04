import { useParams } from 'react-router-dom';
import Room from 'src/pages/room/room';
import { parseInteger } from 'src/utils/utils';

type RoomWrapperProps = {
  headerBlock?: JSX.Element;
  isUserLoggedIn: boolean;
}

function RoomWrapper(props: RoomWrapperProps): JSX.Element | null {
  const { id: offerId } = useParams();
  const offerIdAsInt = parseInteger(offerId);

  return (
    <Room
      offerId={offerIdAsInt}
      headerBlock={props.headerBlock}
      isUserLoggedIn={props.isUserLoggedIn}
    />
  );
}

export default RoomWrapper;
