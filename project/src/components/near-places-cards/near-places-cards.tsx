import { useState } from 'react';
import { Offer, Offers } from 'src/types/types';
import OfferCard from 'src/components/offer-card/offer-card';

type ActiveOffer = Offer | null;

type NearPlacesCardsProps = {
  offers: Offers;
};

function NearPlacesCards(props: NearPlacesCardsProps): JSX.Element {
  const [ hoveredOffer, setHoveredOffer ] = useState<ActiveOffer>(null);
  // TODO: use it on the map
  // eslint-disable-next-line no-console
  console.log(hoveredOffer);
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
              onActive={() => setHoveredOffer(offer)}
              onBlur={() => setHoveredOffer(null)}
            />
          ))
        }
      </div>
    </>
  );
}

export default NearPlacesCards;
