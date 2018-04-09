/**
 * Author: 绿间
 * Email: lvjian@huanleguang.com
 * Created: 2017-12-26 13:48:23
 * Modified By: 绿间
 */

import { get, put, post, del } from '../../services/fetch';
import findOne from '../../services/findOne';
import * as types from '../types';

export const getters = {
    products: state => state.products,
    productTotal: state => state.productTotal,
};

export const actions = {
    /**
     * 获取品牌列表
     * @param {any} { commit } state
     * @param {Object} query 查询参数
     * @param {Object} query.firstCategoryId 一级类目id
     * @param {Object} query.secondCategoryId 二级类目id
     * @param {Object} query.thirdCategoryId 三级类目id
     * @param {Object} query.brandId 三级类目id
     * @param {Object} query.searchKeyword 搜索关键字
     * @param {Object} query.sort 排序方式
     * @param {Object} query.size
     * @param {Object} query.page
     * @returns {Promise}
     */
    async fetchProducts ({ commit }, query = {}) {
        const data = await get('/products', query);
        commit(types.RECEIVE_PRODUCT_LIST, data);

        return data;
    },

    /**
     * 查看产品
     * @param {any} { commit } state
     * @param {Number} id 产品id
     * @returns
     */
    async fetchProduct ({ commit }, id) {
        return get(`/products/${id}`);
    },

    /**
     * 更新品牌
     * @param {any} { commit } state
     * @param {Object} { id, params }
     * @param {Number} id 品牌id
     * @param {Object} params 参数
     * @param {Array} params.attrNVpairs [{ "attrNameId": 0, "attrValueIds": [0] }]
     * @param {Number} params.brandId
     * @param {String} params.brandName
     * @param {Number} params.day
     * @param {String} params.imageUrl
     * @param {Array} params.links [{ "imageUrl": "string", "itemId": 0, "price": 0, "shopName": "string", "status": 0, "title": "string" }]
     * @param {Number} params.month
     * @param {String} params.nickName
     * @param {String} params.productName
     * @param {String} params.seriesName
     * @param {Number} params.thirdCategoryId
     * @param {Number} params.year
     * @returns {Promise}
     */
    async updateProduct({ commit }, { id, params }) {
        const data = await put(`/products/${id}`, params);
        commit(types.UPDATE_PRODUCT_LIST, data);
        return data;
    },

    /**
     * 新增产品
     * @param {any} { commit } state
     * @param {Object} params 参数
     * @param {Array} params.attrNVpairs [{ "attrNameId": 0, "attrValueIds": [0] }]
     * @param {Number} params.brandId
     * @param {String} params.brandName
     * @param {Number} params.day
     * @param {String} params.imageUrl
     * @param {Array} params.links [{ "imageUrl": "string", "itemId": 0, "price": 0, "shopName": "string", "status": 0, "title": "string" }]
     * @param {Number} params.month
     * @param {String} params.nickName
     * @param {String} params.productName
     * @param {String} params.seriesName
     * @param {Number} params.thirdCategoryId
     * @param {Number} params.year
     * @returns {Promise}
     */
    async saveProduct({ commit }, params) {
        const data = await post('/products', params);
        commit(types.SAVE_PRODUCT_LIST, data);
        return data;
    },

    /**
     * 删除产品
     * @param {any} { commit } state
     * @param {Object} params { id }
     * @returns {Promise}
     */
    async deleteProduct({ commit }, productId) {
        const data = await del(`/products/${productId}`);
        commit(types.DELETE_PRODUCT_LIST, productId);
        return data;
    },

    /**
     * 产品列表页面品牌下拉接口
     * @param {any} { commit }
     * @param {Object} query 查询参数
     * @param {Object} query.firstCategoryId 一级类目id
     * @param {Object} query.secondCategoryId 二级类目id
     * @param {Object} query.thirdCategoryId 三级类目id
     * @returns {Promise}
     */
    async fetchProductBrands({ commit }, query) {
        return get('/products/brands', query);
    },

    /**
     * 产品列表页面品牌下拉接口
     * @param {any} { commit }
     * @returns {Promise}
     */
    async fetchProductFirst({ commit }) {
        return get('/products/first');
    },

    /**
     * 产品列表页面品牌下拉接口
     * @param {Object} query 查询参数
     * @param {any} { commit }
     * @param {Number} query.firstCategoryId 一级类目id
     * @param {Number} query.brandId 品牌ID
     * @returns {Promise}
     */
    async fetchProductThird({ commit }, query) {
        return get('/products/third', query);
    },

    /**
     * 宝贝链接解析,重复的itemId提示‘该链接已存在’
     * @param {any} { commit }
     * @param {Object} params
     * @param {String} params.itemUrl 宝贝链接
     * @param {Number} params.productId 品牌ID
     */
    async parselink({ commit }, params) {
        return post('/products/parselink', params);
    },

    /**
     * 产品图片上传,返回图片url地址，用于前端图片展示
     * @param {any} { commit }
     * @param {FormData} params
     * @param {String} params.file
     */
    async uploadFile({ commit }, params) {
        return post('/products/upload', params);
    },
};

export const mutations = {
    [types.RECEIVE_PRODUCT_LIST](state, data) {
        state.products = data.content;
        state.productTotal = data.totalElements;
    },
    [types.UPDATE_PRODUCT_LIST](state, item) {
        const { index } = findOne(state.products, { productId: item.productId });

        if (index >= 0) {
            state.products.splice(index, 1, item);
        }
    },
    [types.SAVE_PRODUCT_LIST](state, item) {
        state.products.unshift(item);
    },
    [types.DELETE_PRODUCT_LIST](state, productId) {
        const { index } = findOne(state.products, { productId });
        if (index >= 0) {
            state.products.splice(index, 1);
        }
    }
};

export default {
    actions,
    getters,
    mutations,
    namespaced: true,
    state: {
        products: [],
        productTotal: 0,
    },
};
