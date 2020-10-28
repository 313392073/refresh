// 代码一执行就开始执行了一个宏任务-宏0
console.log('script start')

setTimeout(() => { //宏1
    console.log("北歌")
},1*2000)

Promise.resolve().then(function() { //微1-1
    console.log('promise1')
}).then(function() {
    console.log('promise2') //微1-4 这个then中的会等待上一个then执行完成之后得到其状态才会向Queue注册
})


async function foo() {
    await bar()
    console.log("async1 end")
}
foo() 

async function errorFunc() { 
    try {
        await Promise.reject("error")
    }catch(e) {
        console.log(e)
    }
    console.log('async1')
    return Promise.resolve('async1 success')
}

errorFunc.then(res => console.log(res))

function bar() {
    console.log('async2 end')
}

console.log('script end')

/**
 * 堆 动态分配的内存 大小不定也不会自动释放 存放引用类型 指那些可能由多个值构成的对象 保存在堆内存中
 * 包含引用类型的变量  实际上保存的不是变量本身 而是指向该对象的指针 可以简单理解为存储代码块
 * 堆的作用： 存储引用类型值的数据
 */

/**
 * 栈 js中的栈准确来讲应该叫调用栈 会自动分配内存空间 会自动释放 存放基本类型 简单的数据段  占据固定大小的空间
 * 栈的作用：存储基本类型值 还有一个很重要的作用  提供代码执行的环境
 */

/**
 * 队列
 *  JS中的队列可以叫做任务队列或异步队列 任务队列里存放各种异步操作所注册的回调 里面分为两种任务类型
 *  宏任务和微任务
 */

 /**
  * js运行机制的理解
  *     代码执行开启一个全局调用栈（主栈） 提供代码运行的环境 在执行过程中同步任务的代码立即执行
  * 遇到异步任务将异步的回调注册到任务队列中 等待同步代码执行完毕查看异步是否完成 如果完成将当前异步任务的回调拿到主栈中执行
  */
