import { render, screen } from '@testing-library/react';
import { address } from 'faker';
import CitiesList from './cities-list';
import { CityNames } from 'src/types/types';

describe('Component: CitiesList', () => {
  it('should render city names', () => {
    const cityNames = new Array(5).map((_item) => address.cityName()) as CityNames;
    const [ currentCityName ] = cityNames;

    render(
      <CitiesList
        cityNames={cityNames}
        currentCityName={currentCityName}
        onChangeCityName={(_cityName) => (_cityName)}
      />
    );

    cityNames.forEach((cityName) => {
      expect(screen.getByText(cityName))
        .toBeInTheDocument();
    });
  });
});
