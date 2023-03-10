import CitiesList from 'src/components/cities-list/cities-list';
import OfferCards from 'src/components/offer-сards/offer-cards';
import EmptyOffer from 'src/components/empty-offer/empty-offer';
import { CityNames, CityName, Offers } from 'src/types/types';

type MainProps = {
  cityNames: CityNames;
  currentCityName: CityName;
  headerBlock?: JSX.Element;
  offers: Offers;
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
            <OfferCards offersCount={props.offersCount} currentCityName={props.currentCityName} offers={props.offers} />
        }
      </main>
    </div>
  );
}
