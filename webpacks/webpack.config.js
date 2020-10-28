// const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require("path");
const webpackConfig = {
    /**
     * 指定一个或多个入口(源码目录文件)entry 将各个模块打包封装成一个或多个代码块chunk 并生成文件一个或多个bundle
     * entry 
     * 确定入口模块的位置  定义chunk name 默认为main 其形式可以是： 
     * 字符串、对象、数组、或者函数  字符串和数组其chunk name无法改变 只能是默认值
     * 字符串：
     * entry:'./src/index.js'
     * 数组入口：（传入的数组将多个资源预先合并 在打包时webpack会将数组中的最后一个元素作为实际的入口路径）
     * entry:[
     *  'babel-polyfill',
     *  './src/index.js'
     * ]
     * 上面等同于在./src/index.js 中 import 'babel-polyfill'
     * 对象入口：
     * 定义多个入口时必须是使用的形式 
     * 其中
     *  1 对象的属性名key 就是chunk name
     *  2 对象的属性值value就是入口路径 可以是字符串 也可以是数组
     *  entry:{
     *      'index':['babel-polyfill','./src/index.js'],
     *      'lib':'./src/lib.js'    
     *  } 
     * 
     * 多页应用：
     * 我们希望的是一个页面对应一个独立的bundle 而不是将所有页面打包到一个bundle中
     * 
     * entry:{
     *  home:'./src/home.js',
     *  shopCar:'./src/shopCar.js',
     *  order:'./src/order.js',
     *  vendor:['react','react-dom','react-router']
     * }
     * 
     * 函数式入口：
     * 只要返回字符串 数组和对象 可以动态配置 支持返回一个Promise对象进行一步操作 自由度很大
     * entry:new Promise(resolve => {
     *  setTimeout(() => {
     *      resolve('./src/index.js')
     *  },1000)
     * })
     */
    context:path.join(__dirname,'./src'), //context 资源入口的路径前缀 务必使用绝对路径 其作用式为了让entry编写更加简洁
    entry:'./index.js',
    // entry:{
    //     index:"./index.js",
    //     demo:"./demo.js",
    //     /**
    //      * 提取vendor 
    //      * 通常 都是由app.js 单一入口进行引用 这样就会产生一个bundle.js文件 随着业务范围扩展 资源体积越发增大
    //      * 从而降低了用户的页面渲染速度 另外由于只产生一个bundle.js  所以编码稍作改动更新 就要重新打包 用户也跟着重新下载  友好度不理想
    //      * 
    //      * 我们知道 库 框架等第三方模块 （只要是非业务模块） 基本上不会发生变动 就可以集中打包 然后再客户端缓存起来 从而提高用户界面的渲染速度
    //      */
    //     // vendor:['react','react-dom','react-router']
    // },
    /**
     * 
     */
    output:{ //单入口输出文件
        // path:path.join(__dirname,'assets'),//打包完成后资源产生的目录（输出位置）
        filename:"[name].js",//指定间接资源的请求位置 通过首屏js再进一步加载的js（请求位置）
        publicPath:'/dist/',
        chunkFilename:'[name].js' //异步加载资源的名字
    },
    /**
     * 多入口
     * output:{
     *  filename:'[name].[chunkhash].js'
     * }
     */
    module:{
        rules:[
            {
                test:/\.(png|svg|jpg|gif)$/,
                use:{
                    loader:'file-loader',
                    options: {
                        name: '[path][hash].[ext]'
                    }
                }
            }
            // {
            //     test:/\.css$/i,
            //     use:ExtractTextPlugin.extract({
            //         fallback:'style-loader', //fallback 用于当插件无法提取样式时所使用的loader
            //         use:'css-loader' // use 用于指定在样式提取之前采用哪些loader来预先进行处理
            //     }),
            //     exclude:/node_modules/
            // },
            // {
            //     test:/\.js$/,
            //     exclude: /(node_modules|bower_components)/,
            //     use:{
            //         loader:'babel-loader',
            //         options:{
            //             cacheDirectory:true, //开启缓存
            //             presets:[
            //                 'env',{
            //                     modules:false
            //                 }
            //             ]
            //         }
            //     }
            // }
        ]
    },
    // plugin:[ //插件
    //     new ExtractTextPlugin("[name].css") //提取后的css文件名称
    // ],
    optimization:{ //代码分割
        splitChunks:{
            /**
             * chunks: 这个属性设置的是以什么类型的代码进行分割
             *      initial入口代码
             *      all 全部
             *      async 按需加载的代码块
             */
            chunks:'async', 
            minSize:30000, //minSize 模块大小超过30KB的模块才会提取
            minChunks:1, //当某个模块至少被多少个模块引用时 才会被提取成新的chunk
            maxAsyncRequests:5, //分割后 按需加载的代码块最多允许的并行请求数
            maxInitialRequests:3,//分割后 入口代码块最多允许的并行请求数
            automaticNameDelimiter:'~', //代码块命名分隔符
            name:true, //每个缓存组打包得到的代码块的名称
            cacheGroups:{ //缓存组 定制相应的规则 //cacheGroups 外层的属性设置适用于所有的缓存组 不过每个缓存组内部都可以重新设置他们的值
                vendors:{
                    test:/[\\/]node_modules[\\/]/, //匹配node_modules中的模块
                    priority:-10, //优先级  当模块同时命中多个缓存组的规则时 分配到优先级高的缓存组
                },
                default:{
                    minChunks:2,//覆盖外层的全局属性
                    priority:-20,
                    reuseExistingChunks:true //是否复用已经从原代码块中分割出来的模块
                }
            }
        }
        /**
         * 根据自己的实际情况去设置相应的规则 每个缓存组根据规则将匹配的模块会分配到代码块中
         * 每个缓存组的打包结可以是单一chunk 也可以是多个chunk
         */
    },
    mode:"development", //模式
    /**
     * devServer:
     * 配置了之后 在package.json scripts里面添加启动命令   
     * "dev":"webpack-dev-server"  
     * webpack-dev-seraver 提供webpack开发服务 
     * 主要的功能是服务启动时 让webpack模板打包并生成静态资源 待接受浏览器请求后 进行url校验
     * 如果地址正确（即配置参数publicPath） 就从打包结果中找到对应资源返给浏览器
     * 
     * publicPath: 是开发环境静态资源的地址 一般是/dist
     * port  端口
     * open 设置为true 即当服务启动好后 自动打开地址  http://localhost:9000 
     * live-reloading 自动刷新浏览器 并监听文件变化
     */
    devServer:{ 
        publicPath: "/dist",
        port:9000,
        open:true
    }
}
module.exports = webpackConfig