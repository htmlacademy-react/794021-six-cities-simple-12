import { useState } from 'react';
import CitiesList from 'src/components/cities-list/cities-list';
import GeoMap from 'src/components/geo-map/geo-map';
import EmptyOffer from 'src/components/empty-offer/empty-offer';
import OfferCards from 'src/components/offer-сards/offer-cards';
import OfferSortingForm from 'src/components/offer-sorting-form/offer-sorting-form';
import { CityNames, Offer, Offers } from 'src/types/types';
import { useAppSelector } from 'src/hooks';
import { getMultipleOfPlaceWord } from 'src/utils/utils';

type ActiveOffer = Offer | null;

type MainProps = {
  cityNames: CityNames;
  headerBlock?: JSX.Element;
  offers: Offers;
  offersCount: number;
};

function Main(props: MainProps) {
  const [ hoveredOffer, setHoveredOffer ] = useState<ActiveOffer>(null);
  const currentCity = useAppSelector((state) => state.city);
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
              currentCityName={currentCity.name}
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
                      to stay in {currentCity.name}
                    </b>
                    <OfferSortingForm />
                  </>
                </OfferCards>

                <div className="cities__right-section">
                  <GeoMap
                    activeOffer={hoveredOffer}
                    className={props.offers.length <= 0 ? 'cities__map' : ''}
                    currentCity={currentCity}
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
