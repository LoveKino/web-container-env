'use strict';

module.exports = () => {
    let map = {};

    return {
        set: (key, value) => {
            map[key] = value;
        },
        get: (key) => map[key]
    };
};
