import axios from 'axios'
/**
 * 请求拦截器  同一添加token鉴权认证
 */
axios.interceptors.request.use(config => {
    config.headers.x_accrss_token = token;
    return config
},error => {
    return Promise.reject(error)
})

/**
 * 响应拦截器 
 */

 axios.interceptors.response.use(response => {
     if(response.data.code === 401) { //token失效
        sessionStorage.user = ''
        sessionStorage.token = ''
        sessionStorage.href = '/' //返回登录页
        return Promise.reject(msg) //接口Promise返回错误状态 错误信息msg 可有后端返回 也可以我们自己定义
     }
     //接口请求失败  具体根据实际情况判断
     if(response.status !== 200 || response.data.code !== 200) {
        message.error(msg) //提示错误信息
        return Promise.reject(msg) //接口Promise返回错误状态
     }
     return response
 },error => {
     if(axios.isCancel(error)) {
        requestList.length = 0
        throw new axios.Cancel('cancel request')
     }else{
         message.error('网络请求失败，请重试')
     }
     return Promise.reject(error)
 })

 /**
  * 
  * @param {String} url :请求的url
  * @param {Object} params :请求的参数
  * @param {Object} config :请求的header信息
  * @param {String} method :请求的方法
  */
 const request = function({url,params,config,method}) {
    let str = ""
    if(method === 'get' && params) {
        Object.keys(params).forEach(item => {
            str += `${item}=${params[item]}&`
        })
    }
    return new Promise((resolve,reject) => {
        axios[method](str?(url+"?"+str.substring(0,str.length-1)):url,params,Object.assign({},config))
        .then(response => {
            resolve(response.data)
        }).catch(err => {
            reject(err)
        })
    })
 }