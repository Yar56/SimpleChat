/* eslint-disable no-param-reassign */

import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../../api/routes.js';

export const setInitialState = createAsyncThunk('channelsInfo/setInitialState', async (token) => {
  const response = await axios.get(routes.dataPath(), {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
});

const initialState = {
  channels: [],
  currentChannelId: null,
};

const channelsSlice = createSlice({
  name: 'channelsInfo',
  initialState,
  reducers: {
    setActiveChannel(state, { payload: { id } }) {
      state.currentChannelId = id;
    },
    addChannel(state, { payload }) {
      state.channels = state.channels.concat(payload);
    },
    removeChannel(state, { payload: { channelId } }) {
      state.channels = state.channels.filter((channel) => channel.id !== channelId);
    },
    renameChannel(state, { payload }) {
      state.channels[state.channels
        .findIndex((channel) => channel.id === payload.id)].name = payload.name;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setInitialState.fulfilled, (state, { payload }) => {
      state.channels = [];
      state.currentChannelId = null;
      state.currentChannelId = payload.currentChannelId;
      state.channels = state.channels.concat(payload.channels);
    });
  },
});

export const {
  setActiveChannel, addChannel, removeChannel, renameChannel,
} = channelsSlice.actions;

export default channelsSlice.reducer;

export const selectAllChannels = (state) => state.channelsInfo.channels;
export const selectActiveChannelId = (state) => state.channelsInfo.currentChannelId;

export const selectChannelById = createSelector(
  [selectAllChannels, selectActiveChannelId],
  (channels, activeChannel) => channels.find((channel) => channel.id === activeChannel),
);
