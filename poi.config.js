/*
 * Author: 绿间
 * Email: lvjian@huanleguang.com
 * Date: 2018-04-03 19:57:11
 */

const path = require('path');
const appPkg = require('./app/package');

module.exports = (options, req) => ({
    entry: 'src/index.js',
    dist: 'app/renderer',
    // filename: {
    //     js: '[name].js',
    //     css: '[name].css',
    //     static: 'static/[name].[ext]'
    // },
    html: {
        title: appPkg.productName
    },
    homepage: './',
    sourceMap: !!options.dev,
    resolve: true,
    extendWebpack(config) {
        config.target('electron-renderer');
        config.node
            .set('__filename', false)
            .set('__dirname', false);
        config.module.rule('scss')
            .use('sass-loader')
            .tap(opt => {
                opt.includePaths = [path.resolve(__dirname, './node_modules')];
                return opt;
            });
    },
    webpack(cfg) {
        cfg.resolve.modules.push(path.resolve('src'));
        cfg.resolve.alias.vue$ = 'vue/dist/vue.js';

        if (!options.dev) {
            cfg.devtool = false;
            cfg.bail = true;
        } else {
            cfg.devtool = 'source-map';
        }

        return cfg;
    },
    vendor: options.mode === 'test' ? false : Object.keys(require('./package.json').dependencies)
});
