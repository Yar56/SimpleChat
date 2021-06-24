import { createSlice } from '@reduxjs/toolkit';

// const initialState = [
//   { id: 1, name: 'general', removable: false },
//   { id: 2, title: 'Second Post', removable: false },
// ];

const messagesSlice = createSlice({
  name: 'messagesInfo/messages',
  initialState: null,
  reducers: {
    messageAdded(state, action) {
      state.push(action.payload);
    },
  },
});

export const { messageAdded } = messagesSlice.actions;

export default messagesSlice.reducer;
