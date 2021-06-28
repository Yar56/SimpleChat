import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import {
  Button, Form, InputGroup, FormControl,
} from 'react-bootstrap';
import { ArrowRightSquare } from 'react-bootstrap-icons';
import { useDispatch } from 'react-redux';
import useSocket from '../../hooks/useSocket/index.js';

import { addMessage } from './messagesSlice.js';

const AddMessageForm = () => {
  const dispatch = useDispatch();

  const socket = useSocket();

  const input = useRef();

  useEffect(() => {
    socket.on('newMessage', (message) => {
      console.log(message);
      dispatch(addMessage(message));
    });
  }, []);
  useEffect(() => {
    input.current.focus();
  });
  const formik = useFormik({
    initialValues: {
      message: '',
    },
    onSubmit: (values) => {
      formik.resetForm();
      socket.emit('newMessage', { body: values.message, channelId: 1, username: 'admin' }, (res) => {
        console.log(res);
      });
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
