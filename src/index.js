// @ts-check

import ReactDOM from 'react-dom';
import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';

import '../assets/application.scss';

import init from './app/init.js';

// import React from 'react';
// import { render } from 'react-dom';
// import { Provider } from 'react-redux';
// import { io } from 'socket.io-client';

// import store from './store/index.js';
// import App from './app/App.jsx';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}
// const socket = io();

const app = init();

ReactDOM.render(app, document.querySelector('#chat'));
