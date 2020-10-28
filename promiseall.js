/**
 * promise.all中传入的是多个promise对象组成的数组  数组中所有的promise成功时才会打印res 只要有一个失败了就会打印err
 */

//  Promise.all([Promise.resolve(1),Promise.resolve(2),Promise.resolve(3)])
//  .then(res => {
//      console.log(1,res) //[1,2,3]
//  }).catch(err => {
//      console.log('错误1',err)
//  })

//  Promise.all([Promise.resolve(1),Promise.reject(2),Promise.resolve(3)])
//  .then(res => {
//      console.log(res)
//  }).catch(err => {
//      console.log('错误',err) //2
//  })

/**
 * 我们想要的是即使是失败  我们也要打印所有的信息
 * 方法：
 * 用.then 因为.then返回的也是一个promise对象
 * 不管是resolve 还是 reject 都会执行.then 返回promise对象后 就变成resolve状态了 
 * 如下
 */
// let objok = {
//     status:'ok',
// }
// let objerr = {
//     status:'error',
//     data:''
// }
// Promise.all([
//     Promise.reject(1).then(res => {Object.assign(objok,{data1:res});return objok}).catch(err => {objerr.data = err;return objerr}),
//     Promise.resolve(2).then(res => {Object.assign(objok,{data2:res});return objok}).catch(err => {objerr.data = err;return objerr}),
//     Promise.reject(3).then(res => {Object.assign(objok,{data3:res});return objok}).catch(err => {objerr.data = err;return objerr}),
// ]).then(res => {
//     console.log(res) 
//     //始终走的是这个地方 即便是Promise.all中有reject状态
// //     [ { status: 'error', data: 3 },
// //   { status: 'ok', data2: 2 },
// //   { status: 'error', data: 3 } ]
// }).catch(err => {
//     console.log('错误:',err)
// })

/**
 * 简化封装 
 *  以上写法太繁琐了 每个数组中的每个promise都要写同样的.then 
 *  我们就可以把.then 抽离出来 封装成一个函数 然后用map方法
 * 对每个promis .then一下 然后返回新的数组
 */

// function handlePromise(list) {
//     return list.map(promise => 
//         promise.then(res => {
//             return {status:'ok',data:res}
//         }).catch(err => {
//             return {status:'error',data:err}
//         })
//     )
// }
//map里面用了{} 输出不了东西
function handlePromised(list) {
    return list.map(promise => {
        return promise.then(res => {
            return {status:'ok',data:res}
        }).catch(err => {
            return {status:'error',data:err}
        })
    })
}
//map里面没有使用{}
// function handlePromise(list) {
//     return list.map(promise => 
//         promise.then(res => {
//             return {status:'ok',data:res}
//         }).catch(err => {
//             return {status:'error',data:err}
//         })
//     )
// }
Promise.all(handlePromised([Promise.reject(1),Promise.resolve(2),Promise.resolve(3)]))
.then(res => {
    console.log(res)
}).catch(err => {
    console.log("错误",err)
})

// Promise.all(handlePromise([Promise.reject(1),Promise.resolve(2),Promise.resolve(3)]))
// .then(res => {
//     console.log(res)
// }).catch(err => {
//     console.log("错误",err)
// })

// var arr = [
//     {name:"zs",age:12},
//     {name:"ls",age:13},
//     {name:"ww",age:14},
// ];

// var item =  arr.map(ele => {
//     return {
//         name:ele.name+"__技术部员工",
//         age:ele.age+10
//     }
// })
// console.log(item);