'use strict';

let fs = require('./storage/fs'),
    Memory = require('./storage/memory');

let log = console.log; // eslint-disable-line

module.exports = ({
    channelName,
    createWindow,
    manager
}) => {
    let sandbox = {
        fs: fs,

        memory: Memory(),

        /**
         * opts
         *      callbackChannel
         */
        createWindow: (opts) => {
            opts.sandbox = sandbox;
            return createWindow(opts).then(({
                windowFrame,
                winId,
                rootId
            }) => {
                windowFrame.on('close', () => {
                    let {
                        call
                    } = manager[channelName] || {};
                    // notify control page
                    call && call('onCloseWindow', [{
                        winId, rootId
                    }]);
                });
                return winId;
            });
        },

        closeWindow: (winId) => {
            let {
                windowFrame
            } = manager[winId];
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
