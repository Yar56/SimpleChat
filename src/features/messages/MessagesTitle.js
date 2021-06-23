import React from 'react';
import { useSelector } from 'react-redux';

const MessagesTitle = () => {
  const currentChannelId = useSelector((state) => state.channelsInfo.currentChannelId);
  const [currentChannel] = useSelector((state) => state.channelsInfo.channels
    .filter((channel) => channel.id === currentChannelId));

  const messagesCount = useSelector((state) => state.messagesInfo.messages
    .filter((message) => message.channelId === currentChannelId)).length;

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
