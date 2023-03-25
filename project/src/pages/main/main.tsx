import { useState } from 'react';
import CitiesList from 'src/components/cities-list/cities-list';
import GeoMap from 'src/components/geo-map/geo-map';
import EmptyOffer from 'src/components/empty-offer/empty-offer';
import OfferCards from 'src/components/offer-сards/offer-cards';
import OfferSortingForm from 'src/components/offer-sorting-form/offer-sorting-form';
import { CityNames, Offer } from 'src/types/types';
import { useAppDispatch, useAppSelector } from 'src/hooks';
import { changeCity } from 'src/store/action';
import { getMultipleOfPlaceWord } from 'src/utils/utils';

type ActiveOffer = Offer | null;

type MainProps = {
  cityNames: CityNames;
  headerBlock?: JSX.Element;
};

function Main(props: MainProps) {
  const [ hoveredOffer, setHoveredOffer ] = useState<ActiveOffer>(null);
  const currentCityName = useAppSelector((state) => state.cityName);
  const offers = useAppSelector((state) => state.offers);
  const dispatch = useAppDispatch();
  const mainTagAdditionalClassName = offers.length === 0 ?
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
              currentCityName={currentCityName}
              onChangeCityName={(cityName) => dispatch(changeCity(cityName))}
            />
          </section>
        </div>

        {
          offers.length <= 0 ?
            <EmptyOffer cityName={currentCityName} /> :
            <div className="cities">
              <div className="cities__places-container container">
                <OfferCards
                  className="cities__places"
                  header="Places"
                  offers={offers}
                  onActive={(item) => setHoveredOffer(item)}
                  onBlur={() => setHoveredOffer(null)}
                >
                  <>
                    <b className="places__found">
                      {offers.length}{' '}
                      {getMultipleOfPlaceWord(offers.length)}{' '}
                      to stay in {currentCityName}
                    </b>
                    <OfferSortingForm />
                  </>
                </OfferCards>

                <div className="cities__right-section">
                  <GeoMap
                    activeOffer={hoveredOffer}
                    className={offers.length <= 0 ? 'cities__map' : ''}
                    offers={offers}
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
