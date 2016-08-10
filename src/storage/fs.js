'use strict';

let fs = require('mz/fs');

let del = require('del');

let mkdirp = require('mkdirp');

let existsFile = (filePath) => {
    return new Promise((resolve) => {
        fs.stat(filePath).then((statObj) => {
            resolve(statObj.isFile());
        }).catch(() => {
            resolve(false);
        });
    });
};

let existsDir = (filePath) => {
    return new Promise((resolve) => {
        fs.stat(filePath).then((statObj) => {
            resolve(statObj.isDirectory());
        }).catch(() => {
            resolve(false);
        });
    });
};

module.exports = {
    readFile: fs.readFile,
    writeFile: fs.writeFile,
    readdir: fs.readdir,
    mkdir: fs.mkdir,
    rmdir: fs.rmdir,
    mkdirp,
    del,
    existsFile,
    existsDir
};
