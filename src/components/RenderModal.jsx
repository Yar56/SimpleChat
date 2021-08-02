import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import modalSelection from '../features/modals/modalSelection.js';
import { closeModal, selectModalState } from '../features/modals/modalsSlice.js';

const RenderModal = () => {
  const dispatch = useDispatch();
  const onHide = () => dispatch(closeModal());
  const { isOpened, type } = useSelector(selectModalState);

  const Component = modalSelection(type);

  return type !== null ? (
    <Component
      isOpened={isOpened}
      onHide={onHide}
    />
  ) : null;
};
export default RenderModal;
