import React, { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import {
  Button, Form, InputGroup, FormControl,
} from 'react-bootstrap';
import { ArrowRightSquare } from 'react-bootstrap-icons';
import { useSelector } from 'react-redux';
import useSocket from '../../hooks/useSocket/index.js';
import useAuth from '../../hooks/useAuth/index.js';
// import { addMessage } from './messagesSlice.js';
import { selectActiveChannelId } from '../channels/channelsSlice.js';
import withTimeout from '../../utils/withTimeout.js';

// const withTimeout = (onSuccess, onTimeout, timeout) => {
//   // eslint-disable-next-line functional/no-let
//   let called = false;

//   const timer = setTimeout(() => {
//     if (called) return;
//     called = true;
//     onTimeout();
//   }, timeout);

//   return (...args) => {
//     if (called) return;
//     called = true;
//     clearTimeout(timer);
//     // eslint-disable-next-line functional/no-this-expression
//     onSuccess.apply(this, args);
//   };
// };

const AddMessageForm = () => {
  // const dispatch = useDispatch();
  const [isSending, setIsSending] = useState(false);
  const socket = useSocket();
  const auth = useAuth();
  const { username } = auth.getAuthData();
  const input = useRef();
  const currentChannelId = useSelector(selectActiveChannelId);
  useEffect(() => {
    setTimeout(() => {
      setIsSending(false);
    }, 100);
    input.current.focus();
  }, [isSending]);

  // useEffect(() => {
  //   input.current.focus();
  //   socket.on('newMessage', (message) => {
  //     // console.log(message);
  //     dispatch(addMessage(message));
  //   });
  //   return () => socket.off('newMessage');
  // }, [socket]);

  const formik = useFormik({
    initialValues: {
      message: '',
    },
    onSubmit: ({ message }) => {
      socket.volatile.emit('newMessage', { body: message, channelId: currentChannelId, username }, withTimeout(() => {
        setIsSending(true);
        formik.resetForm();
        input.current.focus();
        // console.log('success!');
      }, () => {
        // TODO: Нужно блокировать input на 2 сек
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
