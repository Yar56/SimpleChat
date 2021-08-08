import React from 'react';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';
import {
  Button, ButtonGroup, Dropdown, Nav,
} from 'react-bootstrap';
import {
  setActiveChannel,
} from './channelsSlice.js';
import { openModal } from '../modals/modalsSlice.js';

const ListItem = ({
  channelId, removable, name, activeChannelId,
}) => {
  const dispatch = useDispatch();

  const createButton = (channelName, style) => (
    <Button type="button" variant="" className={style}>
      <span className="me-1">#</span>
      {channelName}
    </Button>
  );

  const handleChangeChannel = (id) => (e) => {
    if (e.target.id) {
      return;
    }
    if (!e.target.id) {
      dispatch(setActiveChannel({ id }));
    }
  };

  const channelButtonStyle = classNames('w-100 rounded-0 shadow-none text-start', {
    'text-truncate': removable,
    'btn-secondary': (channelId === activeChannelId),
  });
  const toggleButtonStyle = classNames('flex-grow-0', {
    'btn-secondary': (channelId === activeChannelId),
  });
  const withDropDown = (
    <Dropdown as={ButtonGroup} className="d-flex">
      {createButton(name, channelButtonStyle)}

      <Dropdown.Toggle split variant="" id="dropdown-split-basic" className={toggleButtonStyle} />
      <Dropdown.Menu>
        <Dropdown.Item
          active={false}
          href="#"
          onClick={() => dispatch(openModal({ type: 'removeChannel', extra: { channelId } }))}
        >
          Удалить
        </Dropdown.Item>
        <Dropdown.Item
          active={false}
          href="#"
          onClick={() => dispatch(openModal({ type: 'renameChannel', extra: { channelId } }))}
        >
          Переименовать
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );

  const withoutDropDown = (
    <Button type="button" variant="" className={channelButtonStyle}>
      <span className="me-1">#</span>
      {name}
    </Button>
  );

  return (
    <Nav.Item as="li" className="w-100" key={channelId} onClick={handleChangeChannel(channelId)}>
      {removable === false ? withoutDropDown : withDropDown}
    </Nav.Item>
  );
};
export default ListItem;
