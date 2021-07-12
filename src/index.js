// @ts-check

import ReactDOM from 'react-dom';
import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import { io } from 'socket.io-client';

import '../assets/application.scss';

import init from './app/init.jsx';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}
const render = async () => {
  const socket = io();
  const app = await init(socket);
  console.log(init);
  ReactDOM.render(app, document.querySelector('#chat'));
};
render();
