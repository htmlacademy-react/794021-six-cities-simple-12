import { Link } from 'react-router-dom';
import cn from 'classnames';
import { useAppDispatch } from 'src/hooks';
import { setCityNameAction } from 'src/store/data/data.slice';
import { CityNames, CityName } from 'src/types/types';

type CitiesListProps = {
  cityNames: CityNames;
  currentCityName?: CityName;
}

function CitiesList(props: CitiesListProps): JSX.Element {
  const dispatch = useAppDispatch();

  return (
    <ul className="locations__list tabs__list">
      {
        props.cityNames.map((cityName) => (
          <li
            className="locations__item"
            key={cityName}
            data-testid="cities-list__item"
          >
            <Link
              className={cn(
                'locations__item-link tabs__item',
                { 'tabs__item--active': cityName === props.currentCityName }
              )}
              data-testid="cities-list__item-link"
              to='/#'
              onClick={
                props.currentCityName === cityName ?
                  void 0 :
                  () => dispatch(setCityNameAction(cityName))
              }
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
