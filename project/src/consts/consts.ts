import { IconOptions } from 'leaflet';
import { CityName } from 'src/types/types';

export const RATING_TO_PERCENT_STEP = 20;

export enum AppRoute {
  Root = '/',
  Login = 'login',
  NotFound = '/404-not-found',
  Offer = 'offer/:id',
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

const ACTIVE_PIN_SETTING: IconOptions = {
  iconUrl: '/img/pin-active.svg',
  iconSize: [27, 39],
  iconAnchor: [13.336, 37.2],
};

const DEFAULT_PIN_SETTING: IconOptions = {
  iconUrl: '/img/pin.svg',
  iconSize: [27, 39],
  iconAnchor: [13.336, 37.2],
};

export const MapPinSettings = {
  Active: ACTIVE_PIN_SETTING,
  Default: DEFAULT_PIN_SETTING,
};

export const OfferSortingVariant = {
  popular: {id: 'popular', title: 'Popular' },
  priceLowToHigh: { id: 'priceLowToHigh', title: 'Price: low to high' },
  priceHighToLow: { id: 'priceHighToLow', title: 'Price: high to low' },
  topRatedFirst: { id: 'topRatedFirst', title: 'Top rated first' },
} as const;

export const DEFAULT_OFFER_SORTING_KEY_NAME = OfferSortingVariant.popular.id;

export const NEARBY_OFFERS_LIMIT_COUNT = 3 as const;
