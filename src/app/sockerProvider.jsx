import React from 'react';
import SocketContext from '../contexts/SocketContext';

const SocketProvider = ({
  newMessage, newChannel, deleteChannel, changeChannelName, children,
}) => (
  <SocketContext.Provider value={{
    newMessage, newChannel, deleteChannel, changeChannelName,
  }}
  >
    {children}
  </SocketContext.Provider>
);

export default SocketProvider;
