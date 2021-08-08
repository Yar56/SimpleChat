import React from 'react';
import { PlusSquare } from 'react-bootstrap-icons';
import { useDispatch } from 'react-redux';
import { openModal } from '../modals/modalsSlice.js';
import List from './List.jsx';

const ChannelsList = () => {
  const dispatch = useDispatch();
  return (
    <>
      <div className="d-flex justify-content-between mb-2 px-4 pe-2">
        <span>Каналы</span>
        <button type="button" className="p-0 text-primary btn btn-group-vertical" onClick={() => dispatch(openModal({ type: 'addChannel' }))}>
          <PlusSquare size={20} />
          <span className="visually-hidden">+</span>
        </button>
      </div>
      <List />
    </>
  );
};

export default ChannelsList;
