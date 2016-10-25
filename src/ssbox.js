'use strict';

let fs = require('./storage/fs'),
    Memory = require('./storage/memory'),
    WinMemory = require('./storage/winMemory');

let {
    mergeMap
} = require('bolzano');

let log = console.log; // eslint-disable-line

module.exports = ({
    channelName,
    createWindow,
    manager
}) => {

    let winMemory = WinMemory();
    /**
     * opts
     *      callbackChannel
     */
    let openWindow = (opts) => {
        opts.sandbox = mergeMap(sandbox, opts.sandbox || {});
        return createWindow(opts).then(({
            windowFrame,
            winId,
            rootId
        }) => {
            let {
                call
            } = manager[channelName] || {};

            windowFrame.on('close', () => {
                // notify control page
                call && call('onCloseWindow', [{
                    winId, rootId
                }]);
                // clear memory
                winMemory.removeWin(rootId);
            });
            return winId;
        });
    };

    let sandbox = {
        fs: fs,

        memory: Memory(),

        winMemory,

        createWindow: openWindow,

        closeWindow: (winId) => {
            let {
                windowFrame
            } = manager[winId] || {};
            if (windowFrame) {
                setTimeout(() => {
                    windowFrame.close();
                }, 17);
            }
        },

        callOtherWindow: (winId, name, params) => {
            let {
                call
            } = manager[winId];
            return call(name, params);
        }
    };

    return sandbox;
};
