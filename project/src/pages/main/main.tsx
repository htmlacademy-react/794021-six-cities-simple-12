import { useState } from 'react';
import cn from 'classnames';
import { Helmet } from 'react-helmet-async';
import { setCityNameAction } from 'src/store/data/data.slice';
import { getCityName } from 'src/store/data/data.selectors';
import { useAppDispatch, useAppSelector } from 'src/hooks';
import { useFoundOffers } from 'src/hooks/use-found-offers';
import CitiesList from 'src/components/cities-list/cities-list';
import GeoMap from 'src/components/geo-map/geo-map';
import OfferCards from 'src/components/offer-cards/offer-cards';
import OfferSortingForm from 'src/components/offer-sorting-form/offer-sorting-form';
import { Spinner } from 'src/components/spinner/spinner';
import NoOfferBlock from 'src/components/no-offer-block/no-offer-block';
import { getMultipleOfPlaceWord, sortOffers } from 'src/utils/utils';
import { CityNames, DEFAULT_OFFER_SORTING_KEY_NAME, OfferSortingOption } from 'src/consts/consts';
import { FetchStatus } from 'src/consts/api';
import { Offer } from 'src/types/types';

type ActiveOffer = Offer | null;

function Main() {
  const [ hoveredOffer, setHoveredOffer ] = useState<ActiveOffer>(null);
  const [ sortingType, setSortingType ] = useState<OfferSortingOption>(DEFAULT_OFFER_SORTING_KEY_NAME);
  const currentCityName = useAppSelector(getCityName);
  const dispatch = useAppDispatch();
  const { fetchStatus, offers } = useFoundOffers(currentCityName);

  return (
    <>
      <Helmet>
        <title>Six cities: Offers in {currentCityName}</title>
      </Helmet>
      <div className="page page--gray page--main">
        <main className={cn(
          'page__main page__main--index',
          { 'page__main--index-empty': !offers.length }
        )}
        >
          <h1 className="visually-hidden">Cities</h1>
          <div className="tabs">
            <section className="locations container">
              <CitiesList
                cityNames={CityNames}
                currentCityName={currentCityName}
                onChangeCityName={(cityName) => dispatch(setCityNameAction(cityName))}
              />
            </section>
          </div>

          {
            fetchStatus === FetchStatus.Pending || fetchStatus === FetchStatus.NotStarted ?
              <Spinner text={'Offers are loading ...'} /> :
              null
          }

          {
            offers.length > 0 || fetchStatus === FetchStatus.Pending || fetchStatus === FetchStatus.NotStarted ?
              <div className="cities"
                data-testid="main__offer-cards-with-geo-map"
              >
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
                        {offers.length > 0 ? offers.length : ''}{' '}
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
                      data-testid="geo-map"
                      className="cities__map"
                      offers={offers}
                    />
                  </div>
                </div>
              </div>
              :
              null
          }

          {
            offers.length === 0 && (fetchStatus === FetchStatus.FetchedWithError || fetchStatus === FetchStatus.FetchedWithNoError) ?
              <NoOfferBlock
                cityName={currentCityName}
                dataTestId="main__no-offers-container"
              />
              :
              null
          }
        </main>
      </div>
    </>
  );
}

export default Main;
