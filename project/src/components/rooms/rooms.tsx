import { Offer, OfferId, Offers, Reviews, UserLogin } from 'src/types/types';
import { useParams } from 'react-router-dom';
import Room from 'src/pages/room/room';

type RoomsProps = {
  offers: Offers;
  reviews: Reviews;
  userLogin: UserLogin;
}

export default Rooms;

function Rooms(props: RoomsProps): JSX.Element | null {
  // TODO: all nulls must render 'Page not found'

  const { id } = useParams();
  if (id === undefined) {
    return null;
  }

  const idAsInt = parseInt(id, 10);
  if (isNaN(idAsInt)) {
    return null;
  }

  const foundOffer = getOfferById(props.offers, idAsInt);
  if (foundOffer === undefined) {
    return null;
  }

  const offerReviews = props.reviews.filter((review) => review.id === foundOffer.id);
  return (
    <Room
      offer={foundOffer}
      reviews={offerReviews}
      userLogin={props.userLogin}
    />
  );
}

function getOfferById(offers: Offers, id: OfferId): Offer | undefined {
  const foundOffers = offers.filter(
    (offer) => offer.id === id
  );
  const [ foundOffer ] = foundOffers;
  return foundOffer;
}
