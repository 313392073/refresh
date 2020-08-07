const promiseA = new Promise((resolve,reject) => {
    resolve(777)
})
/**
 * 
 * @param {参数是一个函数} executor
 * 我们传入了一个函数 而且这个函数被立即执行 不仅如此 这个函数还会立即执行resolve和reject 
 * 说明构造函数里面有resolve和reject方法 
 */
// function Promise(executor) {
//     function resolve() {

//     }
//     function reject() {

//     }
//     //立即同步执行executor
//     executor(resolve,reject)
// }


/**
 * 02  每个promise都有一个状态可能为pending或resolved rejected
 * 而且初始状态都为pending 因此需要添加一个status来表示当前promise的状态 并且每个promise有自己的data
 */
function Promise(executor) {
    var self = this
    self.status = 'pending' //给promise对象指定status属性 初始值为pending
    self.data = undefined //给peromise对象指定一个存储结果的data
    function resolve() {

    }
    function reject() {

    }
    executor(resolve,reject)
}