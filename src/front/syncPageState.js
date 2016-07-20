'use strict';

/**
 * opts = {
 *      localState: {
 *          cookie: [],
 *          localStorage: {}
 *      }
 * }
 */

module.exports = (opts = {}) => {
    syncCookie(opts.localState.cookie || []);
    syncLocalStorage(opts.localState.localStorage || {});
};

let syncCookie = (cookie) => {
    // TODO removeItem
    for (let i = 0; i < cookie.length; i++) {
        document.cookie = cookie[i];
    }
};

let syncLocalStorage = (local) => {
    // TODO removeItem
    for (let name in local) {
        localStorage[name] = local[name];
    }
};

// TODO cover IndexedDB and others
