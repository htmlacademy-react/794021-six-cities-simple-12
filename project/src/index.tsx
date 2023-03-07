import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import {
  cities, offers, offersCount, currentCity, reviews, userLogin,
} from 'src/store/mock';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <App
      currentCity={currentCity}
      cities={cities}
      offers={offers}
      offersCount={offersCount}
      reviews={reviews}
      userLogin={userLogin}
    />
  </React.StrictMode>,
);
