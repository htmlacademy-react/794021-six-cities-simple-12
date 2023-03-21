import { useState } from 'react';
import { City, Offer, Offers } from 'src/types/types';
import GeoMap from 'src/components/geo-map/geo-map';
import OfferCards from 'src/components/offer-сards/offer-cards';
import EmptyOffer from 'src/components/empty-offer/empty-offer';
import { getMultipleOfPlaceWord } from 'src/utils/utils';

type ActiveOffer = Offer | null;

type MainContentProps = {
  offers: Offers;
  offersCount: number;
  currentCity: City;
}

function MainContent(props: MainContentProps): JSX.Element {
  const [ hoveredOffer, setHoveredOffer ] = useState<ActiveOffer>(null);

  if (props.offersCount <= 0) {
    return <EmptyOffer />;
  }

  return (
    <div className="cities">
      <div className="cities__places-container container">
        <OfferCards
          className="cities__places"
          header="Places"
          offers={props.offers}
          onActive={(item) => setHoveredOffer(item)}
          onBlur={() => setHoveredOffer(null)}
        >
          <>
            <b className="places__found">
              {props.offersCount}{' '}
              {getMultipleOfPlaceWord(props.offersCount)}{' '}
              to stay in {props.currentCity.name}
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
          </>
        </OfferCards>

        <div className="cities__right-section">
          <GeoMap
            activeOffer={hoveredOffer}
            className={props.offers.length <= 0 ? 'cities__map' : ''}
            currentCity={props.currentCity}
            offers={props.offers}
          />
        </div>
      </div>
    </div>
  );
}

export default MainContent;
