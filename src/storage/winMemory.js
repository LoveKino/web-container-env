'use strict';

/**
 * memory for one window
 */

module.exports = () => {
    let map = {};

    return {
        set: (winId, key, value) => {
            map[winId] = map[winId] || {};
            map[winId][key] = value;
        },

        get: (winId, key) => {
            let v = map[winId];
            if (!v) return;
            return v[key];
        },

        remove: (winId, key) => {
            let v = map[winId];
            if (!v) return;
            delete v[key];
        },

        removeWin: (winId) => {
            delete map[winId];
        }
    };
};
