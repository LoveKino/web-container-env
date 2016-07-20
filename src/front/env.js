'use strict';

let {
    front
} = require('../bridge');

let Memory = require('./memory');

module.exports = ({
    winId, sandbox
}) => {
    let {
        call, detect
    } = front(winId, sandbox);

    let memory = Memory(call);

    return detect().then(() => {
        return {
            call,
            memory
        };
    });
};
