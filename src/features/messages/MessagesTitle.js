import React from 'react';
import { useSelector } from 'react-redux';
import { selectActiveChannelId, selectChannelById } from '../channels/channelsSlice.js';

const MessagesTitle = () => {
  const activeChannelId = useSelector(selectActiveChannelId);

  const currentChannel = useSelector((state) => selectChannelById(state, activeChannelId));

  // TODO: cделать селектор в messagesSlice если он будет использоватся
  // где то еще, иначе оставить так
  const messagesCount = useSelector((state) => state.messagesInfo.messages
    .filter((message) => message.channelId === activeChannelId)).length;

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
        {messagesCount}
        {' '}
        сообщение
      </span>
    </div>
  );
};
export default MessagesTitle;
