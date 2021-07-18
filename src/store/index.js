import { configureStore } from '@reduxjs/toolkit';
import channelsReducer from '../features/channels/channelsSlice.js';
import messagesReducer from '../features/messages/messagesSlice.js';
import modalsReducer from '../features/modals/modalsSlice.js';

export default (preloadedState = {}) => {
  const store = configureStore({
    reducer: {
      channelsInfo: channelsReducer,
      messagesInfo: messagesReducer,
      modal: modalsReducer,
    },
    preloadedState,
  });

  return store;
};
