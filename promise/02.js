/**
 * 在Promise原型对象上添加方法
 */
/**
 * Promise 原型对象的then 指定一个成功/失败的回调函数 返回一个新的promise对象
 */
Promise.prototype.then = function(onResolved,onRejected) {
    var self = this
    return new Promise((resolve,reject) => {
        if(self.status === 'pending') {
            //promise当前状态还是pending状态  将回调函数保存起来
            self.callbacks.push({
                onResolved(){onResolved(self.data)},
                onRejected(){onRejected(self.data)}
            })
        }else if(self.status === 'resolved') {
            setTimeout(() => {
                onResolved(self.data)
            })
        }else{
            setTimeout(() => {
               onResolved(self.data) 
            })
        }
    })
}

/**
 * Promise原型对象的。catch 指定一个失败的回调函数 返回一个新的promise 
 */
Promise.prototype.catch = function(onRejected) {

}