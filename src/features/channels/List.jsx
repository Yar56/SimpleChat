import React from 'react';

import { useSelector } from 'react-redux';
import { Nav } from 'react-bootstrap';
import {
  selectAllChannels,
  selectActiveChannelId,
} from './channelsSlice.js';
import ListItem from './ListItem.jsx';

const List = () => {
  const channels = useSelector(selectAllChannels);
  const activeChannelId = useSelector(selectActiveChannelId);

  return (
    <Nav as="ul" fill variant="pills" className="flex-column px-2">
      {channels.map((channel) => (
        <ListItem
          key={channel.id}
          name={channel.name}
          removable={channel.removable}
          channelId={channel.id}
          activeChannelId={activeChannelId}
        />
      ))}
    </Nav>
  );
};
export default List;
