import PlaceCard from 'src/components/place-card/place-card';
import HeaderMain from 'src/components/header-main/header-main';
import CitiesList from 'src/components/cities-list/cities-list';
import { Cities, City, Offer, Offers, UserLogin } from 'src/types/types';
import { getMultipleOfPlaceWord } from 'src/utils/utils';

type MainProps = {
  cities: Cities;
  currentCity: City;
  offers: Offers;
  offersCount: number;
  userLogin: UserLogin;
};

export default function Main(props: MainProps) {
  return (
    <div className="page page--gray page--main">
      <HeaderMain userLogin={props.userLogin} />
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CitiesList
              cities={props.cities}
              currentCity={props.currentCity}
            />
          </section>
        </div>
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
                    <PlaceCard
                      key={offer.id}
                      offer={offer}
                    />
                  ))
                }

              </div>
            </section>
            <div className="cities__right-section">
              <section className="cities__map map"></section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
