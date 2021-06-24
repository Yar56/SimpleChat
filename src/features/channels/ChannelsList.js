import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';
import { selectAllChannels, selectActiveChannelId, fetchChannels } from './channelsSlice.js';
import useAuth from '../../hooks/index.js';
// import routes from '../../routes.js';

const ChannelsList = () => {
  const channels = useSelector(selectAllChannels);
  const activeChannelId = useSelector(selectActiveChannelId);
  const auth = useAuth();

  const dispath = useDispatch();
  const { token } = auth.getAuthHeader();
  // const channelsPath = routes.channelsPath();

  useEffect(() => {
    dispath(fetchChannels(token));
  }, []);

  const renderChannels = channels.map((channel) => {
    const style = classNames('w-100 px-4 rounded-0 text-start btn', {
      'btn-secondary': (channel.id === activeChannelId),
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
