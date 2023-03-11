import { Link } from 'react-router-dom';
import { Offer } from 'src/types/types';
import PlaceCardInfo from './place-card-info';

type PlaceCardProps = {
  offer: Offer;
};
// TODO: consider using word based on 'Room'
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
        <Link to={`/offer/${offer.id}`}>
          <img className="place-card__image"
            src={offer.images[0] ?? null}
            width="260" height="200" alt="The place"
          />
        </Link>
      </div>
      <PlaceCardInfo
        price={offer.price}
        rating={offer.rating}
        title={offer.title}
        type={offer.type}
      />
    </article>
  );
}

export default PlaceCard;
