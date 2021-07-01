import Add from './Add.js';
import Remove from './Remove.js';
import Rename from './Rename.js';

const modals = {
  addChannel: Add,
  removeChannel: Remove,
  renameChannel: Rename,
};

export default (modalName) => modals[modalName];
