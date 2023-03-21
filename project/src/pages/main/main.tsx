import CitiesList from 'src/components/cities-list/cities-list';
import MainContent from 'src/components/main-content/main-content';
import { City, CityNames, Offers } from 'src/types/types';

type MainProps = {
  cityNames: CityNames;
  currentCity: City;
  headerBlock?: JSX.Element;
  offers: Offers;
  offersCount: number;
};

function Main(props: MainProps) {
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

        <MainContent
          offersCount={props.offersCount}
          currentCity={props.currentCity}
          offers={props.offers}
        />
      </main>
    </div>
  );
}

export default Main;
