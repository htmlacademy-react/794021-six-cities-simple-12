import { Action } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { HelmetProvider } from 'react-helmet-async';
import { fireEvent, render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { address } from 'faker';
import Main from './main';
import * as OfferCards from 'src/components/offer-cards/offer-cards';
import * as GeoMap from 'src/components/geo-map/geo-map';
import { createAPI } from 'src/services/api';
import { makeMockOffers } from 'src/utils/mock-offer';
import { DomainNamespace } from 'src/consts/domain';
import { AppState } from 'src/types/store';
import { MockBrowserRouterWrapper } from 'src/utils/mock-common';
import { DEFAULT_OFFER_SORTING_KEY_NAME } from 'src/consts/consts';

const api = createAPI();
const middlewares = [ thunk ];
const makeMockStore = configureMockStore<
  AppState,
  Action<string>,
  ThunkDispatch<AppState, typeof api, Action>
>(middlewares);

const mockCityName = address.cityName();
const mockOffers = makeMockOffers(10, { city: { name: mockCityName }});
const [ mockOffer ] = mockOffers;

const mockSortingType = DEFAULT_OFFER_SORTING_KEY_NAME;

const someOffersInTheCurrentCityState = {
  [ DomainNamespace.BusinessData ]: {
    cityName: mockCityName,
    offers: mockOffers,
    sortingType: mockSortingType,
  },
};


describe('Component: <Main>. Interaction with subcomponents <OfferCards> and <GeoMap>', () => {
  it('hovers and blurs inside "OfferCards"', () => {
    const mockStore = makeMockStore(someOffersInTheCurrentCityState);

    type MockOfferCardsProps = Pick<Parameters<typeof OfferCards.default>[0], 'onActive' | 'onBlur' | 'children'>;
    type MockGeoMapProps = Pick<Parameters<typeof GeoMap.default>[0], 'activeOffer'>;

    jest
      .spyOn(OfferCards, 'default')
      .mockImplementation((props: MockOfferCardsProps) => (
        <div
          data-testid="mock__offer-cards"
          onMouseEnter={() => props.onActive && props.onActive(mockOffer)}
          onMouseLeave={() => props.onBlur && props.onBlur()}
        >
          {props.children}
        </div>
      ));

    jest
      .spyOn(GeoMap, 'default')
      .mockImplementation((props: MockGeoMapProps) => (
        <div data-testid="mock__geo-map">
          {props?.activeOffer?.title}
        </div>
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

    const offerCardNode = screen.getByTestId(/mock__offer-cards/i);
    fireEvent.mouseEnter(offerCardNode);

    expect(screen.getByTestId(/mock__geo-map/i))
      .toHaveTextContent(mockOffer.title);

    fireEvent.mouseLeave(offerCardNode);

    expect(screen.getByTestId(/mock__geo-map/i))
      .toHaveTextContent('');
  });
});
