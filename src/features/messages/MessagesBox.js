import React from 'react';
import { useSelector } from 'react-redux';

const MessagesBox = () => {
  const currentChannelId = useSelector((state) => state.channelsInfo.currentChannelId);
  const messagesByCurrentChannel = useSelector((state) => state.messagesInfo.messages
    .filter((message) => message.channelId === currentChannelId));

  const renderMessages = messagesByCurrentChannel.map((message) => (
    <div className="text-break mb-2" key={message.id}>
      <b>{message.username}</b>
      {': '}
      {message.body}
    </div>
  ));
  return (
    <div id="messages-box" className="chat-messages overflow-auto px-5 ">
      {renderMessages}
    </div>
  );
};
export default MessagesBox;
