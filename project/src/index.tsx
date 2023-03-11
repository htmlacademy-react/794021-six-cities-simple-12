import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import {
  offers, offersCount, currentCity, nearbyOffers, reviews, userLogin,
} from 'src/store/mock';
import { CityNames } from 'src/utils/consts';
import { Offers } from 'src/types/types';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <App
      currentCityName={currentCity}
      cityNames={CityNames}
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
