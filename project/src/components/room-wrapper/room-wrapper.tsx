import {
  GetNearbyOffers, Offer, OfferId, Offers, Reviews,
} from 'src/types/types';
import { Navigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Room from 'src/pages/room/room';
import { parseInteger } from 'src/utils/utils';
import { AppRoute } from 'src/consts/consts';

type RoomsProps = {
  getNearbyOffers: GetNearbyOffers;
  headerBlock?: JSX.Element;
  offers: Offers;
  reviews: Reviews;
  isUserLoggedIn: boolean;
}

function Rooms(props: RoomsProps): JSX.Element | null {
  const { id: offerId } = useParams();
  const offerIdAsInt = parseInteger(offerId);
  const foundOffer = getOfferById(props.offers, offerIdAsInt);

  if (foundOffer === undefined) {
    return <Navigate to={AppRoute.NotFound} />;
  }

  const offerReviews = getReviewsById(props.reviews, foundOffer.id);
  const nearbyOffers = props.getNearbyOffers(foundOffer.id);

  return (
    <Room
      headerBlock={props.headerBlock}
      nearbyOffers={nearbyOffers}
      offer={foundOffer}
      reviews={offerReviews}
      isUserLoggedIn={props.isUserLoggedIn}
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

export default Rooms;
