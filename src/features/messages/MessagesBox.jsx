import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { selectAllMessages } from './messagesSlice.js';
import { selectActiveChannelId } from '../channels/channelsSlice.js';

const MessagesBox = () => {
  const currentChannelId = useSelector(selectActiveChannelId);
  const messagesByCurrentChannel = useSelector((state) => state.messagesInfo.messages
    .filter((message) => message.channelId === currentChannelId));

  const allMessages = useSelector(selectAllMessages);
  const messagesBox = useRef();

  // if (!messagesByCurrentChannel) {
  //   return null;
  // }

  useEffect(() => {
    messagesBox.current.scrollTop = messagesBox.current.scrollHeight;
  }, [allMessages]);

  const renderMessages = messagesByCurrentChannel.map((message) => (
    <div className="text-break mb-2" key={message.id}>
      <b>{message.username}</b>
      {': '}
      {message.body}
    </div>
  ));
  return (
    <div id="messages-box" className="chat-messages overflow-auto px-5" ref={messagesBox}>
      {renderMessages}
    </div>
  );
};
export default MessagesBox;
