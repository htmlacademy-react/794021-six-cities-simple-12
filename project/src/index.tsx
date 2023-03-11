import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { currentCity, userLogin, } from 'src/mocks/mocks';
import { offers, offersCount, nearbyOffers } from 'src/mocks/offers';
import { reviews } from 'src/mocks/reviews';
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
