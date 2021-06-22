import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import channelsReducer from '../features/channels/channelsSlice.js';
import messagesReducer from '../features/messages/messagesSlice.js';
import currentChannelIdReducer from './currentChannelIdSlice.js';

const reducer = combineReducers({
  channelsInfo: combineReducers({
    channels: channelsReducer,
    currentChannelId: currentChannelIdReducer,
  }),
  messagesInfo: messagesReducer,
});

const preloadedState = {
  channelsInfo: {
    channels: [
      { id: 1, name: 'general', removable: false },
      { id: 2, name: 'random', removable: false },
    ],
    currentChannelId: 1,
  },
  messagesInfo: {
    messages: [
      { feedId: 1, name: 'ha' },
      { feedId: 1, name: 'hi' },
    ],
  },
};

export default configureStore({
  reducer,
  devTools: process.env.NODE_ENV !== 'production',
  preloadedState,
});
