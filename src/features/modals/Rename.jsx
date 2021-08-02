import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  Modal, FormGroup, FormControl, Button, Form,
} from 'react-bootstrap';

import { useFormik } from 'formik';
import validateChannelName from '../../components/validateChannelName.js';
import useSocket from '../../hooks/useSocket.js';
import { selectModalState } from './modalsSlice.js';
import { selectChannelById, selectAllChannels } from '../channels/channelsSlice.js';
import withTimeout from '../../utils/withTimeout.js';

const Rename = ({ isOpened, onHide }) => {
  const { t } = useTranslation();
  const inputRef = useRef();
  const allChannels = useSelector(selectAllChannels);

  const [isDisabled, setIsDisabled] = useState(false);
  const socket = useSocket();
  const { extra: { channelId } } = useSelector(selectModalState);

  const activeChannel = useSelector(selectChannelById);

  const validate = validateChannelName(allChannels, t);

  const f = useFormik({
    initialValues: { body: '' },
    validationSchema: validate,
    onSubmit: ({ body }, { setSubmitting }) => {
      setSubmitting(true);
      setIsDisabled(true);

      const channelName = { id: channelId, name: body };
      const timeout = withTimeout(() => {
        setTimeout(() => {
          onHide();
        }, 200);
      }, () => {
        setIsDisabled(false);
        inputRef.current.select();
      }, 2000);
      socket.changeChannelName(channelName, timeout);

      setSubmitting(false);
    },
    validateOnChange: false,
    validateOnBlur: false,
  });

  useEffect(() => {
    f.values.body = activeChannel.name;
    inputRef.current.value = activeChannel.name;
    inputRef.current.select();
  }, [activeChannel.name]);

  return (
    <Modal dialogAs={Modal.Dialog} show={isOpened} centered onHide={onHide}>
      <Modal.Header>
        <Modal.Title>{t('modals.renameChannel')}</Modal.Title>
        <button onClick={onHide} aria-label="Close" data-bs-dismiss="modal" type="button" className="btn btn-close" />
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={f.handleSubmit}>
          <FormGroup>
            <FormControl
              required
              ref={inputRef}
              onChange={f.handleChange}
              value={f.values.body}
              data-testid="rename-channel"
              name="body"
              className="mb-2"
              isInvalid={!!f.errors.body}
              disabled={isDisabled}
            />
            <Form.Control.Feedback type="invalid">{f.errors.body}</Form.Control.Feedback>
            <div className="d-flex justify-content-end">
              <Button onClick={onHide} type="button" variant="secondary" className="me-2">
                {t('modals.buttons.cancel')}
              </Button>
              <Button type="submit" variant="primary">
                {t('modals.buttons.send')}
              </Button>
            </div>
          </FormGroup>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Rename;
