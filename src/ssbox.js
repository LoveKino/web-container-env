'use strict';

let fs = require('./storage/fs'),
    Memory = require('./storage/memory');

let log = console.log; // eslint-disable-line

module.exports = ({
    channelName,
    createWindow,
    manager
}) => {
    /**
     * opts
     *      callbackChannel
     */
    let openWindow = (opts) => {
        opts.sandbox = sandbox;
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
            });
            return winId;
        });
    };

    let sandbox = {
        fs: fs,

        memory: Memory(),

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
