import { createSlice } from '@reduxjs/toolkit';

const channelsSlice = createSlice({
  name: 'channels',
  initialState: null,
  reducers: {
    channelAdded(state, action) {
      state.push(action.payload);
    },
  },
});

export const { feedAdded } = channelsSlice.actions;

export default channelsSlice.reducer;
