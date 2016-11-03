'use strict';

let promisify = require('promisify-node');

module.exports = (session) => {
    let clearCache = promisify(function(callback) {
        return session.clearCache(callback);
    });

    let clearStorageData = promisify(function(callback) {
        return session.clearStorageData(callback);
    });

    return clearCache().then(() => {
        return clearStorageData();
    });
};
