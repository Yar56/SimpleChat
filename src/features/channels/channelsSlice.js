import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
// import { messageAdded } from '../messages/messagesSlice.js';

export const setInitialState = createAsyncThunk('channelsInfo/setInitialState', async (token) => {
  const response = await axios.get('/api/v1/data', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  // console.log(response.data);
  return response.data;
});
const initialState = {
  channels: [
    { id: 1, name: 'fake', removable: false },
  ],
  currentChannelId: 1,
  status: 'idle',
  error: null,
};

const channelsSlice = createSlice({
  name: 'channelsInfo',
  initialState,
  reducers: {
    channelAdded: {
      reducer(state, action) {
        console.log(state);
        state.channels.push(action.payload);
      },
      prepare(name, removable) {
        return {
          payload: {
            id: nanoid(),
            name,
            removable,
          },
        };
      },
    },
  },
  extraReducers: {
    [setInitialState.pending]: (state) => {
      state.status = 'loading';
    },
    [setInitialState.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      // Add any fetched posts to the array

      state.channels = state.channels.concat(action.payload.channels);
      // TODO: сдедать добавление сообщений и currentChannel
      // messageAdded(action.payload.messages)
    },
    [setInitialState.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
  },
});

export const { feedAdded } = channelsSlice.actions;

export default channelsSlice.reducer;

export const selectAllChannels = (state) => state.channelsInfo.channels;
export const selectActiveChannelId = (state) => state.channelsInfo.currentChannelId;
export const selectChannelById = (state, channelId) => state.channelsInfo
  .channels.find((channel) => channel.id === channelId);
