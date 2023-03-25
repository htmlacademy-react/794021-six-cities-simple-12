import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './components/app/app';
import { userLogin, } from 'src/mocks/mocks';
import { offers, offersCount, nearbyOffers } from 'src/mocks/offers';
import { reviews } from 'src/mocks/reviews';
import { CityNames } from 'src/consts/consts';
import { Offers } from 'src/types/types';
import { store } from 'src/store/index';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App
        cityNames={CityNames}
        getNearbyOffers={getNearbyOffers}
        offers={offers}
        offersCount={offersCount}
        reviews={reviews}
        userLogin={userLogin}
      />
    </Provider>
  </React.StrictMode>,
);

// FIXME
function getNearbyOffers(id: number): Offers {
  return nearbyOffers;
}
