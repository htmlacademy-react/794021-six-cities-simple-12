import { Images, City, Offer, Offers, UserLogin } from 'src/types/types';
import { HardwareFeatures } from 'src/types/types';
export const city: City = {
  name: 'Amsterdam',
};

export const offersCount = 312;

export const userLogin: UserLogin = 'fake@fake.fake';

const firstOfferImages: Images = [
  'img/apartment-01.jpg',
  'img/room.jpg',
  'img/apartment-02.jpg',
  'img/apartment-03.jpg',
  'img/studio-01.jpg',
  'img/apartment-01.jpg',
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

const firstOffer: Offer = {
  bedrooms: 3,
  goods: firstOfferGoods,
  id: 1,
  isPremium: true,
  images: firstOfferImages,
  maxAdults: 4,
  price: 120,
  rating: 4.8,
  type: 'apartment',
  title: 'Beautiful & luxurious apartment at great location',
};

export const offers: Offers = [
  firstOffer,
  {
    bedrooms: 1,
    goods: [],
    id: 2,
    isPremium: false,
    images: ['img/room.jpg'],
    maxAdults: 2,
    price: 80,
    rating: 3.9,
    type: 'private room',
    title: 'Wood and stone place',
  },
  {
    bedrooms: 2,
    goods: [],
    id: 3,
    isPremium: false,
    images: ['img/apartment-02.jpg'],
    maxAdults: 3,
    price: 132,
    rating: 4.1,
    type: 'apartment',
    title: 'Canal View Prinsengracht',
  },
  {
    bedrooms: 3,
    goods: [],
    id: 4,
    isPremium: true,
    images: ['img/apartment-03.jpg'],
    maxAdults: 6,
    price: 180,
    rating: 4.9,
    type: 'apartment',
    title: 'Nice, cozy, warm big bed apartment',
  },
  {
    bedrooms: 1,
    goods: [],
    id: 5,
    isPremium: false,
    images: ['img/apartment-03.jpg'],
    maxAdults: 2,
    price: 80,
    rating: 4.2,
    type: 'private room',
    title: 'Wood and stone place',
  },
];
