/*
 * @Author: 卓文理
 * @Email: 531840344@qq.com
 * @Date: 2018-04-03 20:37:20
 */

'use strict';

const path = require('path');
// const fs = require('fs');
const { app, BrowserWindow, Menu } = require('electron');
const appMenu = require('./menu');
const config = require('./config');
const pkg = require('./package');

require('electron-debug')();
require('electron-context-menu')();

const isDev = typeof process.env.NODE_ENV === 'string'
    ? (process.env.NODE_ENV === 'development')
    : require('electron-is-dev');

let mainWindow;
let isQuitting = false;

// Set title of the app that will use shown in window titlebar
app.setName(pkg.productName);

const isAlreadyRunning = app.makeSingleInstance(() => {
    if (mainWindow) {
        if (mainWindow.isMinimized()) {
            mainWindow.restore();
        }

        mainWindow.show();
    }
});

if (isAlreadyRunning) {
    app.quit();
}

function createMainWindow() {
    const lastWindowState = config.get('lastWindowState');

    const win = new BrowserWindow({
        title: app.getName(),
        x: lastWindowState.x,
        y: lastWindowState.y,
        width: lastWindowState.width,
        height: lastWindowState.height,
        webPreferences: {
            devTools: isDev,
            webSecurity: false,
            allowRunningInsecureContent: true,
            preload: `${__dirname}/preload/index.js`
        },
    });

    win.webContents.openDevTools();

    const url = isDev ? 'http://localhost:4000/login' : `file://${path.join(__dirname, 'renderer', 'index.html')}`;
    // const url = 'https://tbgr.huanleguang.com';

    win.loadURL(url);

    win.on('close', e => {
        if (!isQuitting) {
            e.preventDefault();

            if (process.platform === 'darwin') {
                app.hide();
            } else {
                win.hide();
            }
        }
    });

    win.on('page-title-updated', e => {
        e.preventDefault();

        console.log(11);
    });

    return win;
}

app.on('ready', () => {
    Menu.setApplicationMenu(appMenu);
    mainWindow = createMainWindow();
});

app.on('activate', () => {
    mainWindow.show();
});

app.on('before-quit', () => {
    isQuitting = true;

    if (!mainWindow.isFullScreen()) {
        config.set('lastWindowState', mainWindow.getBounds());
    }
});
