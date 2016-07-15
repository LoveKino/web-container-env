let {
    app, session
} = require('electron'),
    hackFirstPage = require('./hackFirstPage');

module.exports = () => {
    let requestInfos = [];

    let record = () => {
        hackFirstPage();
        let webRequest = session.defaultSession.webRequest;
        webRequest.onBeforeRequest((details, callback) => {
            requestInfos.push({
                type: 'request',
                id: details.id,
                url: details.url,
                method: details.method,
                resourceType: details.resourceType,
                timestamp: details.timestamp
            });
            callback({
                cancal: false
            });
        });

        webRequest.onHeadersReceived((details, callback) => {
            requestInfos.push({
                type: 'response',
                id: details.id,
                url: details.url,
                method: details.method,
                resourceType: details.resourceType,
                timestamp: details.timestamp,
                statusLine: details.statusLine,
                statusCode: details.statusCode,
                responseHeaders: details.responseHeaders
            });
            callback({
                cancel: false
            });
        });
    };

    if (app.isReady()) {
        record();
    } else {
        app.on('ready', record);
    }

    return {
        getRequestInfo: () => {
            return requestInfos;
        }
    };
};
