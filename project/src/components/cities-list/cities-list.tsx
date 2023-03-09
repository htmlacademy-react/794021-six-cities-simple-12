import { CityNames, CityName } from 'src/types/types';

type CitiesListProps = {
  cityNames: CityNames;
  currentCityName: CityName;
}

function CitiesList(props: CitiesListProps): JSX.Element {
  return (
    <ul className="locations__list tabs__list">
      {
        props.cityNames.map((cityName) => {
          const activeCityClassName = cityName === props.currentCityName ?
            ' tabs__item--active' : // TODO: remove '.tabs__item--active' if no offer (empty)
            '';
          return (
            <li className="locations__item"
              key={cityName}
            >
              <a
                className={`locations__item-link tabs__item ${activeCityClassName}`}
                href="#"
              >
                <span>{cityName}</span>
              </a>
            </li>
          );
        })
      }
    </ul>
  );
}

export default CitiesList;
