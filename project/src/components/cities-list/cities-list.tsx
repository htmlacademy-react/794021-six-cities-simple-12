import cn from 'classnames';
import { CityNames, CityName } from 'src/types/types';

type CitiesListProps = {
  cityNames: CityNames;
  currentCityName: CityName;
  onChangeCityName: (cityName: CityName) => void;
}

function CitiesList(props: CitiesListProps): JSX.Element {
  return (
    <ul className="locations__list tabs__list">
      {
        props.cityNames.map((cityName) => (
          <li className="locations__item"
            key={cityName}
          >
            { /* TODO: remove eslint rule eventually */ }
            { /* eslint-disable-next-line jsx-a11y/anchor-is-valid */ }
            <a
              className={cn(
                'locations__item-link tabs__item',
                { 'tabs__item--active': cityName === props.currentCityName }
              )}
              href="#"
              onClick={() => props.onChangeCityName(cityName)}
            >
              <span>{cityName}</span>
            </a>
          </li>
        ))
      }
    </ul>
  );
}

export default CitiesList;
