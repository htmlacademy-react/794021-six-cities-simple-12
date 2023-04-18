import { Offer, Offers } from 'src/types/types';
import OfferCard from 'src/components/offer-card/offer-card';

type OfferCardsProps = {
  children?: JSX.Element;
  className: string;
  header: string;
  offers: Offers;
  onActive?: (item: Offer) => void;
  onBlur?: () => void;
}

function OfferCards(props: OfferCardsProps): JSX.Element {
  return (
    <div className="container">
      <section className={`${props.className} places`}>
        <h2 className="visually-hidden">{props.header}</h2>

        {props.children}

        <div className="cities__places-list places__list tabs__content">
          {
            props.offers.map((offer: Offer): JSX.Element => (
              <OfferCard
                className='cities__card'
                key={offer.id}
                offer={offer}
                onActive={() => props.onActive && props.onActive(offer)}
                onBlur={() => props.onBlur && props.onBlur()}
              />
            ))
          }
        </div>
      </section>
    </div>
  );
}

export default OfferCards;
