import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';
import {
  Nav, Button, ButtonGroup, Dropdown,
} from 'react-bootstrap';
import { selectAllChannels, selectActiveChannelId, setActiveChannel } from './channelsSlice.js';
// import useAuth from '../../hooks/index.js';
// import routes from '../../routes.js';

const ChannelsList = () => {
  const channels = useSelector(selectAllChannels);
  const activeChannelId = useSelector(selectActiveChannelId);
  const dispatch = useDispatch();

  const handleChangeChannel = (id) => (e) => {
    if (e.target.id) {
      console.log('dropdown!');
      return;
    }
    dispatch(setActiveChannel({ id }));
  };

  const createButton = (channelName, style) => (
    <Button type="button" variant="" className={style}>
      <span className="me-1">#</span>
      {channelName}
    </Button>
  );

  const renderChannels = channels.map((channel) => {
    const channelButtonStyle = classNames('w-100 rounded-0 shadow-none text-start', {
      'text-truncate': channel.removable,
      'btn-secondary': (channel.id === activeChannelId),
    });
    const toggleButtonStyle = classNames('flex-grow-0', {
      'btn-secondary': (channel.id === activeChannelId),
    });
    const withDropDown = (
      <Dropdown as={ButtonGroup} className="d-flex">
        {createButton(channel.name, channelButtonStyle)}

        <Dropdown.Toggle split variant="" id="dropdown-split-basic" className={toggleButtonStyle} />
        <Dropdown.Menu>
          <Dropdown.Item href="#">Удалить</Dropdown.Item>
          <Dropdown.Item href="#">Переименовать</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
    const withoutDropDown = (
      <Button type="button" variant="" className={channelButtonStyle}>
        <span className="me-1">#</span>
        {channel.name}
      </Button>
    );

    return (
      <Nav.Item as="li" className="w-100" key={channel.id} onClick={handleChangeChannel(channel.id)}>
        {channel.removable === false ? withoutDropDown : withDropDown}
      </Nav.Item>
    );
  });

  return (
    <Nav as="ul" fill variant="pills" className="flex-column px-2">
      {renderChannels}
    </Nav>
  );
};

export default ChannelsList;
