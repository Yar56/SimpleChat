import React from 'react';
import { Provider } from 'react-redux';

import store from '../store/index.js';
import App from './App.jsx';

const init = () => {
  // TODO: add i18next
  // const socket = io();
  // console.log(socket);
  const vdom = (
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  );

  return vdom;
};
export default init;
