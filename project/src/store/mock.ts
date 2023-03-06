import { Images, Cities, City, Offer, OfferHost, Offers, UserLogin } from 'src/types/types';
import { HardwareFeatures } from 'src/types/types';

export const currentCity: City = {
  name: 'Amsterdam',
};

export const cities: Cities = [
  { name: 'Paris' },
  { name: 'Cologne' },
  { name: 'Brussels' },
  { name: 'Amsterdam' },
  { name: 'Hamburg' },
  { name: 'Dusseldorf' },
];

export const offersCount = 312;

export const userLogin: UserLogin = 'fake@fake.fake';

const firstOfferImages: Images = [
  'img/apartment-01.jpg',
  'img/room.jpg',
  'img/apartment-02.jpg',
  'img/apartment-03.jpg',
  'img/studio-01.jpg',
];

const firstOfferGoods: HardwareFeatures = [
  'Wi-Fi',
  'Washing machine',
  'Towels',
  'Heating',
  'Coffee machine',
  'Baby seat',
  'Kitchen',
  'Dishwasher',
  'Cabel TV',
  'Fridge',
];

const firstOfferHost: OfferHost = {
  avatarUrl: 'img/avatar-angelina.jpg',
  id: 3,
  isPro: true,
  name: 'Angelina',
};

const secondOfferHost: OfferHost = {
  avatarUrl: 'img/avatar-max.jpg',
  id: 2,
  isPro: false,
  name: 'Max',
};

const firstOffer: Offer = {
  bedrooms: 3,
  goods: firstOfferGoods,
  host: firstOfferHost,
  id: 1,
  isPremium: true,
  images: firstOfferImages,
  maxAdults: 4,
  price: 120,
  rating: 4.8,
  title: 'Beautiful & luxurious apartment at great location',
  type: 'apartment',
};

export const offers: Offers = [
  firstOffer,
  {
    bedrooms: 1,
    goods: [],
    host: secondOfferHost,
    id: 2,
    isPremium: false,
    images: ['img/room.jpg'],
    maxAdults: 2,
    price: 80,
    rating: 3.9,
    title: 'Wood and stone place',
    type: 'private room',
  },
  {
    bedrooms: 2,
    goods: [],
    host: firstOfferHost, // TODO: still the first host
    id: 3,
    isPremium: false,
    images: ['img/apartment-02.jpg'],
    maxAdults: 3,
    price: 132,
    rating: 4.1,
    title: 'Canal View Prinsengracht',
    type: 'apartment',
  },
  {
    bedrooms: 3,
    goods: [],
    host: firstOfferHost, // TODO: still the first host
    id: 4,
    isPremium: true,
    images: ['img/apartment-03.jpg'],
    maxAdults: 6,
    price: 180,
    rating: 4.9,
    title: 'Nice, cozy, warm big bed apartment',
    type: 'apartment',
  },
  {
    bedrooms: 1,
    goods: [],
    host: firstOfferHost, // TODO: still the first host
    id: 5,
    isPremium: false,
    images: ['img/apartment-03.jpg'],
    maxAdults: 2,
    price: 80,
    rating: 4.2,
    title: 'Wood and stone place',
    type: 'private room',
  },
];
