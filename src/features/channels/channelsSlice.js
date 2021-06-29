import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const setInitialState = createAsyncThunk('channelsInfo/setInitialState', async (token) => {
  const response = await axios.get('/api/v1/data', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
});
const initialState = {
  channels: [],
  currentChannelId: null,
  status: 'idle',
  error: null,
};

const channelsSlice = createSlice({
  name: 'channelsInfo',
  initialState,
  reducers: {
    setActiveChannel(state, action) {
      // console.log(action.payload.id);
      state.currentChannelId = action.payload.id;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setInitialState.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(setInitialState.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.channels = [];
      state.currentChannelId = null;
      state.currentChannelId = action.payload.currentChannelId;
      state.channels = state.channels.concat(action.payload.channels);
    });
  },
});

export const { setActiveChannel } = channelsSlice.actions;

export default channelsSlice.reducer;

export const selectAllChannels = (state) => state.channelsInfo.channels;
export const selectActiveChannelId = (state) => state.channelsInfo.currentChannelId;
export const selectChannelById = (state, channelId) => state.channelsInfo
  .channels.find((channel) => channel.id === channelId);
