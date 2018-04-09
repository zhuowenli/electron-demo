/*
 * @Author: 卓文理
 * @Email: 531840344@qq.com
 * @Date: 2018-04-09 20:27:08
 */

'use strict';

const { remote } = require('electron');

const { BrowserWindow } = remote;

module.exports = function() {
    return new Promise(((resolve) => {
        const presWindow = new BrowserWindow();// 新窗口
        presWindow.loadURL('http://mms.pinduoduo.com/Pdd.html#/login');
        presWindow.webContents.on('did-navigate-in-page', () => {
            if (presWindow.webContents.getURL().indexOf('http://mms.pinduoduo.com/Pdd.html#/index') >= 0) {
                presWindow.close();
            }
            resolve();
        });
        presWindow.webContents.on('dom-ready', () => {
            console.log(presWindow.webContents);
        });
    }));
};
