import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
  messages: [
    {
      body: 'f', channelId: 1, username: 'admin', id: 3,
    },
  ],
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
});

export const { messageAdded } = messagesSlice.actions;

export default messagesSlice.reducer;
