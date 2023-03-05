import { Offer } from 'src/types/types';
import { getPercentFromRating, capitalizeFirstLetter } from 'src/utils/utils';

type PlaceCardProps = {
  offer: Offer;
};

export default PlaceCard;

function PlaceCard({ offer }: PlaceCardProps): JSX.Element {
  return (
    <article className="cities__card place-card">
      {
        offer.isPremium &&
          <div className="place-card__mark">
            <span>Premium</span>
          </div>
      }

      <div className="cities__image-wrapper place-card__image-wrapper">
        <a href="#">
          <img className="place-card__image"
            src={offer.images[0] /* TODO */}
            width="260" height="200" alt="The place"
          />
        </a>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>

        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: getPercentFromRating(offer.rating)}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <a href="#">{offer.title}</a>
        </h2>
        <p className="place-card__type">{capitalizeFirstLetter(offer.type)}</p>
      </div>
    </article>
  );
}
