import React, { useLayoutEffect } from 'react';
import { useDispatch } from 'react-redux';
import Spinner from 'react-bootstrap/Spinner';
import { setInitialState } from '../features/channels/channelsSlice.js';
import useAuth from '../hooks/useAuth.js';
import { useThunkStatus } from '../store/fetchingStatesSlice.js';
import ChannelsList from '../features/channels/ChannelsList.jsx';
import MessagesTitle from '../features/messages/MessagesTitle.jsx';
import MessagesBox from '../features/messages/MessagesBox.jsx';
import AddMessageForm from '../features/messages/AddMessageForm.jsx';

const ChatContainer = () => {
  const { user: { token } } = useAuth();
  const dispatch = useDispatch();

  const statusThunk = useThunkStatus(setInitialState);

  useLayoutEffect(() => {
    dispatch(setInitialState(token));
  }, []);

  if (statusThunk.isPending) {
    return (
      <div className="h-100 d-flex justify-content-center align-items-center">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }
  if (statusThunk.isSuccess) {
    return (
      <>
        <div className="container h-100 my-4 overflow-hidden rounded shadow">
          <div className="row h-100 bg-white flex-md-row">
            <div className="col-12 col-md-2 border-end pt-5 px-0 bg-light">
              <ChannelsList />
            </div>
            <div className="col p-0 h-100">
              <div className="d-flex flex-column h-100">
                <MessagesTitle />
                <MessagesBox />
                <AddMessageForm />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
  return null;
};
export default ChatContainer;
