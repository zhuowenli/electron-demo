/*
 * @Author: 卓文理
 * @Email: 531840344@qq.com
 * @Date: 2018-04-09 22:43:20
 */

'use strict';

(function() {
    const page = {
        init() {
            this.getLoginInfo(window.autoLoginId);
            this.bindEvent();
        },
        bindEvent() {
            document.getElementById('loginBtnId').addEventListener('click', () => {
                const username = document.getElementById('usernameId').value;
                const password = document.getElementById('passwordId').value;

                require('electron').ipcRenderer.send('onLogin', { username, password });
            });
        },
        getLoginInfo(id) {
            if (id) {
                console.log(id);
            }

            document.getElementById('usernameId').value = 'pdd6673148002';
            document.getElementById('passwordId').value = 'Huanleguang275';
            document.getElementById('loginBtnId').setAttribute('data-click', 'true');
            document.getElementById('loginBtnId').className = 'pdd-btn l-c-c-c-btn';
        }
    };

    page.init();
}());
