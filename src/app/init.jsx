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
import withTimeout from '../utils/withTimeout.js';

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

  const newMessage = (msg) => {
    socket.volatile.emit('newMessage', msg, (response) => {
      withTimeout(2000, response).then((res) => console.log(res));
    });
  };
  const newChannel = (channel) => {
    socket.volatile.emit('newChannel', channel);
  };

  const deleteChannel = (id) => {
    socket.volatile.emit('removeChannel', id);
  };
  const changeChannelName = (name) => {
    socket.volatile.emit('renameChannel', name);
  };

  const vdom = (
    <Provider store={store}>
      <I18nextProvider i18n={i18nInstance}>
        <SocketProvider
          newMessage={newMessage}
          newChannel={newChannel}
          deleteChannel={deleteChannel}
          changeChannelName={changeChannelName}
        >
          <App />
        </SocketProvider>
      </I18nextProvider>
    </Provider>

  );

  return vdom;
};
export default init;
