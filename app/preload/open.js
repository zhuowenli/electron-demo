/*
 * @Author: 卓文理
 * @Email: 531840344@qq.com
 * @Date: 2018-04-09 20:15:19
 */

'use strict';

const path = require('path');
const { remote } = require('electron');

const { BrowserWindow } = remote;
const isDev = typeof process.env.NODE_ENV === 'string'
    ? (process.env.NODE_ENV === 'development')
    : require('electron-is-dev');

module.exports = function(url, { isHide, timeout, readyClose } = {}) {
    const presWindow = new BrowserWindow({
        show: !isHide,
        webPreferences: {
            devTools: isDev,
            preload: path.resolve(path.join(__dirname, 'index.js'))
        }
    });

    presWindow.loadURL(url); // 新窗口

    if (timeout) {
        setTimeout(() => {
            presWindow.close();
        }, timeout);
    }
    if (readyClose) {
        presWindow.webContents.on('dom-ready', () => {
            presWindow.close();
        });
    }

    return presWindow;
};
