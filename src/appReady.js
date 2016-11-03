let {
    app
} = require('electron');

module.exports = () => {
    if (app.isReady()) {
        return Promise.resolve();
    } else {
        return new Promise(resolve => {
            app.on('ready', () => {
                resolve();
            });
        });
    }
};


