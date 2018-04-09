/*
 * @Author: 卓文理
 * @Email: 531840344@qq.com
 * @Date: 2018-04-09 19:14:31
 */

'use strict';

import { BrowserWindow } from 'electron';

export function open(url, { isHide, timeout, readyClose }) {
    const presWindow = new BrowserWindow({
        show: !isHide,
        webPreferences: {
            preload: path.resolve(path.join(__dirname, '../global/preload.js'))
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
}
