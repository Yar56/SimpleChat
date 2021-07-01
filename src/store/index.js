import { configureStore } from '@reduxjs/toolkit';
// import { combineReducers } from 'redux';
import channelsReducer from '../features/channels/channelsSlice.js';
import messagesReducer from '../features/messages/messagesSlice.js';
import modalsReducer from '../features/modals/modalsSlice.js';

// import currentChannelIdReducer from './currentChannelIdSlice.js';

// const reducer = combineReducers({
//   channelsInfo: combineReducers({
//     channels: channelsReducer,
//     currentChannelId: currentChannelIdReducer,
//   }),
//   messagesInfo: messagesReducer,
// });

const reducer = {
  channelsInfo: channelsReducer,
  messagesInfo: messagesReducer,
  modal: modalsReducer,
};

// const preloadedState = {
//   channelsInfo: {
//     channels: [
//       { id: 1, name: 'general', removable: false },
//       { id: 2, name: 'random', removable: false },
//     ],
//     currentChannelId: 1,
//     // status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed',
//     // error: null,
//   },
//   messagesInfo: {
//     messages: [
//       {
//         body: 'fake', channelId: 1, username: 'admin', id: 1,
//       },
//       // {
//       //   body: 'hi', channelId: 1, username: 'admin', id: 2,
//       // },
//       // {
//       //   body: 'hihul', channelId: 1, username: 'admin', id: 3,
//       // },
//       // {
//       //   body: 'hihul', channelId: 1, username: 'admin', id: 4,
//       // },
//       // {
//       //   body: 'hihul', channelId: 1, username: 'admin', id: 5,
//       // },
//       // {
//       //   body: 'hihul', channelId: 1, username: 'admin', id: 6,
//       // },
//       // {
//       //   body: 'hihul', channelId: 1, username: 'admin', id: 7,
//       // },
//       // {
//       //   body: 'hihul', channelId: 1, username: 'admin', id: 8,
//       // },
//       // {
//       //   body: 'hihul', channelId: 1, username: 'admin', id: 9,
//       // },
//     ],
//   },
// };

export default configureStore({
  reducer,
  devTools: process.env.NODE_ENV !== 'production',
  // preloadedState,
});
