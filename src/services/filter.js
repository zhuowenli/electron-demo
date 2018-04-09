/*
 * @Author: 卓文理
 * @Email: 531840344@qq.com
 * @Date: 2017-10-07 13:39:10
 */

'use strict';

export default function(Vue) {
    Vue.filter('price', data => data && Number(data).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
}
