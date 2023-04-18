import { Navigate, useParams } from 'react-router-dom';
import { useAppSelector } from 'src/hooks';
import { useNearbyOffers } from 'src/hooks/use-nearby-offers';
import { useOfferReviews } from 'src/hooks/use-offer-reviews';
import { useFoundOffer } from 'src/hooks/use-found-offer';
import { getAuthorizationStatus } from 'src/store/user/user.selectors';
import OfferCards from 'src/components/offer-сards/offer-cards';
import RoomDescription from 'src/components/room-description/room-description';
import RoomGallery from 'src/components/room-gallery/room-gallery';
import RoomHardwareFeatures from 'src/components/room-hardware-features/room-hardware-features';
import RoomHost from 'src/components/room-host/room-host';
import RoomReviews from 'src/components/room-reviews/room-reviews';
import GeoMap from 'src/components/geo-map/geo-map';
import { Spinner } from 'src/components/spinner/spinner';
import { getPercentFromRating, capitalizeFirstLetter } from 'src/utils/utils';
import { AppRoute, NEARBY_OFFERS_LIMIT_COUNT } from 'src/consts/consts';
import { AuthorizationStatus } from 'src/consts/api';

type RoomProps = {
  headerBlock?: JSX.Element;
}

function Room({ headerBlock }: RoomProps): JSX.Element {
  const { id: offerId } = useParams();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const { isNotFound, offer } = useFoundOffer(offerId);
  const nearbyOffers = useNearbyOffers(offer, NEARBY_OFFERS_LIMIT_COUNT);
  const reviews = useOfferReviews(offer);

  if (isNotFound) {
    return <Navigate to={AppRoute.NotFound} />;
  }

  if (!offer) {
    return <Spinner text={'Loading offer ...'} />;
  }
  // eslint-disable-next-line no-console
  console.log(offerId, authorizationStatus, offer, nearbyOffers, reviews);
  return (
    <div className="page">
      {headerBlock}
      <main className="page__main page__main--property">
        <section className="property">
          <RoomGallery images={offer.images} />

          <div className="property__container container">
            <div className="property__wrapper">
              {
                offer.isPremium &&
                <div className="property__mark">
                  <span>Premium</span>
                </div>
              }
              <div className="property__name-wrapper">
                <h1 className="property__name">
                  {offer.title}
                </h1>
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{width: getPercentFromRating(offer.rating)}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">{offer.rating}</span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {capitalizeFirstLetter(offer.type)}
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {offer.bedrooms} Bedrooms
                </li>
                <li className="property__feature property__feature--adults">
                  Max {offer.maxAdults} adults
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">&euro;{offer.price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <RoomHardwareFeatures goods={offer.goods}/>
              {/*  TODO move whole following block to <Host>? */}
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <RoomHost host={offer.host} />
                <RoomDescription description={offer.description} />
              </div>
              <section className="property__reviews reviews">
                <RoomReviews
                  isUserLoggedIn={authorizationStatus === AuthorizationStatus.Authorized}
                  offerId={offer.id}
                  reviews={reviews}
                />
              </section>
            </div>
          </div>
          <GeoMap
            activeOffer={null}
            className='property__map'
            offers={nearbyOffers}
          />
        </section>
        <div className="container">
          <OfferCards
            className="near-places"
            header="Other places in the neighbourhood"
            offers={nearbyOffers}
          />
        </div>
      </main>
    </div>
  );
}

export default Room;
