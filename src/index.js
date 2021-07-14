// @ts-check

import ReactDOM from 'react-dom';
import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import { io } from 'socket.io-client';
import Rollbar from 'rollbar';
import '../assets/application.scss';

import init from './app/init.jsx';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}
const render = async () => {
  // eslint-disable-next-line no-unused-vars
  const rollbar = new Rollbar({
    accessToken: '79e127bdacab4114ad09b1aea50e1a87',
    captureUncaught: true,
    captureUnhandledRejections: true,
  });
  const socket = io();
  const app = await init(socket);

  ReactDOM.render(app, document.querySelector('#chat'));
};
render();
