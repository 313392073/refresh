/**
 * 添加Promise函数对象上的方法
 */

 /**
  * promise 函数对象的resolve 方法
  * 返回一个指定结果的promise对象
  */
 Promise.resolve = function(value) {

 }
/**
 * Promise函数对象reject方法
 * 返回一个指定reason的失败状态的promise对象 
 */
 Promise.reject = function(value) {

 }

 /**
  * Promise函数对象的all方法 返回一个peomise对象 只有当所有promise都成功时返回的promise状态才成功 
  */
 Promise.all = function(value) {

 }
/**
 * Promise函数对象的race方法  返回一个promise对象  状态由第一个完成的promise决定
 */
 Promise.race = function(value) {

 }
 /**
  * 通过上面的注释可以知道 不管是Promise原型对象上的方法还是Promise函数对象上的方法 他们的执行结果都将返回一个Promise对象
  */