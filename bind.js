/**
 * bind() 方法创建一个新的函数  在bind() 被调用时 这个新函数的this 被指定为bind()的第一个参数
 * 而其余参数将作为新函数的参数 供调用时使用
 */

 let obj = {
     a:1
 }
 setTimeout(function() {
     console.log(this)
 }.bind(obj),100)
 //{a:1}