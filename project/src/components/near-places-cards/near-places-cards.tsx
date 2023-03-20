import { Offer, Offers } from 'src/types/types';
import OfferCard from 'src/components/offer-card/offer-card';

type ActiveOffer = Offer | null;

type NearPlacesCardsProps = {
  offers: Offers;
  onHover: (offer: ActiveOffer) => void;
};

function NearPlacesCards(props: NearPlacesCardsProps): JSX.Element {
  return (
    <>
      <h2 className="near-places__title">Other places in the neighbourhood</h2>
      <div className="near-places__list places__list">
        {
          props.offers.map((offer) => (
            <OfferCard
              className='near-places'
              key={offer.id}
              offer={offer}
              onActive={() => props.onHover(offer)}
              onBlur={() => props.onHover(null)}
            />
          ))
        }
      </div>
    </>
  );
}

export default NearPlacesCards;
