'use strict';

let {
    BrowserWindow
} = require('electron');

let clearLocalData = require('./clearLocalData');

let defWindwoOpts = {
    width: 800,
    height: 600
};

/*
let defMobileOpts = {
    screenPosition: 'mobile',
    screenSize: {
        width: 480,
        height: 640
    },
    deviceScaleFactor: 0,
    viewPosition: {
        x: 0,
        y: 0
    },
    viewSize: {
        width: 480,
        height: 640
    },
    fitToView: false,
    offset: {
        x: 0,
        y: 0
    }
};
*/

/**
 * opts
 *      sandbox
 *      windowOpts
 *      url
 *      loadURLOpts,
 *      injectScript,
 *      openDev
 */
module.exports = (opts = {}) => {
    let windowOpts = merge(defWindwoOpts, opts.windowOpts);
    if (opts.injectScript) {
        windowOpts.webPreferences = windowOpts.webPreferences || {};
        windowOpts.webPreferences.preload = opts.injectScript;
    }
    let windowFrame = new BrowserWindow(windowOpts);

    let webContents = windowFrame.webContents;

    // clear local storage first
    return clearLocalData(webContents.session).then(() => {
        if (opts.url) {
            webContents.loadURL(opts.url, opts.loadURLOpts);
        }

        if (windowOpts.openDev) {
            webContents.openDevTools();
        }
        // webContents.enableDeviceEmulation(merge(defMobileOpts, opts.mobileOpts));
        return windowFrame;
    });
};

let merge = (obj1, obj2 = {}) => {
    for (let name in obj2) {
        obj1[name] = obj2[name];
    }
    return obj1;
};
