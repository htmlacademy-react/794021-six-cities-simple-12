import HeaderRoom from 'src/components/header-room/header-room';
import NearPlacesCards from 'src/components/near-places-cards/near-places-cards';
import RoomGallery from 'src/components/room-gallery/room-gallery';
import RoomHardwareFeatures from 'src/components/room-hardware-features/room-hardware-features';
import RoomHost from 'src/components/room-host/room-host';
import RoomReviews from 'src/components/room-reviews/room-reviews';
import { Offer, Reviews, UserLogin } from 'src/types/types';
import { getPercentFromRating, capitalizeFirstLetter } from 'src/utils/utils';

export default Room;

type RoomProps = {
  offer: Offer;
  reviews: Reviews;
  userLogin: UserLogin;
}

function Room({ offer, reviews, userLogin }: RoomProps): JSX.Element {
  return (
    <>
      <HeaderRoom userLogin={userLogin} />
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
              <RoomHost host={offer.host} />
              <section className="property__reviews reviews">
                <RoomReviews reviews={reviews} />
              </section>
            </div>
          </div>
          <section className="property__map map"></section>
        </section>
        <div className="container">
          <section className="near-places places">
            <NearPlacesCards />
          </section>
        </div>
      </main>
    </>
  );
}
