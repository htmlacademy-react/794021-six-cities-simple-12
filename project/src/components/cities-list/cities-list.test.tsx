import { Provider } from 'react-redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { address, datatype } from 'faker';
import { render, screen } from '@testing-library/react';
import { Action } from '@reduxjs/toolkit';
import { configureMockStore } from '@jedmao/redux-mock-store';
import CitiesList from './cities-list';
import { createAPI } from 'src/services/api';
import { CityNames } from 'src/types/types';
import { AppState } from 'src/types/store';
import { setCityNameAction } from 'src/store/data/data.slice';
import { act } from 'react-dom/test-utils';
import { MockBrowserRouterWrapper } from 'src/utils/mock-common';

const api = createAPI();
const middlewares = [ thunk ];
const makeMockStore = configureMockStore<
  AppState,
  Action<string>,
  ThunkDispatch<AppState, typeof api, Action>
>(middlewares);

const mockStore = makeMockStore();
// const history = MockBrowserRouterWrapper.history;

describe('Component: CitiesList', () => {
  it('renders links with city names', () => {
    const cityCount = datatype.number({ min: 5, max: 10});
    const cityNames: CityNames = new Array(cityCount).fill('').map((_item) => address.cityName());
    const [ currentCityName ] = cityNames;

    render(
      <Provider store={mockStore}>
        <MockBrowserRouterWrapper>
          <CitiesList
            cityNames={cityNames}
            currentCityName={currentCityName}
          />
        </MockBrowserRouterWrapper>
      </Provider>
    );

    const cityItems = screen.getAllByTestId('cities-list__item');

    expect(cityItems.length)
      .toBe(cityNames.length);

    cityItems.forEach((cityItem, index) => {
      expect(cityItem.textContent)
        .toEqual(cityNames[index]);
    });
  });


  it('clicks on every city link', () => {
    const cityCount = datatype.number({ min: 5, max: 10});
    const cityNames: CityNames = new Array(cityCount).fill('').map((_item) => address.cityName());
    const [ currentCityName ] = cityNames;

    render(
      <Provider store={mockStore}>
        <MockBrowserRouterWrapper>
          <CitiesList
            cityNames={cityNames}
            currentCityName={currentCityName}
          />
        </MockBrowserRouterWrapper>
      </Provider>
    );

    const cityItems = screen.getAllByTestId('cities-list__item-link');

    expect(cityItems.length)
      .toBe(cityNames.length);

    let actions: Action[] = [];

    act(() => {
      cityItems.forEach((cityItem) => cityItem.click());
      actions = [ ...mockStore.getActions() ];
    });

    const allExpectedActions = cityNames.map((cityName) => cityName !== currentCityName ? setCityNameAction(cityName) : null);
    const filteredExpectedActions = allExpectedActions.filter((action) => !!action);

    expect(filteredExpectedActions.length)
      .toBe(cityNames.length - 1);

    expect(actions)
      .toEqual(filteredExpectedActions);
  });
});
