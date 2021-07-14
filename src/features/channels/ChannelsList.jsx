import React, { } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';
import {
  Nav, Button, ButtonGroup, Dropdown,
} from 'react-bootstrap';
import { PlusSquare } from 'react-bootstrap-icons';

import {
  selectAllChannels,
  selectActiveChannelId,
  setActiveChannel,
  // removeChannel,
  // renameChannel,
  // addChannel,
} from './channelsSlice.js';

import { openModal } from '../modals/modalsSlice.js';
// import useSocket from '../../hooks/useSocket/index.js';

const ChannelsList = () => {
  const channels = useSelector(selectAllChannels);
  const activeChannelId = useSelector(selectActiveChannelId);
  const dispatch = useDispatch();
  // const socket = useSocket();

  const handleChangeChannel = (id) => (e) => {
    // FIXME: нужно чтобы при нажатии удаления канала он не переключался
    if (e.target.id) {
      console.log('dropdown!');
      return;
    }
    if (!e.target.id) {
      dispatch(setActiveChannel({ id }));
    }
  };

  // useEffect(() => {
  //   socket.on('newChannel', (data) => {
  //     dispatch(setActiveChannel({ id: data.id }));
  //     dispatch(addChannel(data));
  //   });
  //   return () => socket.off('removeChannel');
  // }, []);

  // useEffect(() => {
  //   socket.on('removeChannel', ({ id: channelId }) => {
  //     dispatch(removeChannel({ channelId }));
  //     // TODO: подумать над дефолтным id
  //     dispatch(setActiveChannel({ id: 1 }));
  //   });
  //   return () => socket.off('removeChannel');
  // }, []);

  // useEffect(() => {
  //   socket.on('renameChannel', (response) => {
  //     dispatch(renameChannel({ id: response.id, name: response.name }));
  //   });
  //   return () => socket.off('renameChannel');
  // }, []);

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
          <Dropdown.Item
            active={false}
            href="#"
            onClick={() => dispatch(openModal({ type: 'removeChannel', extra: { channelId: channel.id } }))}
          >
            Удалить
          </Dropdown.Item>
          <Dropdown.Item
            active={false}
            href="#"
            onClick={() => dispatch(openModal({ type: 'renameChannel', extra: { channelId: channel.id } }))}
          >
            Переименовать
          </Dropdown.Item>
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
    <>
      <div className="d-flex justify-content-between mb-2 px-4 pe-2">
        <span>Каналы</span>
        <button type="button" className="p-0 text-primary btn btn-group-vertical" onClick={() => dispatch(openModal({ type: 'addChannel' }))}>
          <PlusSquare size={20} />
          <span className="visually-hidden">+</span>
        </button>
      </div>
      <Nav as="ul" fill variant="pills" className="flex-column px-2">
        {renderChannels}
      </Nav>
    </>
  );
};

export default ChannelsList;
