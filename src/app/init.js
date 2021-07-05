import React from 'react';
import { Provider } from 'react-redux';
// import i18next from 'i18next';
import { I18nextProvider } from 'react-i18next';
// import ru from '../locales/ru.js';
import i18nInstance from './i18n.js';

import store from '../store/index.js';
import App from './App.jsx';

const init = () => {
  // const socket = io();
  // console.log(socket);

  // const i18nInstance = i18next.createInstance();
  // i18nInstance.use(initReactI18next)
  //   .init({
  //     lng: 'ru',
  //     resources: {
  //       ru,
  //     },
  //   });

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
