var ajax = function (obj) {
    //默认赋值给一个对象 如果没有 就是空对象
    obj = obj || {}
    //默认GET 请求
    obj.type = (obj.type || 'GET').toUpperCase()
    //默认返回JSON数据
    obj.dataType = obj.dataType || 'JSON';
    //默认异步请求
    obj.async = obj.async || true
    //参数处理 执行getParams方法
    var data = getParams(obj.data)
    var http;
    /**
     * 创建AJAX 的实例适配 W3C 使用XMLHttpRequest
     * IE 使用ActiveXObject('Mcrosoft.XMLHTTP')
     */
    if(window.XMLHttpRequest) {
        http = new XMLHttpRequest()
    }else{
        http = new ActiveXObject('Microsoft.XMLHTTP')
    }

    /**
     * 请求方式的封装GET 和POST 请求
     */
    if(obj.type === 'GET') {
        http.open('GET',obj.url+"?"+data,obj.async)
        http.send()
    }else if(obj.type === 'POST') {
        http.open('POST',obj.url,obj.async)
        //设置头部参数
        http.setRequestHeader('Content-Type','application/x-www-form-urlencoded')
        //提交post数据
        http.send(data)
    }
    /**
     * 监听响应接口 如果步骤4的请求状态码为正确的就执行success 函数 
     * 如果错误 就执行error函数
     */
    http.onreadystatechange = function() {
        if(http.readyState === 4) {
            var status = http.status
            if(status >= 200 && status <300) {
                obj.success && obj.success(http.responseText,http.responseXML)
            }else{
                obj.error && obj.error(status)
            }
        }
    }
}
/**
 * 对象参数的处理 转换为需要的字符串
 */
 function getParams(data) {
     var arr = [];
     for(var param in data) {
         arr.push(encodeURIComponent(param)+"="+encodeURIComponent(data[param]))
     }
     console.log(arr)
     arr.push('randomNumber='+Math.random().replace('.'))
     return arr.join('&')
 }


 const setting = require("../../config/setting")
 const verify = require("../../config/verify")

 function tokenMiddleWare(req,res,next) {
    let token = req.headers[setting.token.header]
    if(token === undefined) {
        return next()
    } else {
        //可以token校验并将校验结果保存到请求头中
        verify.getToken(token).then(data => {
            logger.info("校验的data是：：：",data)
            req.data = data;
            return next()
        }).catch(err => {
            logger.error("校验出现错误：",err)
            return next()
        })
    }
 }
 module.exports = tokenMiddleWare

 //verify.js
const jwt = require("jsonwebtoken")
const setting = require("./setting")

const verify = {
    //设置token
    setToken(username,_id) {
        return new Promise(resolve => {
            let token = jwt.sign(
               //储存数据 自定义
                {username,_id},
                //密钥
                setting.token.signKey,
                {expiresIn:setting.token.signTime,algorithm:'HS256'}
            )
            resolve(token)
        })
    },
    getToken(token) {
        return new Promise((resolve,reject) => {
            //处理token字符串
            if(!token.split(' ').length) {
                reject({error:'The token value is empty'})
            }else{
                //解密token字符串
                let data = jwt.verify(token.split(" ")[1],setting.token.signKey)
                resolve(data)
            }
        })
    }
}
module.exports = verify

const expressJwt = require("express-jwt")
//加载token中间件
app.use(tokenMiddleWare)
app.use(expressJwt({
    secret:setting.token.signKey,
    algorithm:['HS256'],
    credentialsRequired:false,//允许无token请求
    requestProperty:'auth'//把解析的值放在req.auth上
})).unless({
    //除了这个path 其他的URL都需要验证
    path:setting.token.unRoute
})

axios.interceptor.request.use(config => {
        let token = localStorage.getItem("quthToken")
        if(token) {
            config.headers['Authorization'] = "Bearer"+token
        }
        return config
    },
    error => {
        console.log("拦截request出现错误",error)
    }
)
