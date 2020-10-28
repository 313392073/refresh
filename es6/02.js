/**
 * 构造函数接受一个callback 调用callback的时候 需要传入resolve,reject两个方法
 */
class Deferred {
    constructor(callback) {
        const resolve = () => {

        }
        const reject = () => {

        }
        try {
            callback(resolve,reject)
        }catch(error) {
            reject(error)
        }
    }
}