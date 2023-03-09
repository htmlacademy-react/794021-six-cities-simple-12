import { Link } from 'react-router-dom';
import { Offers } from 'src/types/types';
import PlaceCardInfo from 'src/components/place-card/place-card-info';

type NearPlacesCardsProps = {
  offers: Offers;
};

export default NearPlacesCards;

function NearPlacesCards(props: NearPlacesCardsProps): JSX.Element {
  return (
    <>
      <h2 className="near-places__title">Other places in the neighbourhood</h2>
      <div className="near-places__list places__list">
        {
          props.offers.map((offer) => (
            <article
              className="near-places__card place-card"
              key={offer.id}
            >
              <div className="near-places__image-wrapper place-card__image-wrapper">
                <Link to={`/offer/${offer.id}`}>
                  <img
                    alt="Interior"
                    className="place-card__image"
                    src={offer.images[0] ?? ''}
                    height="200"
                    width="260"
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
          ))
        }
      </div>
    </>
  );
}
