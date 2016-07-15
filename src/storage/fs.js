'use strict';

let fs = require('mz/fs');

let del = require('del');

module.exports = {
    readFile: fs.readFile,
    writeFile: fs.writeFile,
    readdir: fs.readdir,
    mkdir: fs.mkdir,
    rmdir: fs.rmdir,
    del
};
