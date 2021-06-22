// @ts-check

import { configureStore } from '@reduxjs/toolkit';

import feedsReducer from '../features/feeds/feedsSlice.js';
import messagesReducer from '../features/messages/messagesSlice.js';
import currentChannelIdReducer from './currentChannelIdSlice.js';

const reducer = {
  feeds: feedsReducer,
  messages: messagesReducer,
  currentChannelId: currentChannelIdReducer,
};

const preloadedState = {
  feeds: [
    { id: 1, name: 'general', removable: false },
    { id: 2, name: 'random', removable: false },
  ],
  messages: [
    { feedId: 1, name: 'ha' },
    { feedId: 1, name: 'hi' },
  ],
  currentChannelId: 1,
};

export default configureStore({
  reducer,
  devTools: process.env.NODE_ENV !== 'production',
  preloadedState,
});
