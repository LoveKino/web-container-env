'use strict';

let {
    app, Menu
} = require('electron');
let appReady = require('../appReady');
let open = require('./open');
let {
    generateInjectFile, removeInjectFile
} = require('../dynamicInject');

let back = require('../bridge');

let createDefaultMenu = require('./createDefaultMenu');

let count = 0;
let genWinId = () => {
    return `win-${count++}-${Math.random(Math.random())}`;
};

let genInjectScript = ({
    injectScriptPath, coreJsPath, passData, rootId
}, winId) => {
    return generateInjectFile({
        injectScriptPath,
        coreJsPath,
        injectData: {
            winId,
            passData,
            rootId
        }
    });
};

let sender = (webContents) => (channelName, message) => {
    setTimeout(() => {
        try {
            webContents.send(channelName, message);
        } catch (err) { // for Error: Object has been destroyed
            console.log(err.stack); // eslint-disable-line
        }
    }, 17);
};

module.exports = () => {
    let manager = {};

    let action = (opts) => {
        let {
            sandbox,
            url,
            extraHeaders,
            channelName,
            parent,
            openDev
        } = opts;

        if (typeof openDev === 'undefined') openDev = true;

        // used to identity a window
        let winId = channelName || genWinId();

        // record root window
        opts.rootId = opts.rootId || winId;

        return genInjectScript(opts, winId).then((injectScript) => {
            return open({
                url: url,
                loadURLOpts: {
                    extraHeaders
                },
                injectScript,
                windowOpts: {
                    parent,
                    openDev
                }
            }).then((windowFrame) => {
                let call = back(winId, sandbox, sender(windowFrame.webContents));

                manager[winId] = {
                    windowFrame, winId, call, injectScript
                };

                onWindow(windowFrame, winId, opts);

                return {
                    rootId: opts.rootId,
                    winId,
                    call,
                    windowFrame,
                    injectScript
                };
            });
        });
    };

    let onWindow = (windowFrame, winId, opts) => {
        windowFrame.on('close', () => {
            let item = manager[winId];
            delete manager[winId];
            return item && removeInjectFile(item.injectScript);
        });

        // new window event
        windowFrame.webContents.on('new-window', (...args) => {
            let e = args[0];
            // prevent default
            e.preventDefault();

            // create new window
            openChildWindow(opts, args[1], windowFrame);
        });
    };

    let openChildWindow = (opts, url, windowFrame) => {
        // create new window
        let newOpts = cloneMap(opts);
        // override
        newOpts.url = url;
        newOpts.parent = windowFrame;

        return createWindow(newOpts);
    };

    let createWindow = (opts) => {
        return appReady().then(() => {
            return action(opts);
        });
    };

    return {
        createWindow,
        manager
    };
};

app.on('window-all-closed', function() {
    app.quit();
});

app.once('ready', () => {
    if (Menu.getApplicationMenu()) return;
    createDefaultMenu();
});

let cloneMap = (map = {}) => {
    let newMap = {};
    for (let name in map) {
        newMap[name] = map[name];
    }
    return newMap;
};
