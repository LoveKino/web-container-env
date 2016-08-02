'use strict';

let reflect = (call, path) => {
    return function () {
        return call(path, Array.prototype.slice.call(arguments));
    };
};

module.exports = (call) => {
    return {
        readFile: reflect(call, 'fs.readFile'),
        writeFile: reflect(call, 'fs.writeFile'),
        readdir: reflect(call, 'fs.readdir'),
        mkdir: reflect(call, 'fs.mkdir'),
        rmdir: reflect(call, 'fs.rmdir'),
        del: reflect(call, 'fs.del'),
        existsFile: reflect(call, 'fs.existsFile'),
        existsDir: reflect(call, 'fs.existsDir')
    };
};
