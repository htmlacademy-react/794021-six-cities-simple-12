import { Action } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { HelmetProvider } from 'react-helmet-async';
import { fireEvent, render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { address } from 'faker';
import Main from './main';
import * as OfferSortingForm from 'src/components/offer-sorting-form/offer-sorting-form';
import { createAPI } from 'src/services/api';
import { makeMockOffers } from 'src/utils/mock-offer';
import { DomainNamespace } from 'src/consts/domain';
import { AppState } from 'src/types/store';
import { MockBrowserRouterWrapper } from 'src/utils/mock-common';
import { DEFAULT_OFFER_SORTING_KEY_NAME, OfferSortingOption } from 'src/consts/consts';
import { setSortingTypeAction } from 'src/store/data/data.slice';

const api = createAPI();
const middlewares = [ thunk ];
const makeMockStore = configureMockStore<
  AppState,
  Action<string>,
  ThunkDispatch<AppState, typeof api, Action>
>(middlewares);


const mockCityName = address.cityName();
const mockOffers = makeMockOffers(10, { city: { name: mockCityName }});

const mockSortingType = DEFAULT_OFFER_SORTING_KEY_NAME;
const mockChangedSortingType = 'FAKE_SORTING_TYPE';

const someOffersInTheCurrentCityState = {
  [ DomainNamespace.BusinessData ]: {
    cityName: mockCityName,
    offers: mockOffers,
    sortingType: mockSortingType,
  },
};


describe('Component: <Main>. Interaction with subcomponent <OfferSortingForm>', () => {
  it('dispatches change of sorting type"', () => {
    const mockStore = makeMockStore(someOffersInTheCurrentCityState);

    type MockProps = Pick<Parameters<typeof OfferSortingForm.default>[0], 'onChangeSortingType'>;

    jest
      .spyOn(OfferSortingForm, 'default')
      .mockImplementation((props: MockProps) => (
        <button
          data-testid="mock__offer-sorting-form"
          onClick={() => props.onChangeSortingType && props.onChangeSortingType(mockChangedSortingType as OfferSortingOption)}
          type="button"
        />
      ));

    render(
      <Provider store={mockStore}>
        <MockBrowserRouterWrapper>
          <HelmetProvider>
            <Main />
          </HelmetProvider>
        </MockBrowserRouterWrapper>
      </Provider>
    );

    const node = screen.getByTestId(/mock__offer-sorting-form/i);
    fireEvent.click(node);

    const actions = mockStore.getActions();

    expect(actions.length)
      .toBe(1);

    expect(actions[0].type)
      .toBe(setSortingTypeAction.type);
  });
});
