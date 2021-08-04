import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  Modal, Button,
} from 'react-bootstrap';
import useSocket from '../../hooks/useSocket.js';

import { selectModalState } from './modalsSlice.js';

const Remove = ({ isOpened, onHide }) => {
  const { t } = useTranslation();
  const [isDisabledButton, setIsDisabledButton] = useState(false);

  const socket = useSocket();
  const { extra: { channelId } } = useSelector(selectModalState);

  const handleDeleteChannel = (id) => async () => {
    setIsDisabledButton(true);

    const chnlId = { id };
    try {
      await socket.deleteChannel(chnlId);
      onHide();
    } catch (e) {
      setIsDisabledButton(false);
      console.error(e);
    }
  };

  return (
    <Modal dialogAs={Modal.Dialog} show={isOpened} centered onHide={onHide}>
      <Modal.Header>
        <Modal.Title>{t('modals.removeChannel.remove')}</Modal.Title>
        <button onClick={onHide} aria-label="Close" data-bs-dismiss="modal" type="button" className="btn btn-close" />
      </Modal.Header>

      <Modal.Body>
        <p className="lead">{t('modals.removeChannel.isSure')}</p>
        <div className="d-flex justify-content-end">
          <Button onClick={onHide} type="button" variant="secondary" className="me-2" disabled={isDisabledButton}>
            {t('modals.buttons.cancel')}
          </Button>
          <Button onClick={handleDeleteChannel(channelId)} type="button" variant="danger" disabled={isDisabledButton}>
            {t('modals.buttons.remove')}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default Remove;
