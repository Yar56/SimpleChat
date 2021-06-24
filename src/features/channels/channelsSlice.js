import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const channelsSlice = createSlice({
  name: 'channelsInfo/channels',
  initialState: null,
  reducers: {
    channelAdded: {
      reducer(state, action) {
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
});

export const { feedAdded } = channelsSlice.actions;

export default channelsSlice.reducer;

export const selectAllChannels = (state) => state.channelsInfo.channels;
export const selectActiveChannelId = (state) => state.channelsInfo.currentChannelId;
export const selectChannelById = (state, channelId) => state.channelsInfo
  .channels.find((channel) => channel.id === channelId);

export const fetchChannels = createAsyncThunk('channels/fetchChannels', async (token) => {
  const response = await axios.get('/api/v1/data', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(response.data);
  // return response.channels;
});
