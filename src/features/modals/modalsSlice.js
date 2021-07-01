import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpened: false,
  type: null,
  extra: null,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal(state, action) {
      state.isOpened = true;
      state.type = action.payload.type;
    },
    closeModal(state) {
      state.isOpened = false;
      state.type = null;
    },
  },
  extraReducers: () => {
    // builder.addCase(setInitialState.pending, (state) => {
    //   state.status = 'loading';
    // });
    // builder.addCase(setInitialState.fulfilled, (state, action) => {
    //   state.status = 'succeeded';
    //   state.channels = [];
    //   state.currentChannelId = null;
    //   state.currentChannelId = action.payload.currentChannelId;
    //   state.channels = state.channels.concat(action.payload.channels);
    // });
  },
});

export default modalSlice.reducer;

export const { openModal, closeModal } = modalSlice.actions;
// рендирить модал будем от type который возьмем селектором

export const selectModalType = (state) => state.modal.type;
export const selectIsOpenedModal = (state) => state.modal.isOpened;
