import { createSlice, nanoid } from '@reduxjs/toolkit';
import { setInitialState } from '../channels/channelsSlice.js';

const initialState = {
  messages: [],
};

const messagesSlice = createSlice({
  name: 'messagesInfo',
  initialState,
  reducers: {
    messagesAdded: {
      reducer(state, action) {
        state.messages.push(action.payload);
      },
      prepare(body, channelId, username) {
        return {
          payload: {
            id: nanoid(),
            body,
            username,
            channelId,
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

export const { messageAdded } = messagesSlice.actions;

export default messagesSlice.reducer;
