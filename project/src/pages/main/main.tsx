import { useState } from 'react';
import CitiesList from 'src/components/cities-list/cities-list';
import GeoMap from 'src/components/geo-map/geo-map';
import EmptyOffer from 'src/components/empty-offer/empty-offer';
import OfferCards from 'src/components/offer-сards/offer-cards';
import { City, CityNames, Offer, Offers } from 'src/types/types';
import { getMultipleOfPlaceWord } from 'src/utils/utils';

type ActiveOffer = Offer | null;

type MainProps = {
  cityNames: CityNames;
  currentCity: City;
  headerBlock?: JSX.Element;
  offers: Offers;
  offersCount: number;
};

function Main(props: MainProps) {
  const [ hoveredOffer, setHoveredOffer ] = useState<ActiveOffer>(null);
  const mainTagAdditionalClassName = props.offersCount === 0 ?
    'page__main--index-empty' :
    '' ;

  return (
    <div className="page page--gray page--main">
      {props.headerBlock}
      <main className={`page__main page__main--index ${mainTagAdditionalClassName}`}>
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CitiesList
              cityNames={props.cityNames}
              currentCityName={props.currentCity.name}
            />
          </section>
        </div>

        {
          props.offersCount <= 0 ?
            <EmptyOffer /> :
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
        }
      </main>
    </div>
  );
}

export default Main;
