import { Link } from 'react-router-dom';
import { Offer } from 'src/types/types';
import { capitalizeFirstLetter, getPercentFromRating } from 'src/utils/utils';

type OfferCardProps = {
  className?: string;
  offer: Offer;
  onActive: () => void;
  onBlur: () => void;
};

function OfferCard(props: OfferCardProps): JSX.Element {
  return (
    <article className={`${props.className ?? ''} place-card`}
      onBlur={props.onBlur}
      onFocus={props.onActive}
      onMouseEnter={props.onActive}
      onMouseLeave={props.onBlur}
    >
      {
        props.offer.isPremium &&
          <div className="place-card__mark">
            <span>Premium</span>
          </div>
      }

      <div className="cities__image-wrapper place-card__image-wrapper">
        <Link to={`/offer/${props.offer.id}`}>
          <img className="place-card__image"
            alt="The place"
            height="200"
            src={props.offer.images[0] ?? null}
            width="260"
          />
        </Link>
      </div>

      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{props.offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>

        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: getPercentFromRating(props.offer.rating)}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          { /* TODO: remove eslint rule eventually */ }
          { /* eslint-disable-next-line jsx-a11y/anchor-is-valid */ }
          <a href="#">{props.offer.title}</a>
        </h2>
        <p className="place-card__type">{capitalizeFirstLetter(props.offer.type)}</p>
      </div>
    </article>
  );
}

export default OfferCard;
