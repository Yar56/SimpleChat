import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from 'react-bootstrap/Spinner';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { setInitialState, selectAllChannels, channelsStatus } from '../features/channels/channelsSlice.js';
import useAuth from '../hooks/useAuth/index.js';

import getModal from '../features/modals/index.js';
import { selectModalType, selectIsOpenedModal, closeModal } from '../features/modals/modalsSlice.js';

import FeedsList from '../features/channels/ChannelsList.jsx';
import MessagesTitle from '../features/messages/MessagesTitle.jsx';
import MessagesBox from '../features/messages/MessagesBox.jsx';
import AddMessageForm from '../features/messages/AddMessageForm.jsx';

const ChatContainer = () => {
  const { getInitialAuth } = useAuth();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { token } = getInitialAuth();
  const allChannels = useSelector(selectAllChannels);
  const status = useSelector(channelsStatus);
  const isOpened = useSelector(selectIsOpenedModal);
  const typeModal = useSelector(selectModalType);

  const renderModal = (isOpen, type) => {
    if (!isOpen) {
      return null;
    }
    const onHide = () => dispatch(closeModal());

    const validateChannelName = (channels) => {
      const errorLenght = t('modals.errors.channeNamelLength');
      const blackListNames = channels.map((channel) => channel.name);
      return () => {
        const res = yup.object().shape({
          body: yup.string().min(3, errorLenght).max(20, errorLenght).notOneOf(blackListNames, t('modals.errors.uniqChannelName')),
        });
        return res;
      };
    };

    const Component = getModal(type);
    return (
      <Component
        isOpened={isOpened}
        onHide={onHide}
        validateChannelName={validateChannelName}
        allChannels={allChannels}
      />
    );
  };

  useEffect(() => {
    dispatch(setInitialState(token));
  }, [dispatch, token]);

  if (status === 'loading') {
    return (
      <div className="h-100 d-flex justify-content-center align-items-center">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }
  if (status === 'succeeded') {
    return (
      <>
        <div className="container h-100 my-4 overflow-hidden rounded shadow">
          <div className="row h-100 bg-white flex-md-row">
            <div className="col-12 col-md-2 border-end pt-5 px-0 bg-light">
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
        {renderModal(isOpened, typeModal)}
      </>
    );
  }
  return null;
};
export default ChatContainer;
