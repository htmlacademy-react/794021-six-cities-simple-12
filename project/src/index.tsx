import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { City, Offers } from 'src/types/types';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

const city: City = {
  name: 'Amsterdam'
};
const offersCount = 312;
const offers: Offers = [
  {
    id: 1,
    isPremium: true,
    images: ['img/apartment-01.jpg'],
    price: 120,
    rating: 3.8,
    type: 'apartment',
    title: 'Beautiful & luxurious apartment at great location',
  },
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

root.render(
  <React.StrictMode>
    <App
      city={city}
      offers={offers}
      offersCount={offersCount}
    />
  </React.StrictMode>,
);
