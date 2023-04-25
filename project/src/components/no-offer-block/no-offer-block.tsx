import { CityName } from 'src/types/types';

type NoOfferBlockProps = {
  cityName: CityName;
  dataTestId?: string;
}

function NoOfferBlock({ cityName, dataTestId }: NoOfferBlockProps): JSX.Element {
  return (
    <div className="cities" data-testid={`${dataTestId ?? ''}`}>
      <div className="cities__places-container container cities__places-container--empty">
        <section className="cities__no-places">
          <div className="cities__status-wrapper tabs__content">
            <b className="cities__status">No places to stay available</b>
            <p className="cities__status-description">
              We could not find any property available at the moment in{' '}
              {cityName}
            </p>
          </div>
        </section>
        <div className="cities__right-section"></div>
      </div>
    </div>
  );
}

export default NoOfferBlock;
