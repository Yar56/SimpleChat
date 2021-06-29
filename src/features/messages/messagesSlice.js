import { createSlice } from '@reduxjs/toolkit';
import { setInitialState } from '../channels/channelsSlice.js';

const initialState = {
  messages: [],
};

const messagesSlice = createSlice({
  name: 'messagesInfo',
  initialState,
  reducers: {
    addMessage: {
      reducer(state, action) {
        // console.log(action.payload)
        state.messages.push(action.payload);
      },
      prepare({
        body, channelId, username, id,
      }) {
        return {
          payload: {
            body,
            channelId,
            username,
            id,
          },
        };
      },
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setInitialState.fulfilled, (state, action) => {
      state.messages = [];
      state.messages = state.messages.concat(action.payload.messages);
    });
  },
});

export const { addMessage } = messagesSlice.actions;

export default messagesSlice.reducer;

export const selectAllMessages = (state) => state.messagesInfo.messages;
