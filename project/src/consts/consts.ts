import { IconOptions } from 'leaflet';
import { CityName } from 'src/types/types';
import { OfferSortingOption } from 'src/types/types';

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

export const OfferSortingVariant: Record<string, string> = {
  'popular': 'Popular', // По умолчанию
  'priceLowToHigh': 'Price: low to high', // От дешёвых к дорогим
  'priceHighToLow': 'Price: high to low', // От дорогих к дешёвым
  'topRatedFirst': 'Top rated first', // От высокого рейтинга к низкому
} as const;

export const DEFAULT_OFFER_SORTING_KEY_NAME: OfferSortingOption = 'popular';
