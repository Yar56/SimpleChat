import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import {
  Button, Form, InputGroup, FormControl,
} from 'react-bootstrap';
import { ArrowRightSquare } from 'react-bootstrap-icons';
import { useSelector } from 'react-redux';
import useSocket from '../../hooks/useSocket/index.js';
import useAuth from '../../hooks/useAuth/index.js';
import { selectActiveChannelId } from '../channels/channelsSlice.js';
import withTimeout from '../../utils/withTimeout.js';

const AddMessageForm = () => {
  const socket = useSocket();
  const { username } = useAuth();
  const input = useRef();
  const currentChannelId = useSelector(selectActiveChannelId);

  const formik = useFormik({
    initialValues: {
      message: '',
    },
    onSubmit: ({ message }, { setSubmitting }) => {
      setSubmitting(true);
      socket.volatile.emit('newMessage', { body: message, channelId: currentChannelId, username }, withTimeout(() => {
        formik.resetForm();
        input.current.focus();
      }, () => {
        input.current.focus();
        console.log('timeout!');
      }, 2000));
      setSubmitting(false);
    },
    onChange: (values) => {
      console.log(values);
    },
  });
  useEffect(() => {
    input.current.focus();
  }, []);

  return (
    <div className="mt-auto px-5 py-3">
      <Form noValidate className="py-1 border rounded-2" onSubmit={formik.handleSubmit}>
        <InputGroup>
          <FormControl
            onChange={formik.handleChange}
            value={formik.values.message}
            placeholder="Введите сообщение..."
            name="message"
            className="border-0 p-0 ps-2"
            ref={input}
            data-testid="new-message"
          />
          <InputGroup.Append>
            <Button type="submit" variant="group-vertical" disabled={!formik.isValid || !formik.dirty}>
              <ArrowRightSquare size={20} fill="currentColor" />
              <span className="visually-hidden">Отправить</span>
            </Button>
          </InputGroup.Append>
        </InputGroup>
      </Form>
    </div>
  );
};
export default AddMessageForm;
