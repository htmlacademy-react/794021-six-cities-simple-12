import { Images, City, Offer, Offers } from 'src/types/types';

export const city: City = {
  name: 'Amsterdam',
};

export const offersCount = 312;

const firstOfferImages: Images = [
  'img/apartment-01.jpg',
  'img/room.jpg',
  'img/apartment-02.jpg',
  'img/apartment-03.jpg',
  'img/studio-01.jpg',
  'img/apartment-01.jpg',
];

const firstOffer: Offer = {
  id: 1,
  isPremium: true,
  images: firstOfferImages,
  price: 120,
  rating: 4.8,
  type: 'apartment',
  title: 'Beautiful & luxurious apartment at great location',
};

export const offers: Offers = [
  firstOffer,
  {
    id: 2,
    isPremium: false,
    images: ['img/room.jpg'],
    price: 80,
    rating: 3.9,
    type: 'private room',
    title: 'Wood and stone place',
  },
  {
    id: 3,
    isPremium: false,
    images: ['img/apartment-02.jpg'],
    price: 132,
    rating: 4.1,
    type: 'apartment',
    title: 'Canal View Prinsengracht',
  },
  {
    id: 4,
    isPremium: true,
    images: ['img/apartment-03.jpg'],
    price: 180,
    rating: 4.9,
    type: 'apartment',
    title: 'Nice, cozy, warm big bed apartment',
  },
  {
    id: 5,
    isPremium: false,
    images: ['img/apartment-03.jpg'],
    price: 80,
    rating: 4.2,
    type: 'private room',
    title: 'Wood and stone place',
  },
];
