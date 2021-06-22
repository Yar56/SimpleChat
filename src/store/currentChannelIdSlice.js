import { createSlice } from '@reduxjs/toolkit';

const currentChannelIdSlice = createSlice({
  name: 'channels',
  initialState: null,
  reducers: {
    setCurrentChannelId: (action) => action.payload,
  },
});

export const { setCurrentChannelId } = currentChannelIdSlice.actions;

export default currentChannelIdSlice.reducer;
