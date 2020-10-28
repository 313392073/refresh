import axios from 'axios'
import router from '../router'
import {Message} from 'element-ui'

let on = true
var userId = ''

//设置统一的header
axios.interceptors.request.use( config => {
    if(localStorage.token) {
        //所有的请求都要带user_id
        userId = JSON.parse(window.atob(localStorage.token.split('.')[1])).userId
        config.headers.Authorization = localStorage.token
        config.headers.user_id = userId
        return config
    }
},error => {
    return Promise.reject(error)
})

//token过期处理
axios.interceptors.response.use(response => {
    if(response.headers) {
        localStorage.setItem('token',response.headers.authorization)
    }

    if(!response.data.isOK && response.data.resCode == 888) {
        if(on) {
            on = false
            Message({
                showClose:true,
                message:'登录失效 请重新登录',
                type:'warning',
                duration:1500
            })

            setTimeout(() => {
                try {
                    window.top.parent.ckOpenfire.closeSession()
                    asyncJS.cancelEvebl()
                    return
                } catch (error) {
                    window.top.parent.aaago()
                }
                on = true
            },2000)
        }
    }
    return response
},error => {
    const {status} = error.response
    if(status == 401) {
        Message.error("token值无效，请重新登录")
        localStorage.removeItem("token")
        router.push("/login")
    }
    return Promise.reject(error)
})

/**
 * get 方法  对应get请求
 * @param {String} url  【请求的url地址】
 * @param {Object} params 【请求时携带的参数】
 */
export function get(url,params) {
    let params = params || {}
    return new Promise((resolve,reject) => {
        axios.get(url,{params:params})
        .then(res => {
            resolve(res.data)
        })
        .catch(err => {
            reject(err.data)
        })
    })
}
/**
 * POST 方法  对应post请求
 * @param {String} url 
 * @param {Object} params 
 */
export function post(url,params) {
    let params = params || {}
    return new Promise((resolve,reject) => {
        axios.post(url,params)
        .then(res => {
            resolve(res.data)
        })
        .catch(err => {
            reject(err.data)
        })
    })
}

export function postByFormEncoded(url,params) {
    let params = params || {}
    return axios({
        method:'post',
        url:url,
        data:params,
        transformRequest:[
            function(data) {
                let ret = ''
                for(let it in data) {
                    ret += encodeURIComponent(it)+"="+encodeURIComponent(data[it])+"&"
                }
                if(ret == '') {
                    return ""
                }
                return ret.substring(0,ret.length - 1)
            }
        ],
        headers:{
            'Content-Type':'application/x-www-form-urlencoded'
        }
    })
}

export default axios



export function getNowDate(year,month) {
    //设置空数据
    function setUndefined(num) {
      let list = [];
      for (let i = 0; i < num; i++) {
        list[i] = '';
      }
      return list;
    };
  
    //某月 天数
    function mGetDate(year,month) {
      var d = new Date(year,month,0);
      return d.getDate();
    };
    //格式化日期
    function formatDate(val) {
      let week = ['星期日','星期一','星期二','星期三','星期四','星期五','星期六日'];
      let date = new Date(val);
      let obj = {
        'y': date.getFullYear(), //年
        "M": date.getMonth() + 1, //月份   
        "d": date.getDate(), //日
        'w': date.getDay(),//周几
      };
      obj['M'] < 10 ? obj['M'] = "0" + obj['M'] : obj['M'];
      obj['d'] < 10 ? obj['d'] = "0" + obj['d'] : obj['d'];
      
      let dateObj = {
        date: obj['y'] + '-' + obj['M'] + '-' + obj['d'],
        week: week[obj['w']],
        weekNum: obj['w'],
      }
      
      return dateObj;
    };
  
    let list = [];
    let totalDay = mGetDate(year,month);
    
    for(let i = 1; i <= totalDay ; i++) {
      let item = formatDate(year + '-' + month + '-' + (i < 10 ? '0' + i : i) + ' 00:00:00');
      
      list[i-1] = item;
    }
    
    if (list[0].weekNum > 0) {
      let list_first = setUndefined(list[0].weekNum);
      list = list_first.concat(list);
    }
    console.log(list.length)
    if (list[list.length-1].weekNum <= 6) {
      let list_last = setUndefined(42-list.length);
      list = list.concat(list_last);
    }
    return list;
  }