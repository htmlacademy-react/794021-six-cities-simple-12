import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { offers, offersCount, city } from 'src/store/mock';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <App
      city={city}
      offers={offers}
      offersCount={offersCount}
    />
  </React.StrictMode>,
);
