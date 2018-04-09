/*
 * Author: 绿间
 * Email: lvjian@huanleguang.com
 * Date: 2018-04-09 20:04:00
 */

const charset = require('superagent-charset');
const request = charset(require('superagent'));
const open = require('./open');
const login = require('./login');
const isDev = typeof process.env.NODE_ENV === 'string'
    ? (process.env.NODE_ENV === 'development')
    : require('electron-is-dev');

// 页面加载时，添加 HLG 全局方法
document.addEventListener('DOMNodeInserted', () => {
    window.HLG = {
        request,
        debug: isDev,
        open,
        login,
        version: 1.0
    };
});

// document.addEventListener('DOMContentLoaded', () => {
//     window.HLG = {
//         request,
//         open,
//         login,
//         version: 1.0
//     };
// });
