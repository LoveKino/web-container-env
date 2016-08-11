const {
    Menu, app
} = require('electron');

const template = [{
    label: 'Edit',
    submenu: [{
        label: 'Undo',
        accelerator: 'CmdOrCtrl+Z',
        role: 'undo'
    }, {
        label: 'Redo',
        accelerator: 'Shift+CmdOrCtrl+Z',
        role: 'redo'
    }, {
        type: 'separator'
    }, {
        label: 'Cut',
        accelerator: 'CmdOrCtrl+X',
        role: 'cut'
    }, {
        label: 'Copy',
        accelerator: 'CmdOrCtrl+C',
        role: 'copy'
    }, {
        label: 'Paste',
        accelerator: 'CmdOrCtrl+V',
        role: 'paste'
    }, {
        label: 'Paste and Match Style',
        accelerator: 'Shift+Command+V',
        role: 'pasteandmatchstyle'
    }, {
        label: 'Delete',
        role: 'delete'
    }, {
        label: 'Select All',
        accelerator: 'CmdOrCtrl+A',
        role: 'selectall'
    }]
}, {
    label: 'View',
    submenu: [{
        label: 'Reload',
        accelerator: 'CmdOrCtrl+R',
        click(item, focusedWindow) {
            if (focusedWindow) focusedWindow.reload();
        }
    }, {
        label: 'Toggle Full Screen',
        accelerator: (() => {
            return (process.platform === 'darwin') ? 'Ctrl+Command+F' : 'F11';
        })(),
        click(item, focusedWindow) {
            if (focusedWindow) focusedWindow.setFullScreen(!focusedWindow.isFullScreen());
        }
    }, {
        label: 'Toggle Developer Tools',
        accelerator: (() => {
            return (process.platform === 'darwin') ? 'Alt+Command+I' : 'Ctrl+Shift+I';
        })(),
        click(item, focusedWindow) {
            if (focusedWindow) focusedWindow.toggleDevTools();
        }
    }]
}, {
    label: 'Window',
    role: 'window',
    submenu: [{
        label: 'Minimize',
        accelerator: 'CmdOrCtrl+M',
        role: 'minimize'
    }, {
        label: 'Close',
        accelerator: 'CmdOrCtrl+W',
        role: 'close'
    }]
}];

if (process.platform === 'darwin') {
    template.unshift({
        label: 'Freekite',
        submenu: [{
            label: 'About Freekite',
            role: 'about'
        }, {
            type: 'separator'
        }, {
            label: 'Services',
            role: 'services',
            submenu: []
        }, {
            type: 'separator'
        }, {
            label: 'Hide Freekite',
            accelerator: 'Command+H',
            role: 'hide'
        }, {
            label: 'Hide Others',
            accelerator: 'Command+Alt+H',
            role: 'hideothers'
        }, {
            label: 'Show All',
            role: 'unhide'
        }, {
            type: 'separator'
        }, {
            label: 'Quit ' + app.getName(),
            accelerator: 'Command+Q',
            click() {
                app.quit();
            }
        }]
    });
    template[3].submenu = [{
        label: 'Close',
        accelerator: 'CmdOrCtrl+W',
        role: 'close'
    }, {
        label: 'Minimize',
        accelerator: 'CmdOrCtrl+M',
        role: 'minimize'
    }, {
        label: 'Zoom',
        role: 'zoom'
    }, {
        type: 'separator'
    }, {
        label: 'Bring All to Front',
        role: 'front'
    }];
}

module.exports = () => {
    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
};
