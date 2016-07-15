'use strict';

/**
 * main process define some functions,
 *
 * rendered process can call these methods.
 */

let {
    ipcRenderer
} = require('electron');

let {
    front
} = require('general-bridge');

let listen = (channel, consume) => {
    ipcRenderer.on(channel, (event, arg) => {
        consume(arg);
    });
};

module.exports = (channelName, sandbox = {}) => front(channelName, sandbox, listen, ipcRenderer.send);
