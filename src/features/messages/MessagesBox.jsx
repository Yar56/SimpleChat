import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { selectAllMessages, selectCurrentMessagesByChannel } from './messagesSlice.js';

const MessagesBox = () => {
  const messagesByCurrentChannel = useSelector(selectCurrentMessagesByChannel);

  const allMessages = useSelector(selectAllMessages);
  const messagesBox = useRef();

  useEffect(() => {
    messagesBox.current.scrollTop = messagesBox.current.scrollHeight;
  }, [allMessages, messagesByCurrentChannel]);

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
