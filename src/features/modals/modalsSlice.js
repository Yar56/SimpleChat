/* eslint-disable no-param-reassign */

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
      state.extra = action.payload.extra || null;
    },
    closeModal(state) {
      state.isOpened = false;
      state.type = null;
    },
  },
  extraReducers: () => {
  },
});

export default modalSlice.reducer;

export const { openModal, closeModal } = modalSlice.actions;

// export const selectModalType = (state) => state.modal.type;
// export const selectIsOpenedModal = (state) => state.modal.isOpened;
export const selectModalState = (state) => state.modal;
// export const selectExtraModal = (state) => state.modal.extra;
