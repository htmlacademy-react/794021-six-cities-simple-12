import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './components/app/app';
import { CityNames } from 'src/consts/consts';
import { store } from 'src/store/index';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App
        cityNames={CityNames}
      />
    </Provider>
  </React.StrictMode>,
);
