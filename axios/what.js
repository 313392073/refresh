/**
 * axios 是一个基于promise的http库  可以在浏览器和node.js中
 * axios 有什么特性
 * 1 从浏览器中创建XMLHttpRequests
 * 2 从node.js 创建http请求
 * 3 支持Promise API
 * 4 拦截请求和响应
 * 5 转换请求数据和响应数据
 * 6 取消请求
 * 7 自动转换JSON数据
 * 8 客户端支持防御XSRF
 * 
 * 实际上 axios 可以用在浏览器和node.js中 是因为 他会自动判断当前环境是什么
 * if 浏览器  就会基于XMLHttpRequests实现axios
 * if node.js 环境 就会基于node内置核心模块http实现axios
 * 
 * axios 的基本原理就是
 *  axios 还是属于XMLHttpResuest 因此需要实现一个ajax 或基于http
 *  还需要一个promise对象来对结果进行处理
 */

class Axios {
    constructor() {

    }
    request(config) {
        return new Promise(resolve => {
            const {url = '',method='get',data={}} = config
            //发送ajax请求
            const xhr = new XMLHttpRequest()
            xhr.open(method,url,true)
            xhr.onload = function() {
                console.log(xhr.responseText)
                resolve(xhr.responseText)
            }
            xhr.send(data)
        })
    }
}
/**
 * 最终导出axios 的方法 即实例的request方法
 */
function CreateAxiosFn() {
    let axios = new Axios()
    let req = axios.request.bind(axios)
    return req
}
//得到最后的全局变量axios
let axios = CreateAxiosFn()

const methodsArr = ['get','delete','head','options','put','patch','post'];

methodsArr.forEach(met => {
    Axios.prototype[met] = function() {
        console.log(`执行${met}方法`)
        if(['get','delete','head','options'].includes(met)) {
            /**
             * 2个参数（url[,config]）
             */
            return this.request({
                method:met,
                url:arguments[0],
                ...arguments[1] || {}
            })
        }else{
            /**
             * 3个参数（url[,data[,config]]）
             */
            return this.request({
                method:met,
                url:arguments[0],
                data:arguments[1]||{},
                ...arguments[2]||{}
            })
        }
    }
})

const utils = {
    extend(a,b,context) {
        for(let key in b) {
            if(b.hasOwnProperty(key)) {
                if(typeof b[key] === 'function') {
                    a[key] = b[key].bind(context)
                }else{
                    a[key] = b[key]
                }
            }
        }
    }
}

function CreateAxiosFn() {
    let axios = new Axios()
    let req = axios.request.bind(axios)

    utils.extend(req,Axios.prototype,axios)
    return req
}

//添加请求拦截器
axios.interceptors.request.use(function(config) {
    //在发送请求之前做些什么
    return config
},function(error) {
    //对请求错误做些什么
    return Promise.reject(error)
})
//添加响应拦截器
axios.interceptors.response.use(function(response) {
    //对响应数据做点什么
    return response
},function(error) {
    //对响应错误做点什么
    return Promise.reject(error)
})

/**
 * 在发送一个请求的时候会先执行请求拦截器的代码 然后再真正地执行我们发送的请求 这个过程会对config 也就是我们发送请求时传送地参数进行一些操作
 * 在接受响应地时候  会先执行响应拦截器的代码 然后再把响应的数据返回来 这个过程会对response也就是响应的数据进行一系列操作
 */

class InterceptorsManage {
    constructor() {
        this.handlers = []
    }
    use(fullfield,rejected) {
        this.handlers.push({
            fullfield,
            rejected
        })
    }
}