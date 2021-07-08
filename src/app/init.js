import React from 'react';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import { io } from 'socket.io-client';
import i18nInstance from './i18n.js';
import {
  setActiveChannel,
  removeChannel,
  renameChannel,
  addChannel,
} from '../features/channels/channelsSlice.js';
import { addMessage } from '../features/messages/messagesSlice.js';

import store from '../store/index.js';
import App from './App.jsx';

const init = () => {
  const socket = io();
  socket.on('newMessage', (message) => {
    store.dispatch(addMessage(message));
  });
  socket.on('newChannel', (data) => {
    store.dispatch(setActiveChannel({ id: data.id }));
    store.dispatch(addChannel(data));
  });
  socket.on('removeChannel', ({ id: channelId }) => {
    store.dispatch(removeChannel({ channelId }));
    // TODO: подумать над дефолтным id
    store.dispatch(setActiveChannel({ id: 1 }));
  });
  socket.on('renameChannel', (response) => {
    store.dispatch(renameChannel({ id: response.id, name: response.name }));
  });

  const vdom = (

    <Provider store={store}>
      <I18nextProvider i18n={i18nInstance}>
        <App socket={socket} />
      </I18nextProvider>
    </Provider>

  );

  return vdom;
};
export default init;
