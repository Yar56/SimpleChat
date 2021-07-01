import { configureStore } from '@reduxjs/toolkit';
import channelsReducer from '../features/channels/channelsSlice.js';
import messagesReducer from '../features/messages/messagesSlice.js';
import modalsReducer from '../features/modals/modalsSlice.js';

const reducer = {
  channelsInfo: channelsReducer,
  messagesInfo: messagesReducer,
  modal: modalsReducer,
};

export default configureStore({
  reducer,
  devTools: process.env.NODE_ENV !== 'production',
});
