import React from 'react';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import getI18nInstance from './i18n.js';
import {
  setActiveChannel,
  removeChannel,
  renameChannel,
  addChannel,
} from '../features/channels/channelsSlice.js';
import { addMessage } from '../features/messages/messagesSlice.js';

import SocketProvider from './sockerProvider.jsx';
import createStore from '../store/index.js';
import App from './App.jsx';

const init = async (socket) => {
  const store = createStore();
  const i18nInstance = await getI18nInstance();

  socket.on('newMessage', (message) => {
    store.dispatch(addMessage(message));
  });
  socket.on('newChannel', (data) => {
    store.dispatch(setActiveChannel({ id: data.id }));
    store.dispatch(addChannel(data));
  });
  socket.on('removeChannel', ({ id: channelId }) => {
    store.dispatch(removeChannel({ channelId }));
    store.dispatch(setActiveChannel({ id: 1 }));
  });
  socket.on('renameChannel', (response) => {
    store.dispatch(renameChannel({ id: response.id, name: response.name }));
  });

  const withTimeout = (onSuccess, onTimeout, timeout) => {
    // eslint-disable-next-line functional/no-let
    let called = false;

    const timer = setTimeout(() => {
      if (called) return;
      called = true;
      onTimeout();
    }, timeout);

    return (...args) => {
      if (called) return;
      called = true;
      clearTimeout(timer);
      // eslint-disable-next-line functional/no-this-expression
      onSuccess.apply(this, args);
    };
  };

  const withAcknowledgement = (cb) => (msg) => new Promise((resolve, reject) => {
    cb(msg, withTimeout((response) => {
      resolve(response);
    }, () => {
      reject(new Error('Network Error'));
    }, 2000));
  });

  const api = {
    sendMessage: withAcknowledgement((...args) => socket.volatile.emit('newMessage', ...args)),
    createChannel: withAcknowledgement((...args) => socket.volatile.emit('newChannel', ...args)),
    renameChannel: withAcknowledgement((...args) => socket.volatile.emit('renameChannel', ...args)),
    removeChannel: withAcknowledgement((...args) => socket.volatile.emit('removeChannel', ...args)),
  };

  const vdom = (
    <Provider store={store}>
      <I18nextProvider i18n={i18nInstance}>
        <SocketProvider
          newMessage={api.sendMessage}
          newChannel={api.createChannel}
          deleteChannel={api.removeChannel}
          changeChannelName={api.renameChannel}
        >
          <App />
        </SocketProvider>
      </I18nextProvider>
    </Provider>

  );

  return vdom;
};
export default init;
