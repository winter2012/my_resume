/**
 * @Author: Jecyu
 * @Date: 2017-10-23 10:58:40 am 
 * @Modified By: JeCyu 
 * @Last Modified time: 2017-11-17 1:03:00 pm 
 */
const webpack           = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// 环境变量配置,dev / online
var WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';

// 获取HtmlWebpackPlugin的参数（多页应用时，避免代码冗余）
var getHtmlConfig     = function(name, title) {
    // 把整个对象传过去
    return {
        template: './src/view/' + name + '.html',
        filename: 'view/' + name +'.html',        
        title   : title,
        favicon : './favicon.ico',
        inject  : true,
        hash    : true,
        chunks  : ['common', name]  
    }
}


var config = {
    entry :  {  //入口文件
        'common'    : [__dirname + '/src/page/common/index.js'],
        'index'     : [__dirname + '/src/page/index/index.js'],
        'detail'     : [__dirname + '/src/page/detail/index.js'],
    },
    output: {
        path      : __dirname + '/dist',  // 输出文件放置的地方
        publicPath: 'dev' === WEBPACK_ENV ? '/dist/' : '../',                      // 打包后的文件访问依赖包的路径
        filename  : 'js/[name].js'        // 文件名
    },
    externals: {
        'jquery': 'window.$'
    },
    resolve: {
        alias: {
            node_modules: __dirname + '/node_modules',
            page        : __dirname + '/src/page',
            image       : __dirname + '/src/image',
            util        : __dirname + '/src/util',
        }
    },
    module: {
        rules: [
            {
                test: /\.css$/, 
                use : ExtractTextPlugin.extract({
                        fallback: 'style-loader', 
                        use: 'css-loader', 
                }) 
            },
            {
                test: /\.scss$/,
            },
            {
                test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/, 
                use: 'url-loader?limit=100&name=resource/[name].[ext]'                 
            }
        ]
    },
    plugins: [
        // 独立通用模块到js/base.js
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            filename: 'js/base.js'
        }),
        // 把css单独打包到文件里
        new ExtractTextPlugin('css/[name].css'),
        new HtmlWebpackPlugin(getHtmlConfig('index', '首页')),
        new HtmlWebpackPlugin(getHtmlConfig('detail', '详情页'))
    ]
    
};

// 使用环境变量来判断开发环境来启动服务器
if('dev' === WEBPACK_ENV) {
    config.entry.common.push('webpack-dev-server/client?http://localhost:8088/');
}

module.exports = config;