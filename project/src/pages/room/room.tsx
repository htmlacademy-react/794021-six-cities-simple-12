import { useEffect, useState } from 'react';
import OfferCards from 'src/components/offer-сards/offer-cards';
import RoomDescription from 'src/components/room-description/room-description';
import RoomGallery from 'src/components/room-gallery/room-gallery';
import RoomHardwareFeatures from 'src/components/room-hardware-features/room-hardware-features';
import RoomHost from 'src/components/room-host/room-host';
import RoomReviews from 'src/components/room-reviews/room-reviews';
import GeoMap from 'src/components/geo-map/geo-map';
import { Offer, OfferId } from 'src/types/types';
import { getPercentFromRating, capitalizeFirstLetter } from 'src/utils/utils';
import { AppRoute, NEARBY_OFFERS_LIMIT_COUNT } from 'src/consts/consts';
import { useNearbyOffers } from 'src/hooks/use-nearby-offers';
import { useAppSelector } from 'src/hooks';
import { Navigate } from 'react-router-dom';
import { useOffer } from 'src/hooks/use-offer';
import { useOfferReviews } from 'src/hooks/use-offer-reviews';

type ActiveOffer = Offer | null;

type RoomProps = {
  headerBlock?: JSX.Element;
  offerId: OfferId | null;
  isUserLoggedIn: boolean;
}

function Room({ headerBlock, offerId, isUserLoggedIn }: RoomProps): JSX.Element {
  const [ hoveredOffer, setHoveredOffer ] = useState<ActiveOffer>(null);
  const offer = useOffer(offerId);
  const nearbyOffers = useNearbyOffers(offer, NEARBY_OFFERS_LIMIT_COUNT);
  const reviews = useOfferReviews(offer);
  const isFetchingOffersFinished = useAppSelector((state) => state.isFinishedOffersFetching);

  useEffect(() => {
    if (!isFetchingOffersFinished) {
      return;
    }
    if (!offer) {
      <Navigate to={AppRoute.NotFound} />;
    }

  }, [isFetchingOffersFinished, offer]);

  if (!offer) {
    return (
      <h1>Loading...</h1>
    );
  }

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

              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <RoomHost host={offer.host} />
                <RoomDescription description={offer.description} />
              </div>
              <section className="property__reviews reviews">
                <RoomReviews isUserLoggedIn={isUserLoggedIn} offerId={offer.id} reviews={reviews} />
              </section>
            </div>
          </div>
          <GeoMap
            activeOffer={hoveredOffer}
            className='property__map'
            offers={nearbyOffers}
          />
        </section>
        <div className="container">
          <OfferCards
            className="near-places"
            header="Other places in the neighbourhood"
            offers={nearbyOffers}
            onActive={(item) => setHoveredOffer(item)}
            onBlur={() => setHoveredOffer(null)}
          />
        </div>
      </main>
    </div>
  );
}

export default Room;
