import {
  GetNearbyOffers, Offer, OfferId, Offers, Reviews, UserLogin
} from 'src/types/types';
import { useParams } from 'react-router-dom';
import Room from 'src/pages/room/room';
import { parseInteger } from 'src/utils/utils';

type RoomsProps = {
  getNearbyOffers: GetNearbyOffers;
  headerBlock?: JSX.Element;
  offers: Offers;
  reviews: Reviews;
  userLogin: UserLogin;
}

export default Rooms;

function Rooms(props: RoomsProps): JSX.Element | null {
  const { id: offerId } = useParams();
  const offerIdAsInt = parseInteger(offerId);
  const foundOffer = getOfferById(props.offers, offerIdAsInt);

  if (foundOffer === undefined) {
    return null; // TODO: instead of null, 'Page not found' must be rendered
  }

  const offerReviews = getReviewsById(props.reviews, foundOffer.id);
  const nearbyOffers = props.getNearbyOffers(foundOffer.id);

  return (
    <Room
      headerBlock={props.headerBlock}
      nearbyOffers={nearbyOffers}
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

function getReviewsById(reviews: Reviews, id: OfferId): Reviews {
  return reviews.filter((review) => review.id === id);
}
