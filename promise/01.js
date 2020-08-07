/**
 * 先写出构造函数  将promise向外暴露
 */

 (function(window) {
     /**
      * Promise 构造函数
      * @param {执行函数} executor 
      */
    function Promise(executor) {

    }
    //向外暴露Promise
    window.Promise = Promise
 })()