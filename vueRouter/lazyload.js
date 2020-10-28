/**
 * 当打包构建应用时 js包会变得非常大 影响页面加载
 * 如果我们能把不同路由对应的组件分割成不同的代码块 然后当路由被访问的时候才加载对应的组件 这样就更高效了
 * 
 * 使用路由懒加载的原因：
 *  1 我们打包后的文件一般情况都是放在一个js文件当中  必然这个文件会非常大
 *  2 如果我们一次性从网络请求下来这个文件 可能会花费很长的时间 甚至浏览器会出现短暂白屏的状况
 *  3 如何避免这种情况： 使用路由懒加载就可以了
 * 
 * 路由懒加载做了什么？
 * 主要作用： 将路由对应的组件打包成一个个的js代码块
 * 只有这个路由被访问到的时候  才加载对应的组件
 */

 /**
  * 方式一： 结合Vue的异步组件和Webpack的代码分析
  * 
  * const Home = resolve => {
        require.ensure(['../components/Home.vue'],() => {
            resolve(require('../component/Home.vue'))
        })
    }
  */

/**
 * 方式二：AMD写法
 * const About = resolve => require(['../components/About.vue'],resolve)
 */

/**
* 方式三：es6 的异步组件和webpack的代码分割
*  const Home = () => import('../component/Home.vue')
*/

/**
 * 导航守卫
 *  导航守卫就是路由跳转过程中的一些钩子函数 路由跳转是一个大的过程 这个大的过程前后中等等细小的过程
 *  在每个过程都有一个函数 这个函数能够让你操作一些其他的事情  
 *  vue-router 提供了beforeEach和afterEach的钩子函数 他们会在路由即将改变前和改变后触发
 */

/**
 * 全局钩子函数
 * 可以直接在路由配置文件router.js 里编写代码逻辑  可以做一些全局性的路由拦截
 */

 //全局前置守卫
router.beforeEach((to,from,next) => {
    next()
})
//全局后置守卫
router.afterEach((to,from) => {
    console.log(to.path)
})

/**
 * 导航守卫的使用
 *  需求 在一个SPA应用中 如何修改网页标题
 *  第一应该想到在每一个路由对应的组件.vue文件中 通过mounted生命周期函数 对标题修改
 *  但是当页面比较多时 这种方式不易维护（需要在多个页面执行类似的代码）
 * 
 * 优化： 在路由配置文件中使用导航守卫 修改网页标题
 * 在钩子当中定义一些标题 可以利用meta来定义
 */
const routes = [
    {
        path:'/user/:userId',
        component:User,
        meta:{
            title:'用户'
        }
    },
    {
        path:'/profile',
        component:Profile,
        meta:{
            title:'档案'
        }
    }
]

router.beforeEach((to,from,next) => {
    /**
     * 从from跳转到to
     * from: 将要进行跳转的当前$route对象 
     * to: 跳转后$route对象
     * next(): 调用该方法后  才能进入下一个钩子
     */
    document.title = to.matched[0].meta.title
    next()
})

const router = new VueRouter({
    routes:[
        {
            path:'/foo',
            component:Foo,
            beforeEnter:(to,from,next) => {

            }
        }
    ]
})

/**
 * 其实路由钩子函数在项目发开中用的并不是非常多 一般用于登录状态的校验 没有登录跳转到登录页
 * 权限的校验等  当然随着项目的开发进展 也会有更多的功能可以用
 */