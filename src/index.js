/*
 * @Author: 卓文理
 * @Email: 531840344@qq.com
 * @Date: 2018-04-03 20:33:44
 */

'use strict';

import Vue from 'vue';
import VueRouter from 'vue-router';
import { sync } from 'vuex-router-sync';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import routes from './routes';
import store from './vuex';
import App from './views/app.vue';
import filter from './services/filter';

Vue.use(filter);
Vue.use(VueRouter);
Vue.use(ElementUI);

// debug
Vue.config.debug = true;
Vue.config.devtools = true;

const router = new VueRouter({
    routes,
    mode: 'history'
});

sync(store, router);

export default new Vue({
    router,
    store,
    mounted () {
        document.dispatchEvent(new Event('render-event'));
    },
    render: r => r(App),
}).$mount('#app');

