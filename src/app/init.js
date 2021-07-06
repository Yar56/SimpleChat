import React from 'react';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import { io } from 'socket.io-client';
import i18nInstance from './i18n.js';

import store from '../store/index.js';
import App from './App.jsx';

const init = () => {
  // eslint-disable-next-line new-cap
  const socket = new io();
  socket.on();
  const vdom = (

    <Provider store={store}>
      <I18nextProvider i18n={i18nInstance}>
        <App />
      </I18nextProvider>
    </Provider>

  );

  return vdom;
};
export default init;
