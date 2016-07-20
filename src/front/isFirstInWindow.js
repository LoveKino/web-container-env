'use strict';

// TODO fix bad logic
let isFirstInWindow = (memory, winId) => {
    const notFirstKey = `${winId}-not-first`;
    return memory.get(notFirstKey).then((res) => {
        if (res) {
            // not first
            return false;
        } else {
            return memory.set(notFirstKey, true).then(() => {
                // first
                return true;
            });
        }
    });
};

module.exports = isFirstInWindow;
