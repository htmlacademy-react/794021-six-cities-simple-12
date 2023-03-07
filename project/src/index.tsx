import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import {
  cities, offers, offersCount, currentCity, nearbyOffers, reviews, userLogin,
} from 'src/store/mock';
import { Offers } from 'src/types/types';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <App
      currentCity={currentCity}
      cities={cities}
      getNearbyOffers={getNearbyOffers}
      offers={offers}
      offersCount={offersCount}
      reviews={reviews}
      userLogin={userLogin}
    />
  </React.StrictMode>,
);

// FIXME
function getNearbyOffers(id: number): Offers {
  return nearbyOffers;
}
