import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { selectChannelById } from '../channels/channelsSlice.js';
import { selectMessagesCount } from './messagesSlice.js';

const MessagesTitle = () => {
  const { t } = useTranslation();
  const currentChannel = useSelector(selectChannelById);
  const messagesCount = useSelector(selectMessagesCount);

  if (!currentChannel) {
    return null;
  }
  return (
    <div className="bg-light mb-4 p-3 shadow-sm small">
      <p className="m-0">
        #
        {' '}
        <b>{currentChannel.name}</b>
      </p>
      <span className="text-muted">
        {t('messages.count', { count: messagesCount })}
      </span>
    </div>
  );
};
export default MessagesTitle;
