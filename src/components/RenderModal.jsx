import React from 'react';
import * as yup from 'yup';

import getModal from '../features/modals/index.js';

const RenderModal = ({
  isOpened,
  type,
  onHide,
  channels,
  t,
}) => {
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
      allChannels={channels}
    />
  );
};
export default RenderModal;
