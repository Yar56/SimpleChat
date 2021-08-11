import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import modalSelection from './modalSelection.js';
import { closeModal, selectModalState } from './modalsSlice.js';

const RenderModal = () => {
  const dispatch = useDispatch();
  const onHide = () => dispatch(closeModal());
  const { isOpened, type } = useSelector(selectModalState);

  const Component = modalSelection(type);

  if (type !== null) {
    return (
      <Component
        isOpened={isOpened}
        onHide={onHide}
      />
    );
  }
  return null;
};
export default RenderModal;
