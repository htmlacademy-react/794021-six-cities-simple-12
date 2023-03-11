import CitiesList from 'src/components/cities-list/cities-list';
import Offers from 'src/components/offers/offers';
import EmptyOffer from 'src/components/empty-offer/empty-offer';
import { CityNames, CityName, Offers as TOffers } from 'src/types/types';

type MainProps = {
  cityNames: CityNames;
  currentCityName: CityName;
  headerBlock?: JSX.Element;
  offers: TOffers;
  offersCount: number;
};

export default function Main(props: MainProps) {
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
              currentCityName={props.currentCityName}
            />
          </section>
        </div>
        {
          props.offersCount === 0 ?
            <EmptyOffer /> :
            <Offers offersCount={props.offersCount} currentCityName={props.currentCityName} offers={props.offers} />
        }
      </main>
    </div>
  );
}
