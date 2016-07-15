'use strict';

/**
 * main process define some functions,
 *
 * rendered process can call these methods.
 */

let {
    back
} = require('general-bridge');

let {
    ipcMain
} = require('electron');

let listen = (channel, handle) => {
    ipcMain.on(channel, (event, arg) => {
        handle(arg);
    });
};

module.exports = (channelName, sandbox = {}, send) => {
    return back(channelName, sandbox, listen, send);
};
