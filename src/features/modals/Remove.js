import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import {
  Modal, Button,
} from 'react-bootstrap';
import useSocket from '../../hooks/useSocket/index.js';

import { selectExtraModal } from './modalsSlice.js';
import withTimeout from '../../utils/withTimeout.js';

const Remove = (props) => {
  const { onHide, isOpened } = props;
  const [isDisabledButton, setIsDisabledButton] = useState(false);

  const socket = useSocket();
  const removedСhannelId = useSelector(selectExtraModal);

  const handleDeleteChannel = (id) => () => {
    setIsDisabledButton(true);
    const { channelId } = id;
    socket.volatile.emit('removeChannel', { id: channelId }, withTimeout(() => {
      console.log('success!');

      setTimeout(() => {
        onHide();
      }, 200);
    }, () => {
      setIsDisabledButton(false);
      console.log('timeout!');
    }, 2000));
  };

  return (
    <Modal dialogAs={Modal.Dialog} show={isOpened} centered onHide={onHide}>
      <Modal.Header>
        <Modal.Title>Удалить канал</Modal.Title>
        <button onClick={onHide} aria-label="Close" data-bs-dismiss="modal" type="button" className="btn btn-close" />
      </Modal.Header>

      <Modal.Body>
        <p className="lead">Уверены?</p>
        <div className="d-flex justify-content-end">
          <Button onClick={onHide} type="button" variant="secondary" className="me-2" disabled={isDisabledButton}>Отменить</Button>
          <Button onClick={handleDeleteChannel(removedСhannelId)} type="button" variant="danger" disabled={isDisabledButton}>Удалить</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default Remove;
