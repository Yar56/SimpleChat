import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from 'react-bootstrap/Spinner';
import { setInitialState } from '../features/channels/channelsSlice.js';
import useAuth from '../hooks/index.js';
// import { selectAllChannels } from '../features/channels/channelsSlice.js';

import AddFeedButton from '../features/channels/AddChannelButton.js';
import FeedsList from '../features/channels/ChannelsList.js';
import MessagesTitle from '../features/messages/MessagesTitle.js';
import MessagesBox from '../features/messages/MessagesBox.js';
import AddMessageForm from '../features/messages/AddMessageForm.js';

const ChatContainer = () => {
  const auth = useAuth();

  const dispath = useDispatch();
  const { token } = auth.getAuthHeader();

  const channelsStatus = useSelector((state) => state.channelsInfo.status);

  useEffect(() => {
    dispath(setInitialState(token));
  }, []);

  if (channelsStatus === 'loading') {
    return (
      <div className="h-100 d-flex justify-content-center align-items-center">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }
  if (channelsStatus === 'succeeded') {
    return (
      <div className="container h-100 my-4 overflow-hidden rounded shadow">
        <div className="row h-100 bg-white flex-md-row">
          <div className="col-12 col-md-2 border-end pt-5 px-0 bg-light">
            <AddFeedButton />
            <FeedsList />
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
    );
  }
  return null;
};
export default ChatContainer;
