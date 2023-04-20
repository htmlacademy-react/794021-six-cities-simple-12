import cn from 'classnames';
import { Link } from 'react-router-dom';
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
            <Link
              className={cn(
                'locations__item-link tabs__item',
                { 'tabs__item--active': cityName === props.currentCityName }
              )}
              to='/#'
              onClick={() => props.onChangeCityName(cityName)}
            >
              <span>{cityName}</span>
            </Link>
          </li>
        ))
      }
    </ul>
  );
}

export default CitiesList;
