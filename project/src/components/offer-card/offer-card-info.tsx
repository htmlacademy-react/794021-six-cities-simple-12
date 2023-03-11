import { getPercentFromRating, capitalizeFirstLetter } from 'src/utils/utils';

type OfferCardInfoProps = {
  price: number;
  rating: number;
  title: string;
  type: string;
}

function OfferCardInfo({ price, rating, title, type}: OfferCardInfoProps): JSX.Element {
  return (
    <div className="place-card__info">
      <div className="place-card__price-wrapper">
        <div className="place-card__price">
          <b className="place-card__price-value">&euro;{price}</b>
          <span className="place-card__price-text">&#47;&nbsp;night</span>
        </div>

      </div>
      <div className="place-card__rating rating">
        <div className="place-card__stars rating__stars">
          <span style={{width: getPercentFromRating(rating)}}></span>
          <span className="visually-hidden">Rating</span>
        </div>
      </div>
      <h2 className="place-card__name">
        { /* TODO: remove eslint rule eventually */ }
        { /* eslint-disable-next-line jsx-a11y/anchor-is-valid */ }
        <a href="#">{title}</a>
      </h2>
      <p className="place-card__type">{capitalizeFirstLetter(type)}</p>
    </div>
  );
}

export default OfferCardInfo;
