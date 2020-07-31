function process(callback) {
    setTimeout(() => {
        console.log("timeout")
        callback()
    }, 1000);
}

process(function doSomething() {
    console.log("do something")
})

/**
 * 
 * then 函数就是把传入的函数放在一个回调数组里面 这也让原本单个的回调变成支持许多回调
 * resolve 函数就是传回我们将要执行的函数中的回调 他会调用每一个then里面添加的回调  
 * 最后 执行传入的函数 并且返回this 
 */
function Promise(fn) {
    const callbacks = [];
    // this.then(callback) {
    //     callbacks.push(callback)
    // }

    function resolve(value) {
        callbacks.forEach(callback => callback && callback(value))
    }
    fn(resolve) 
    return this
}
var p = Promise(function process(resolve) {
    setTimeout(() => {
        console.log("timeout")
        resolve()
    },1000)
})
p.then(() => console.log("timeout!!"))

class Promise {
    callbacks = [];
    state = "pending" //增加状态
    value = null //保存结果
    constructor(fn) {
        fn(this._resolve.bind(this))
    }
    then(onFulfilled) {
        return new Promise(resolve => {
            this._handle({
                onFulfilled:onFulfilled || null,
                resolve:resolve
            })
        })
    }
    _handle(callback) {
        if(this.state === 'pending') {
            this.callbacks.push(callback)
            return
        }
        //如果then中没有传递任何东西
        if(!callback.onFulfilled) {
            callback.resolve(this.value)
            return
        }
        var ret = callback.onFulfilled(this.value)
        callback.resolve(ret)
    }
    _resolve(value) {
        if(value && (typeof value === 'object' || typeof value === 'function')) {
            var then = value.then
            if(typeof then === 'function') {
                then.call(value,this._resolve.bind(this))
                return
            }
        }
        this.state = 'fulfilled'
        this.value = value
        this.callbacks.forEach(callback => this._handle(callback))
    }
}

const mockAjax = (url,s,callback) => {
    setTimeout(() => {
        callback(url+"异步请求耗时"+s+"秒","出错了")
    },1000*s)
}
new Promise((resolve,reject) => {
    mockAjax('getUserId',1,function(result,error) {
        if(error) {
            reject(error)
        }else{
            resolve(result)
        }
    }).then(result => {
        console.log(result)
    },error => {
        console.log(error)
    })
})


function User() {
    var username,password;
    function doLogin(user,pw) {
        username = user
        password = pw
    }
    var publicAPI = {
        login:doLogin
    }
    return publicAPI
}
var fred = User()
fred.login('fred','12Battery34!')


import {baseURL} from './config.js'
import axios from 'axios'
import store from '@/store'
import {Loading,Message} from 'element-ui'
//每请求一次创建一个唯一的axios
class AjaxFetch {
    constructor() {
        this.config = {
            withCredentials:true, //跨域凭证
            responseType:'json',
            baseURL:baseURL,
            timeout:3000
        }
        this.queue = {}
    }

    request(option) {
        //创建一个axios实例
        let config = {
            ...this.config,
            ...option
        }

        let instance = axios.create()
        this.interceptors(instance,config.url)
        return instance(config)
    }

    interceptors(instance,url) {
        instance.interceptors.request.use(
            (config) => {
                let CancelToken = axios.CancelToken
                //设置取消函数
                config.cancelToken = new CancelToken((c) => {
                    store.commit('push_cancel',{fn:c,url:url}) //存放取消的函数实例
                })
                if(Object.keys(this.queue).length == 0) {
                    this._loading = Loading.service({
                        lock:true,
                        text:'Loading',
                        spinner:'el-icon-loading',
                        background:'rgba(0,0,0,0.7)'
                    })
                }
                this.queue[url] = url
                return config
            },(err) => {
                return Promise.reject(err)
            }
        )
        instance.interceptors.response.use(
            (response) => {
                let {data} = response
                store.commit("filter_cancel",url) //存放取消的函数实例
                delete this.queue[url]
                if(Object.keys(this.queue).length == 0) {
                    this._loading.close()
                }
                switch(data.code) {
                    case 500:
                        Message({
                            type:'error',
                            message:data.msg
                        })
                    break;
                    case 401:
                        Message({
                            type:'error',
                            message:data.msg
                        })
                    break
                }
                return data;
            },
            (err) => {
                delete this.queue[url]
                if(Object.keys(this.queue).length == 0) {
                    this._loading.close()
                }
                return Promise.reject(err)
            }
        )
    }
}