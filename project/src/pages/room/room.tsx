import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useAppDispatch, useAppSelector } from 'src/hooks';
import { useNearbyOffers } from 'src/hooks/use-nearby-offers';
import { useOfferReviews } from 'src/hooks/use-offer-reviews';
import { useFoundOffer } from 'src/hooks/use-found-offer';
import { getAuthorizationStatus } from 'src/store/user/user.selectors';
import { resetUserReviewAction } from 'src/store/reviews/reviews.slice';
import OfferCards from 'src/components/offer-сards/offer-cards';
import RoomGallery from 'src/components/room-gallery/room-gallery';
import RoomHardwareFeatures from 'src/components/room-hardware-features/room-hardware-features';
import RoomReviews from 'src/components/room-reviews/room-reviews';
import GeoMap from 'src/components/geo-map/geo-map';
import { Spinner } from 'src/components/spinner/spinner';
import RoomHostDescription from 'src/components/room-host-description/room-host-description';
import RoomFeatures from 'src/components/room-features/room-features';
import RoomReviewForm from 'src/components/room-review-form/room-review-form';
import NotFound from 'src/components/not-found/not-found';
import { getPercentFromRating } from 'src/utils/utils';
import { NEARBY_OFFERS_LIMIT_COUNT } from 'src/consts/consts';
import { AuthorizationStatus } from 'src/consts/api';

function Room(): JSX.Element {
  const { id: offerId } = useParams();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const { isNotFound, offer } = useFoundOffer(offerId);
  const dispatch = useAppDispatch();
  const nearbyOffers = useNearbyOffers(offer, NEARBY_OFFERS_LIMIT_COUNT);
  const reviews = useOfferReviews(offer);

  useEffect(() => {
    dispatch(resetUserReviewAction());
  }, [ dispatch, offerId ]);

  if (isNotFound) {
    return <NotFound />;
  }

  if (!offer) {
    return <Spinner text={'Loading offer ...'} />;
  }

  return (
    <>
      <Helmet>
        <title>Six cities: {offer.title}</title>
      </Helmet>
      <div className="page">
        <main className="page__main page__main--property">
          <section className="property">
            <RoomGallery images={offer.images} dataTestId="room-gallery" />

            <div className="property__container container">
              <div className="property__wrapper">
                {
                  offer.isPremium &&
                    <div className="property__mark"><span>Premium</span></div>
                }
                <div className="property__name-wrapper" data-testid="room-title">
                  <h1 className="property__name">
                    {offer.title}
                  </h1>
                </div>
                <div className="property__rating rating" data-testid="room-rating">
                  <div className="property__stars rating__stars">
                    <span style={{width: getPercentFromRating(offer.rating)}}></span>
                    <span className="visually-hidden">Rating</span>
                  </div>
                  <span className="property__rating-value rating__value">{offer.rating}</span>
                </div>
                <RoomFeatures
                  bedrooms={offer.bedrooms}
                  dataTestId="room-type room-bedroom-count room-max-adult-count"
                  maxAdults={offer.maxAdults}
                  type={offer.type}
                />
                <div className="property__price" data-testid="room-price-per-night">
                  <b className="property__price-value">&euro;{offer.price}</b>
                  <span className="property__price-text">&nbsp;night</span>
                </div>
                <RoomHardwareFeatures goods={offer.goods} dataTestId="room-hardware-features" />
                <RoomHostDescription
                  dataTestId={'room-detailed-description room-host-description'}
                  description={offer.description}
                  host={offer.host}
                />
                <section className="property__reviews reviews">
                  <h2 className="reviews__title">
                    Reviews &middot; <span className="reviews__amount">{reviews.length}</span>
                  </h2>
                  <RoomReviews reviews={reviews} dataTestId="room__reviews-list" />
                  {
                    authorizationStatus === AuthorizationStatus.Authorized &&
                    <RoomReviewForm key={offer.id} dataTestId="room-review-post-form" offerId={offer.id} />
                  }
                </section>

              </div>
            </div>
            <GeoMap
              activeOffer={offer}
              dataTestId="room-geo-map"
              className='property__map'
              offers={[offer, ...nearbyOffers]}
            />
          </section>
          <div className="container" data-testid="room-nearby-offers">
            <OfferCards
              className="near-places"
              header="Other places in the neighbourhood"
              offers={nearbyOffers}
            />
          </div>
        </main>
      </div>
    </>
  );
}

export default Room;
