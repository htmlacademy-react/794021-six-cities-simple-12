import { useState } from 'react';
import { setCityNameAction } from 'src/store/data/data.slice';
import { getCityName } from 'src/store/data/data.selectors';
import { useAppDispatch, useAppSelector } from 'src/hooks';
import { useFoundOffers } from 'src/hooks/use-found-offers';
import CitiesList from 'src/components/cities-list/cities-list';
import GeoMap from 'src/components/geo-map/geo-map';
import OfferCards from 'src/components/offer-сards/offer-cards';
import OfferSortingForm from 'src/components/offer-sorting-form/offer-sorting-form';
import { Spinner } from 'src/components/spinner/spinner';
import { getMultipleOfPlaceWord, sortOffers } from 'src/utils/utils';
import { DEFAULT_OFFER_SORTING_KEY_NAME } from 'src/consts/consts';
import { OfferSortingOption } from 'src/types/types';
import { CityNames, Offer } from 'src/types/types';

type ActiveOffer = Offer | null;

type MainProps = {
  cityNames: CityNames;
  headerBlock?: JSX.Element;
};

function Main(props: MainProps) {
  const [ hoveredOffer, setHoveredOffer ] = useState<ActiveOffer>(null);
  const [ sortingType, setSortingType ] = useState<OfferSortingOption>(DEFAULT_OFFER_SORTING_KEY_NAME);
  const currentCityName = useAppSelector(getCityName);
  const dispatch = useAppDispatch();
  const offers = useFoundOffers(currentCityName);

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
              onChangeCityName={(cityName) => dispatch(setCityNameAction(cityName))}
            />
          </section>
        </div>

        {
          !offers.length ?
            <Spinner text={'Offers are loading ...'} /> :
            null
        }

        {
          offers.length > 0 ?
            <div className="cities">
              <div className="cities__places-container container">
                <OfferCards
                  className="cities__places"
                  header="Places"
                  offers={sortOffers(offers, sortingType)}
                  onActive={(item) => setHoveredOffer(item)}
                  onBlur={() => setHoveredOffer(null)}
                >
                  <>
                    <b className="places__found">
                      {offers.length}{' '}
                      {getMultipleOfPlaceWord(offers.length)}{' '}
                      to stay in {currentCityName}
                    </b>
                    <OfferSortingForm
                      sortingType={sortingType}
                      onChangeSortingType={(selectedType) => setSortingType(selectedType)}
                    />
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
            :
            null
        }
      </main>
    </div>
  );
}

export default Main;
