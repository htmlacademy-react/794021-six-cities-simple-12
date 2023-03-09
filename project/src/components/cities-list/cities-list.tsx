import { Cities, City } from 'src/types/types';

type CitiesListProps = {
  cities: Cities;
  currentCity: City;
}

function CitiesList(props: CitiesListProps): JSX.Element {
  return (
    <ul className="locations__list tabs__list">
      {
        props.cities.map((city) => {
          const activeCityClassName = city.name === props.currentCity.name ?
            ' tabs__item--active' : // TODO: remove '.tabs__item--active' if no offer (empty)
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
  );
}

export default CitiesList;
