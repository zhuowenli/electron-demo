/*
 * @Author: 卓文理
 * @Email: 531840344@qq.com
 * @Date: 2017-12-03 14:29:48
 */

'use strict';

// import main from './views/main.vue';
import home from './views/home';
import login from './views/login';

export default [
    {
        path: '/',
        name: 'home',
        component: home,
    },
    {
        path: '/login',
        name: 'login',
        component: login,
    },
];

