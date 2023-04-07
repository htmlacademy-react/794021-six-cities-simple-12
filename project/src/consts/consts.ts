import { IconOptions } from 'leaflet';
import { CityName } from 'src/types/types';

export const RATING_TO_PERCENT_STEP = 20 as const;

export enum AppRoute {
  Root = '/',
  Login = '/login',
  NotFound = '/404-not-found',
  Offer = '/offer/:id',
}

export const CityNames = [
  'Paris',
  'Cologne',
  'Brussels',
  'Amsterdam',
  'Hamburg',
  'Dusseldorf',
] as const;

export const INITIAL_CITY_NAME: CityName = 'Paris' as const;

export const RoomReview = {
  HeaderText: 'Your review',
  PlaceholderText: 'Tell how was your stay, what you like and what can be improved',
  SubmitButtonText: 'Submit',
  TextCharacterMinLimit: 50,
  TextCharacterMaxLimit: 300,
} as const;

export const MapPinSettings = {
  Active: {
    iconUrl: '/img/pin-active.svg',
    iconSize: [27, 39],
    iconAnchor: [13.336, 37.2],
  } as IconOptions,
  Default: {
    iconUrl: '/img/pin.svg',
    iconSize: [27, 39],
    iconAnchor: [13.336, 37.2],
  } as IconOptions,
} as const;

export enum OfferSortingOption {
  Popular = 'Popular',
  PriceLowToHigh = 'Price low to high',
  PriceHighToLow = 'Price high to low',
  TopRatedFirst = 'Top rated first',
}

export const DEFAULT_OFFER_SORTING_KEY_NAME = OfferSortingOption.Popular as const;

export const NEARBY_OFFERS_LIMIT_COUNT = 3 as const;
