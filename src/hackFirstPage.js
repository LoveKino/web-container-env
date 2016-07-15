'use strict';

let {protocol} = require('electron');

let hackFirstPage = () => {
    protocol.interceptHttpProtocol('http', (request, callback) => {
        request.session = null;
        callback(request);
        protocol.uninterceptProtocol('http');
    });
};

module.exports = hackFirstPage;
