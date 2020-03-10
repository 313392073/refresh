
import axios from 'axios';
import { Indicator, Toast } from 'mint-ui';
import httpconfig from './httpconfig';
import qs from 'qs';
import {getDateApi} from './api';

let reqList = []; //请求列表
function saveReq(cb) { //存储所有的请求
    reqList.push(cb)
}
function refReq(str) { //将新的token 携带进去  请求之前的队列
    reqList.map((cb) => cb(str))
}
const instance = axios.create(httpconfig);
instance.interceptors.request.use(
    config => {
        getDate().then(res => {
            let str = getStr(res.data.body.data)
            refReq(str)
            reqList = []
        })
        let retry = new Promise((resolve,reject) => {
            saveReq((str) => {
                config.headers.mtoken = encrypt(str,key,doublekey)
                resolve(config)
            })
        },reject => {
            reject()
        })
        return retry
    },
    error => {
        return Promise.reject(error)
    }
)

function getDate() {
    return new Promise((resolve,reject) => {
        axios.get(getDateApi)
        .then(res => {
            resolve(res)
        },err => {
            reject(err)
        })
    })
}
instance.interceptors.response.use(
    response => {
        if (response.status == 200) {
            if(response.data.code == 501) {
                if (process.client) {
                    Indicator.close();
                    Toast({
                        message: '暂时没有权限访问...'
                    })
                }
                return Promise.reject(response.data) 
            }else{
                return response.data;
            }
        } else {
            if (process.client) {
                Indicator.close();
                Toast({
                    message: '网络错误,请稍后再试...'
                })
            }
            return Promise.reject(response)
        }
    },
    error => {
        if(process.client) {
            Indicator.close();
        }
        return Promise.reject(error);
    }
);
export function postUrl(url, params) {
    params = params ? params : {}
    return new Promise((resolve,reject)=> {
        instance({
            method: 'post',
            url,
            data: qs.stringify(params),
        }).then(res => {
            resolve(res)
        }).catch(err => {
            if(process.client) {
                if (err.status == 402) {
                    Toast({
                        message: "请求超时..."
                    })
                }else{
                    Toast({
                        message: '网络错误,请稍后再试...'
                    })
                }
            }
            let errobj = {
                url:err.config && err.config.url?err.config.url:'',
                body:'',
                Data:'',
                message:err.message?err.message:'网络错误,请稍后再试...'
            }
            if(err.code == 501) {
                errobj['code'] = 501
            }
            reject(errobj)
        })
    })
}
export function getUrl(url, params) {
    params = params ? params : {}
    return new Promise((resolve,reject) => {
        instance({
            method: 'get',
            url,
            params,
        }).then(res => {
            resolve(res)
        }).catch(err => {
            if(process.client) {
                if (err.status == 402) {
                    Toast({
                        message: "请求超时..."
                    })
                }else{
                    Toast({
                        message: '网络错误,请稍后再试...'
                    })
                }
            }
            let errobj = {
                url:err.config && err.config.url?err.config.url:'',
                body:'',
                Data:'',
                message:err.message?err.message:'网络错误,请稍后再试...'
            }
            if(err.code == 501) {
                errobj['code'] = 501
            }
            reject(errobj)
        })
    })
}