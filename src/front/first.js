'use strict';

let syncPageState = require('./syncPageState');

let isFirstInWindow = require('./isFirstInWindow');

let first = (memory, winId, entrance) => {
    return isFirstInWindow(memory, winId).then(res => {
        if (res) {
            // sync page state
            syncPageState(entrance);
            // hack. js wont end here.
            window.location.reload();
            return true;
        } else {
            return false;
        }
    });
};

module.exports = first;
