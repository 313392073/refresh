/**
 * fetch 是一种使用promise为构建块的现代异步网络请求方法 但是IE的兼容性不是很好
 * 不支持的浏览器可以使用 fetch polyfill 
 * 
 * 
 * fetch 是XMLHttpRequest的一种替代方案 fetch 就是原生的js 不是ajax的进一步封装
 * 
 * 区别：
 *  fetch 返回的promise不会拒绝httphttp的错误状态 即使响应是404或者500 他们不被认为是网络错误
 *  只有当网络故障或者请求被阻止时 才会标记为reject 因此成功的fetch()检查不仅要包含promise被resolve
 *  还要包括response.ok 属性为true 该属性是检查response 的状态是否200-299这个范围内来确定的
 * 
 *  默认情况下 fetch 不会接收或者发送cookies
 * 
 *  fetch 的优势
 * 
 *  fetch 请求相对来说语法简洁 代码更少 更具语义化 且数据处理过程更加清晰
 *  基于标准的Promise实现  且支持async/await 避免了回调地狱
 *  接口更加的合理化 因为ajax 是将所有不同性质的接口都放在了XHR对象身上 而fetch 则是分散在不同的对象上 如Headers Response Request等
 *  可以在ServiceWorker中使用
 */

// const p2 = new Promise((res,reject) => {
//     setTimeout(() => {
//         reject(2)
//     },2000)
// })

// let resolvePromise = p2.then(res => res).catch(err => err)
// resolvePromise.then(res => {
//     console.log('res',res)
// }).catch(err => {
//     console.log('err',err)
// })

let transferedPromises = (list) => {
    return list.map(promise => {
      return promise.then(res => res).catch(err => err)
    })
}




const p1 = new Promise((res,rej) => {
    setTimeout(() => {
        res(1)
    }, 1000);
})
const p2 = new Promise((res,rej) => {
    setTimeout(() => {
        rej('err 2')
    }, 2000);
})

const p3 = new Promise((res,rej) => {
    setTimeout(() => {
        res(3)
    }, 3000);
})

let promises = [p1,p2,p3];
let promiseArr = transferedPromises(promises) 
Promise.all(promiseArr).then(resArr => {
    console.log(resArr)
})
