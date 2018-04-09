/*
 * Author: 绿间
 * Email: lvjian@huanleguang.com
 * Date: 2018-04-09 23:46:26
 */

/**
 * 封装 HLG.request，伪造成拼多多发请求
 *
 * @param {Object} config
 * @param {String} config.url 链接
 * @param {String} config.method 方法
 * @param {Object} config.params 参数
 * @param {String} config.cookie cookie
 * @returns {Promise}
 */
export default async function ({
    url, method, params, cookie
}) {
    const ua = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.81 Safari/537.36';
    cookie = cookie || await HLG.getCookies();
    let result;

    try {
        result = await HLG.request[method.toLocaleLowerCase()](url)
            .send(params)
            .set('Referer', 'http://mms.pinduoduo.com/Pdd.html')
            .set('origin', 'http://mms.pinduoduo.com')
            .set('Cookie', cookie)
            .set('User-Agent', ua)
            .timeout({
                response: 1000 * 20, // Wait 5 seconds for the server to start sending
            });
    } catch (e) {
        return false;
    }

    return JSON.parse(result.text);
}
