//创建路由文件
import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
export function createRouter() {
    return new Router({
        mode:'history',
        routes:[
            //...
        ]
    })
}
//更新app
import Vue from 'vue'
import App from './App.vue'

import {createRouter} from './router'
export function createApp() {
    //创建router实例
    const router = createRouter()
    const app = new Vue({
        router,
        render: h => h(App)
    })
    //返回app和router
    return {
        app,router
    }
}

import {createApp} from './app'
export default context => {
    return new Promise((resolve,reject) => {
        const {app,router} = createApp()
        //设置服务端router的位置
        router.push(context.url)
        router.onReady(() => {
            const matchedComponents = router.getMatchedComponents()
            if(!matchedComponents.length) {
                return reject({code:404})
            }
            resolve(app)
        },reject)
    })
}


server.get('*',(req,res) => {
    const context = {url:req.url}
    createApp(context).then(app => {
        render.renderToString()(app,(err,html) => {
            if(err) {
                if(err.code === 404) {
                    res.status(404).end('Page not found')
                }else{
                    res.status(500).end("Internal Server Error")
                }
            }else{
                res.end(html)
            }
        })
    })
} )

//store.js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
/**
 * 假定我们有一个可以返回Promise 的通用API 
 */
import {fetchItem} from './api'

export function createStore() {
    return new Vuex.Store({
        state:{
            items:{}
        },
        actions:{
            fetchItem({commit},id) {
                //syore.dispatch() 会返回Promise 一边我们能够知道数据在何时更新
                return fetchItem(id).then(item => {
                    commit('setItem',{id,item})
                })
            }
        },
        mutations:{
            setItem(state,{id,item}) {
                Vue.set(state.items,id,item)
            }
        }
    })
}

//app.js

import Vue from 'vue'
import App from './App.vue'
import {createRouter} from './router'
import {createStore} from './store'
import {sync} from 'vuex-router-sync'
export function createApp() {
    //创建router 和store 实例
    const router = createRouter()
    const store = createStore()
    //同步路由状态（route state）到store
    sync(store,router)
    //创建应用程序实例  将router和store注入
    const app = new Vue({
        router,
        store,
        render:h => h(App)
    })
    return {app,router,store}
}


//entry-server.js
import {createApp} from './app'
export default context => {
    return new Promise((resolve,reject) => {
        const {app,router,store} = createApp()
        router.push(context.url)

        router.onReady(() => {
            const matchedComponents = router.getMatchedComponents()
            if(!matchedComponents.length) return reject({code:404})
        })

        //对所有匹配的路由组件调用'asyncData'
        Promise.all(matchedComponents.map(Component => {
            if(Component.asyncData) {
                return Component.asyncData({
                    store,
                    route:router.currentRoute
                })
            }
        })).then(() => {
            //在所有预取钩子（preFetch hook）resolve后
            //我们的store现在已经填充渲染应用程序所需的状态
            //当我们将状态附加到上下文 并且template 选项用户renderer时 状态将自动序列化未`window.__INITIAL_STATE__`并注入HTML
            context.state = store.state
            resolve(app)
        }).catch(reject)
    },reject)
}


const source = this.$axios.CancelToken.source()
this.$axios.$get('/',{
    cancelToken:source.token
}).catch(error => {
    if(this.$axios.isCancel(error)) {
        console.log('Request canceled',error)
    }else{

    }
})
this.$axios.$post('/post',{
    name:'new name'
},{
    cancelToken:source.token
})
source.cancel('Operation canceled by the user.')

//or

const {CancelToken} = this.$axios
let cancel

this.$axios.$get('/get',{
    cancelToken:new CancelToken( c => {
        cancel = c
    })
})
cancel()

//vue directive  注册或获取全局指令
Vue.directive('my-directive',{
    bind:function(){},
    inserted:function(){},
    update:function(){},
    ComponentUpdated:function(){},
    unbind:function(){}
})

MyPlugin.install = function(Vue,options) {
    // 添加全局方法或property
    Vue.myGlobalMethod = function() {

    },
    //添加全局资源
    Vue.directive('my-directive',{
        bind(el,binding,vnode,oldVnode)
    })
    //注入组件选项
    Vue.mixin({
        cerated:function() {

        }
    })
    //添加实例方法
    Vue.prototype.$mtMethod = function(methodOptios) {
        
    }
}
