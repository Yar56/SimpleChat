import React from 'react';
import { useSelector } from 'react-redux';

const MessagesTitle = () => {
  const activeFeed = useSelector((state) => state.channelsInfo.currentChannelId);
  return (
    <div>
      {activeFeed}
    </div>
  );
};
export default MessagesTitle;
