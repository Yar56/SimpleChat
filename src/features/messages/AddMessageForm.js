import React, { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import {
  Button, Form, InputGroup, FormControl,
} from 'react-bootstrap';
import { ArrowRightSquare } from 'react-bootstrap-icons';
import { useDispatch } from 'react-redux';
import useSocket from '../../hooks/useSocket/index.js';
import useAuth from '../../hooks/useAuth/index.js';
import { addMessage } from './messagesSlice.js';

const withTimeout = (onSuccess, onTimeout, timeout) => {
  // eslint-disable-next-line functional/no-let
  let called = false;

  const timer = setTimeout(() => {
    if (called) return;
    called = true;
    onTimeout();
  }, timeout);

  return (...args) => {
    if (called) return;
    called = true;
    clearTimeout(timer);
    // eslint-disable-next-line functional/no-this-expression
    onSuccess.apply(this, args);
  };
};

const AddMessageForm = () => {
  const dispatch = useDispatch();
  const [isSending, setIsSending] = useState(false);
  const socket = useSocket();
  const { user: { username } } = useAuth();
  const input = useRef();

  useEffect(() => {
    setTimeout(() => {
      setIsSending(false);
    }, 100);
    input.current.focus();
  }, [isSending]);

  useEffect(() => {
    input.current.focus();
    socket.on('newMessage', (message) => {
      // console.log(message);
      dispatch(addMessage(message));
    });
    return () => socket.off('newMessage');
  }, []);

  const formik = useFormik({
    initialValues: {
      message: '',
    },
    onSubmit: ({ message }) => {
      socket.volatile.emit('newMessage', { body: message, channelId: 1, username }, withTimeout(() => {
        setIsSending(true);
        formik.resetForm();
        input.current.focus();
        console.log('success!');
      }, () => {
        setIsSending(true);
        input.current.focus();
        console.log('timeout!');
      }, 2000));
    },
    onChange: (values) => {
      console.log(values);
    },
  });

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
            disabled={isSending}
          />
          <InputGroup.Append>
            <Button type="submit" variant="btn btn-group-vertical" disabled={!formik.isValid || !formik.dirty}>
              <ArrowRightSquare size={20} fill="currentColor" />
            </Button>
          </InputGroup.Append>
        </InputGroup>
      </Form>
    </div>
  );
};
export default AddMessageForm;
