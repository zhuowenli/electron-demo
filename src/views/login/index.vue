<template lang="pug">
    .login
        webview.webview(
            allowpopups
            nodeintegration
            disablewebsecurity
            webpreferences="allowRunningInsecureContent"
            ref="webview"
            src="https://mms.pinduoduo.com/Pdd.html#/login"
        )
            //- :partition="partition"
</template>

<script>
import { remote } from 'electron';
import request from '../../services/request';
// import sleep from '../../services/sleep';

export default {
    name: 'Login',
    data() {
        return {
            partition: `persist:${Math.random()}`,
            loginInfo: {},
            loginId: null,
        };
    },
    async mounted() {
        this.initWebViewEvent();
    },
    methods: {
        initWebViewEvent() {
            const { loginId } = this;
            const { webview } = this.$refs;
            const code = `window.autoLoginId = ${loginId};
                let scriptTag = document.createElement('script');
                scriptTag.src = 'http://${window.location.host}/loginInsert.js?v=${Math.random()}';
                document.querySelector('body').appendChild(scriptTag);
            `;

            // 监听页面加载完成
            webview.addEventListener('did-finish-load', () => {
                // 调试用
                if (HLG.debug) {
                    webview.openDevTools();
                }

                const webviewContents = webview.getWebContents();

                if (webview.getURL().indexOf('mms.pinduoduo.com/Pdd.html#/login') > -1) {
                    webview.executeJavaScript(code, () => {});
                    console.log('webviewContents', webviewContents);
                }
            });

            // 监听登录界面注入脚本发送的消息
            remote.ipcMain.on('onLogin', (event, loginInfo) => {
                this.loginInfo = loginInfo;
            });

            // 登录完成之后，会有一个 hash 的跳转。需要分开处理
            webview.addEventListener('did-navigate-in-page', () => {
                const { webContents } = webview.getWebContents();
                const url = webview.getURL();
                let obj;

                if (url.indexOf('mms.pinduoduo.com/Pdd.html#/login') === -1) {
                    webContents.session.cookies.get({}, async (err, cookies) => {
                        try {
                            const res = await request({
                                url: `https://mms.pinduoduo.com/earth/api/user/userinfo?_${Date.now()}`,
                                method: 'post',
                                cookie: cookies.map(item => `${item.name}=${item.value};`).join(' '),
                            });

                            if (!res || !res.result || !res.result.mall_id) {
                                alert('登录出错，请联系客服');
                                return;
                            }

                            obj = {
                                cookies,
                                loginInfo: this.loginInfo,
                                partition: webview.partition,
                                userinfo: res.result
                            };

                            console.log('====================================');
                            console.log(res.result.mall_id);
                            console.log(obj);
                            console.log('====================================');

                            require('electron').ipcRenderer.send('sucLogin', obj);
                        } catch (e) {
                            console.log(e);
                            alert(`${e.message}, 请关闭360等杀毒软件`);
                        }
                    });
                }
            });
        },

    }
};
</script>

<style lang="sass" >
    .login
        overflow: hidden
        .webview
            width: 100vw
            height: 100vh
</style>

