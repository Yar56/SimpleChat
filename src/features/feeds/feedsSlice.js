import { createSlice } from '@reduxjs/toolkit';

const feedsSlice = createSlice({
  name: 'feeds',
  initialState: null,
  reducers: {
    feedAdded(state, action) {
      state.push(action.payload);
    },
  },
});

export const { feedAdded } = feedsSlice.actions;

export default feedsSlice.reducer;
