import React from 'react';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';

import getModal from '../features/modals/index.js';
import { closeModal, selectModalState } from '../features/modals/modalsSlice.js';
import { selectAllChannels } from '../features/channels/channelsSlice.js';

const RenderModal = ({ t }) => {
  const dispatch = useDispatch();
  const onHide = () => dispatch(closeModal());
  const allChannels = useSelector(selectAllChannels);
  const { isOpened, type } = useSelector(selectModalState);

  if (!isOpened) {
    return null;
  }

  const validateChannelName = (currentChannels) => {
    const errorLenght = t('modals.errors.channeNamelLength');
    const blackListNames = currentChannels.map((channel) => channel.name);
    return () => {
      const res = yup.object().shape({
        body: yup.string().min(3, errorLenght).max(20, errorLenght).notOneOf(blackListNames, t('modals.errors.uniqChannelName')),
      });
      return res;
    };
  };

  const Component = getModal(type);
  return (
    <Component
      isOpened={isOpened}
      onHide={onHide}
      validateChannelName={validateChannelName}
      allChannels={allChannels}
    />
  );
};
export default RenderModal;
