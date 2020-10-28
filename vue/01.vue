/**
 * vue  路由传参： query、params+动态路由传参
 */
1 query 通过path切换路由 接受 this.$route.query
<router-link :to="{path:'Detail',query:{id:1}}">GO Detail页面</router-link>
2 params通过name切换路由 接收 this.$route.params
<router-link :to="{name:'Detail',params:{id:1}}">GO Detail页面</router-link>

注意：params传参时 如果没有在路由中定义参数  也是可以传递过去的 同时也能接收到 但是一旦页面刷新 这个参数就不存在了

配置项目跨越：
    proxyTable: {
        '/api':{ //用'/api'开头，代理所有请求到目标服务器
            target:'http:xxx.com',//接口域名
            changeOrigin:true, //是否启用跨域
            pathRewrite:{
                '^/api':''
            } 
        }
    }
注意：配置好后一定要关闭原来的server 重新npm run dev启动项目 不然无效

axios封装和api接口的统一管理
    axios的封装 主要是用来帮我们进行请求的拦截和响应的拦截 在请求的拦截中 我们可以携带userToken post请求头 
    qs对post提交数据的序列化等
    在响应的拦截中 我们可以根据状态码来进行错误的统一处理等
    axios接口的统一管理 是做项目时必须的流程 这样可以方便我们管理我们的接口 在接口更新时 我们不必再返回到我们的业务代码中去修改接口

UI库的按需加载：
    基本上是通过babel-plugin-import 插件来支持按需加载的  
    eg: 
    1 安装 npm i vant -S
    2 安装babel-plugin-import 插件使其按需加载： npm i babel-plugin-impport -D
    3 在.babelrc文件中添加插件配置
    libraryDirectory {
        "plugins":[
            ["import",{
                "libraryName":"vant",
                "libraryDirectory":"es",
                "style":true
            }]
        ]
    }

定时器的问题：
    通过$once这个事件侦听器在定义完定时器之后的位置来清除定时器
    eg:
    const timer = setInterval(() => {
        //某些定时器操作
    },500)
    //通过$once来监听定时器 在beforeDestory钩子可以被清除
    this.$once("hook:beforeDestory",() => {
        clearInterval(timer)
    })

rem文件的导入问题:
    我们在做手机端时  适配是必须要处理的一个问题 例如  我们处理适配的方案就是通过些一个rem.js 原理很简单
    就是根据网页尺寸计算html的font-size大小 
    ;(function(c,d){var e=document.documentElement||document.body,a="orientationchange" in window?"orientationchange":"resize",b=function(){var f=e.clientWidth;e.style.fontSize=(f>=750)?"100px":100*(f/750)+"px"};b();c.addEventListener(a,b,false)})(window);

引入： 在main.js中 直接import './config/rem' 导入即可 

Vue-Awesome-Swiper基本能解决你所有的轮播需求
打包后生成很多的.map文件的问题：
    项目打包后  代码都是经过压缩加密的  如果运行时报错  输出的错误信息无法准确得知是哪里的代码报错 
    而生成的.map后缀文件 就可以像未加密的代码一样  准确的输出是哪一行哪一列有错  可以通过设置来不生成该类文件 
    但是我们在生成环境是不需要.map文件的 所以可以在打包时不生成这些文件

    解决： 在config/index.js文件中  设置productionSourceMap:false 就可以不生成.map文件
fastClick的300ms延迟解决方案
    移动项目 点击事件会有300ms延迟的问题  可以使用fastClick解决
    使用： 
      安装： npm i fastclick -S
      在main.js中引入fastClick和初始化：
    import FastClick from 'fastclick' //引入插件
    FastClick.attach(document.body) //使用fastclick
路由懒加载
    路由懒加载可以帮我们在进入首屏时不用加载过度的资源  从而减少首屏加载速度
    export default new Router({
        routes:[
            {
                path:'/',
                name:'Index',
                component:resolve => require(['@/view/index/index'],resolve)
            }
        ]
    })
开启gzip压缩代码：
    vue-cli3 cnpm i compression-webpack-plugin@1.1.11
    然后在config/index.js中开启即可
        build:{
            productionGzip:true
        }

vue获取数据的两种方式的实践+简单骨架屏实现
    1 导航完成之后获取：先完成导航 然后在接下来的组件生命周期钩子中获取数据 在数据获取期间显示"加载中"之类的指示
    2 导航完成之前获取： 导航完成前 在路由进入的守卫中获取数据  在数据获取成功后执行导航
mixins混入简化常见操作
    在开发中 我们经常会遇到金钱会保留两位小数 时间戳转换等操作 每次我们会写成一个公共函数 然后在页面里面的filters进行过滤
    这种方法感觉每次需要用到 都要写一遍在filters 比较烦 
    解决：
        import {u_fixed} from './tool'
        const mixins = {
            filters:{
                //保留两位小数
                mixin_fixed2(val) {
                    return u_fixed(val)
                }
                //数字转汉字，16000=>1.60万
                mixin_num2chinese(val) {
                    return val>999?u_fixed(val/10000)+"万":val
                }
            }
        }
        export default mixins
        新建一个mixins.js 把我们需要混入的内容都写在里面  这样子的话 就可以在我们需要的vue页面import 这个js
        然后声明一下混入就好 再然后就可以像正常的方式去使用就好了
        import mixins from '@/utils/mixins'
        export default {
            name:'VoteDetail',
            mixins:[mixins],
        }