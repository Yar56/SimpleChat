import React from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';

const ChannelsList = () => {
  const channels = useSelector((state) => state.channelsInfo.channels);
  const activeFeed = useSelector((state) => state.channelsInfo.currentChannelId);

  const renderChannels = channels.map((channel) => {
    const style = classNames('w-100 px-4 rounded-0 text-start btn', {
      'btn-secondary': (channel.id === activeFeed),
    });
    return (
      <li className="nav-item" key={channel.id}>
        <button type="button" className={style}>
          <span className="me-1">#</span>
          {channel.name}
        </button>
      </li>
    );
  });

  return (
    <ul className="nav flex-column nav-pills nav-fill">
      {renderChannels}
    </ul>
  );
};

export default ChannelsList;
