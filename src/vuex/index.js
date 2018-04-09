/**
 * Author: 绿间
 * Email: lvjian@huanleguang.com
 * Created: 2017-12-11 14:19:02
 * Modified By: 绿间
 */

import Vue from 'vue';
import Vuex from 'vuex';
import product from './modules/product';

Vue.use(Vuex);

export const actions = {};
export const getters = {};
export const mutations = {};
export default new Vuex.Store({
    state: {},
    actions,
    mutations,
    modules: {
        product,
    },
    strict: process.env.NODE_ENV !== 'production'
});
