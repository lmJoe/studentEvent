var Version = new Date().getTime();
module.exports = {
    devServer: {
        //设置主机地址
        host: '0.0.0.0',
        //设置默认端口
        port: '8080',
        //自动打开浏览器
        open: true,
        // //配置代理
        proxy: { // 配置跨域
            '/jxaxService': {
                target: 'https://xskwx.zjhuaxuntong.com',
                changOrigin: true, //是否跨域
                logLevel: 'debug',
                secure: false,
                // pathRewrite: {
                //     '^/jxaxService': '/jxaxService' //需要rewrite的,
                // }
            },
        },
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