import {
  Images, CityName, Offer, Offers, Review, Reviews, User, UserLogin
} from 'src/types/types';
import { HardwareFeatures } from 'src/types/types';

export const currentCity: CityName = 'Amsterdam';

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

const userAngelina: User = {
  avatarUrl: 'img/avatar-angelina.jpg',
  id: 3,
  isPro: true,
  name: 'Angelina',
};

const userMax: User = {
  avatarUrl: 'img/avatar-max.jpg',
  id: 2,
  isPro: false,
  name: 'Max',
};

const firstOffer: Offer = {
  bedrooms: 3,
  description: `
    A quiet cozy and picturesque that hides behind a river by the unique lightness of Amsterdam. The building is green and from 18th century.\n
    An independent House, strategically located between Rembrand Square and National Opera, but where the bustle of the city comes to rest in this alley flowery and colorful.
  `,
  goods: firstOfferGoods,
  host: userAngelina,
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
    description: 'An independent House, strategically located between Rembrand Square and National Opera, but where the bustle of the city comes to rest in this alley flowery and colorful.',
    goods: [],
    host: userMax,
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
    description: '',
    goods: [],
    host: userAngelina,
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
    description: '',
    goods: [],
    host: userMax,
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
    description: '',
    goods: [],
    host: userAngelina,
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

export const firstOffer1stReview: Review = {
  comment: 'A quiet cozy and picturesque that hides behind a river by the unique lightness of Amsterdam. The building is green and from 18th century.',
  date: 'Fri Apr 24 2020 03:02:01 GMT+0200',
  id: 1, // hotelId
  rating: 4.8,
  user: userMax,
};

export const secondOffer1stReview: Review = {
  comment: 'An independent House, strategically located between Rembrand Square and National Opera, but where the bustle of the city comes to rest in this alley flowery and colorful.',
  date: 'Tue May 25 2020 03:04:05 GMT+0200',
  id: 2, // hotelId
  rating: 3.9,
  user: userAngelina,
};

export const reviews: Reviews = [
  firstOffer1stReview,
  secondOffer1stReview,
];

export const nearbyOffers: Offers = [
  offers[1],
  offers[2],
  offers[3],
];
