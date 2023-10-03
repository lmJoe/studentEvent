var Version = new Date().getTime();
const path = require('path');
module.exports = {
    devServer: {
        //设置主机地址
        host: '0.0.0.0',
        //设置默认端口
        port: '8080',
        //自动打开浏览器
        open: true,
        // //配置代理
        // ​proxy: {​
        //     'api': { //配置名为'api'的代理
        //         target: 'https://xskwx.zjhuaxuntong.com', //请求后台服务端的IP，即代理转发的目标地址
        //         ​pathRewrite: { '^/api': '' }, //重写请求路径
        //         ​changeOrigin: true //开启跨域

        //     }​
        // },
        // headers: {
        //     'Access-Control-Allow-Origin': '*'
        // }
    },
    publicPath: '',
    productionSourceMap: false,
    configureWebpack: {
        output: {
            // 输出重构【模块名称.hash值.时间戳】
            filename: `js/[name].[hash].${Version}.js`,
            chunkFilename: `js/[name].[hash].${Version}.js`
        },
    },
}