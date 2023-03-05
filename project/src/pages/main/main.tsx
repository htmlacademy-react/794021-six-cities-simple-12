import PlaceCard from 'src/components/place-card/place-card';
import HeaderMain from 'src/components/header-main/header-main';
import { Cities, City, Offers, UserLogin } from 'src/types/types';

type MainProps = {
  cities: Cities;
  currentCity: City;
  offers: Offers;
  offersCount: number;
  userLogin: UserLogin;
};

export default function Main(props: MainProps) {
  return (
    <>
      <HeaderMain userLogin={props.userLogin} />
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">

            <ul className="locations__list tabs__list">
              {
                props.cities.map((city) => {
                  const activeCityClassName = city.name === props.currentCity.name ?
                    ' tabs__item--active' :
                    '';
                  return (
                    <li className="locations__item"
                      key={city.name}
                    >
                      <a
                        className={`locations__item-link tabs__item ${activeCityClassName}`}
                        href="#"
                      >
                        <span>{city.name}</span>
                      </a>
                    </li>
                  );
                })
              }
            </ul>

          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">
                {`${props.offersCount} ${getPlacesText(props.offersCount)} to stay in ${props.currentCity.name}`}
              </b>
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span className="places__sorting-type" tabIndex={0}>
                  Popular
                  <svg className="places__sorting-arrow" width="7" height="4">
                    <use xlinkHref="#icon-arrow-select"></use>
                  </svg>
                </span>
                <ul className="places__options places__options--custom places__options--opened">
                  <li className="places__option places__option--active" tabIndex={0}>Popular</li>
                  <li className="places__option" tabIndex={0}>Price: low to high</li>
                  <li className="places__option" tabIndex={0}>Price: high to low</li>
                  <li className="places__option" tabIndex={0}>Top rated first</li>
                </ul>
              </form>
              <div className="cities__places-list places__list tabs__content">

                <PlaceCard offer={props.offers[0] /* TODO */} />
                <PlaceCard offer={props.offers[1] /* TODO */} />
                <PlaceCard offer={props.offers[2] /* TODO */} />
                <PlaceCard offer={props.offers[3] /* TODO */} />
                <PlaceCard offer={props.offers[4] /* TODO */} />

              </div>
            </section>
            <div className="cities__right-section">
              <section className="cities__map map"></section>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

function getPlacesText(count: number) {
  return count !== 1 ?
    'places' :
    'place';
}
