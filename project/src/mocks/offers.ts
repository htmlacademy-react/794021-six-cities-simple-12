import { Offers, User, } from 'src/types/types';

export const offersCount = 312;

export const userAngelina: User = {
  avatarUrl: 'img/avatar-angelina.jpg',
  id: 1,
  isPro: true,
  name: 'Angelina',
};

export const userMax: User = {
  avatarUrl: 'img/avatar-max.jpg',
  id: 2,
  isPro: false,
  name: 'Max',
};

export const nearbyOffers: Offers = [
  {
    bedrooms: 1,
    city: {
      location: {
        latitude: 52.370216,
        longitude: 4.895168,
        zoom: 10,
      },
      name: 'Amsterdam',
    },
    description: 'An independent House, strategically located between Rembrand Square and National Opera, but where the bustle of the city comes to rest in this alley flowery and colorful.',
    goods: ['Towels', 'Heating',],
    host: userMax,
    id: 2,
    isPremium: false,
    images: ['img/room.jpg'],
    location: { latitude: 52.3609553943508, longitude: 4.85309666406198, zoom: 8 },
    maxAdults: 2,
    price: 80,
    rating: 3.9,
    title: 'Wood and stone place',
    type: 'private room',
  },
  {
    bedrooms: 2,
    city: {
      location: {
        latitude: 52.370216,
        longitude: 4.895168,
        zoom: 10,
      },
      name: 'Amsterdam',
    },
    description: '',
    goods: ['Coffee machine', 'Baby seat',],
    host: userAngelina,
    id: 3,
    isPremium: false,
    images: ['img/apartment-02.jpg'],
    location: { latitude: 52.390955394350, longitude: 4.929309666406198, zoom: 8 },
    maxAdults: 3,
    price: 132,
    rating: 4.1,
    title: 'Canal View Prinsengracht',
    type: 'apartment',
  },
  {
    bedrooms: 3,
    city: {
      location: {
        latitude: 52.370216,
        longitude: 4.895168,
        zoom: 10,
      },
      name: 'Amsterdam',
    },
    description: '',
    goods: ['Kitchen', 'Dishwasher',],
    host: userMax,
    id: 4,
    isPremium: true,
    images: ['img/apartment-03.jpg'],
    location: { latitude: 52.3809553943508, longitude: 4.939309666406198, zoom: 8 },
    maxAdults: 6,
    price: 180,
    rating: 4.9,
    title: 'Nice, cozy, warm big bed apartment',
    type: 'apartment',
  },
  {
    bedrooms: 1,
    city: {
      location: {
        latitude: 52.370216,
        longitude: 4.895168,
        zoom: 10,
      },
      name: 'Amsterdam',
    },
    description: '',
    goods: ['Cabel TV', 'Fridge',],
    host: userAngelina,
    id: 5,
    isPremium: false,
    images: ['img/apartment-03.jpg'],
    location: { latitude: 52.3809553943508, longitude: 4.929309666406198, zoom: 8 },
    maxAdults: 2,
    price: 80,
    rating: 4.2,
    title: 'Wood and stone place',
    type: 'private room',
  },
];
