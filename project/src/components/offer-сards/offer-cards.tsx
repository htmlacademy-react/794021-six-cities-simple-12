import { useState } from 'react';
import { City, Locations, Offer, Offers } from 'src/types/types';
import OfferCard from 'src/components/offer-card/offer-card';
import GeoMap from 'src/components/geo-map/geo-map';
import { getMultipleOfPlaceWord } from 'src/utils/utils';

type ActiveOffer = Offer | null;

type OfferCardsProps = {
  offers: Offers;
  offersCount: number;
  currentCity: City;
}

function OfferCards(props: OfferCardsProps): JSX.Element {
  const [ hoveredOffer, setHoveredOffer ] = useState<ActiveOffer>(null);
  // TODO: use it on the map
  // eslint-disable-next-line no-console
  console.log(hoveredOffer);

  const locations = getLocations(props.offers);

  return (
    <div className="cities">
      <div className="cities__places-container container">
        <section className="cities__places places">
          <h2 className="visually-hidden">Places</h2>
          <b className="places__found">
            {`
              ${props.offersCount}
              ${getMultipleOfPlaceWord(props.offersCount)}
              to stay in ${props.currentCity.name}
            `}
          </b>
          <form className="places__sorting" action="#" method="get">
            <span className="places__sorting-caption">Sort by</span>
            <span className="places__sorting-type" tabIndex={0}>
              Popular
              <svg className="places__sorting-arrow" width="7" height="4">
                <use xlinkHref="#icon-arrow-select"></use>
              </svg>
            </span>
            <ul className="places__options places__options--custom">{ /* FIXME 'places__options--opened' */}
              <li className="places__option places__option--active" tabIndex={0}>Popular</li>
              <li className="places__option" tabIndex={0}>Price: low to high</li>
              <li className="places__option" tabIndex={0}>Price: high to low</li>
              <li className="places__option" tabIndex={0}>Top rated first</li>
            </ul>
          </form>
          <div className="cities__places-list places__list tabs__content">
            {
              props.offers.map((offer: Offer): JSX.Element => (
                <OfferCard
                  className='cities__card'
                  key={offer.id}
                  offer={offer}
                  onActive={() => setHoveredOffer(offer)}
                  onBlur={() => setHoveredOffer(null)}
                />
              ))
            }
          </div>
        </section>
        <div className="cities__right-section">
          <GeoMap
            currentCity={props.currentCity}
            className={locations.length <= 0 ? 'cities__map' : ''}
            locations={locations}
          />
        </div>
      </div>
    </div>
  );
}

function getLocations(offers: Offers): Locations {
  return offers.map((offer) => offer.location);
}

export default OfferCards;
