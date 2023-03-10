import { Link } from 'react-router-dom';
import { Offer } from 'src/types/types';
import OfferCardInfo from './offer-card-info';

type OfferCardProps = {
  offer: Offer;
};

function OfferCard({ offer }: OfferCardProps): JSX.Element {
  return (
    <article className="cities__card place-card">
      {
        offer.isPremium &&
          <div className="place-card__mark">
            <span>Premium</span>
          </div>
      }

      <div className="cities__image-wrapper place-card__image-wrapper">
        <Link to={`/offer/${offer.id}`}>
          <img className="place-card__image"
            src={offer.images[0] ?? null}
            width="260" height="200" alt="The place"
          />
        </Link>
      </div>
      <OfferCardInfo
        price={offer.price}
        rating={offer.rating}
        title={offer.title}
        type={offer.type}
      />
    </article>
  );
}

export default OfferCard;
