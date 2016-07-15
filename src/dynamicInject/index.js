'use strict';

let path = require('path'),
    fs = require('mz/fs');

const tmpDir = path.join(__dirname, './tmp');

let count = 0;

let generateInjectPath = () => {
    let name = count+++'' + Math.random(Math.random());
    return `${tmpDir}/${name}.js`;
};

module.exports = ({
    injectScriptPath,
    coreJsPath,
    injectData
}) => {
    if (!coreJsPath) {
        return Promise.resolve(coreJsPath);
    }
    injectScriptPath = injectScriptPath || generateInjectPath();

    let code = codeTpl(coreJsPath, JSON.stringify(injectData) || null);

    return fs.writeFile(injectScriptPath, code, 'utf-8').then(() => {
        return injectScriptPath;
    });
};

let codeTpl = (coreJsPath, data, staticInjectScripts = []) => {
    let requireCode = 'var requires = [];\n';
    for (let i = 0; i < staticInjectScripts.length; i++) {
        let item = staticInjectScripts[i];
        requireCode += `requires[${i}] = require('${item[i]}');
        `;
    }
    return `!(function () {
    var core = require('${coreJsPath}');
    ${requireCode}
    core(${data}, requires);
})();`;
};
