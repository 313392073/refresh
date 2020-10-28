/**
 * var
 * var 声明可以在包含它的函数  模块  命名空间  或全局作用域内部任何位置被访问
 * 它包含的代码块对此没有什么影响  有些人称此为*var 作用域或函数作用域* 函数参数也是用函数作用域
 */
// function f() {
//     var a = 1;
//     a = 2;
//     var b = g();
//     a = 3;
//     return b;
//     function g() {
//         return a
//     }
// }
// console.log(f()) //2

// function b(shouldInitialize:boolean) {
//     if(shouldInitialize) {
//         var x = 10;
//     }
//     return x
// }
// console.log(b(true)) //10
// console.log(b(false)) //undefined
/**
 * 我们传给setTimeout的每一个函数表达式实际上都引用了相同作用域的同一个i
 * 
 * setTimeout 在若干毫秒后执行一个函数  并且是在for循环结束后 
 * for循环结束后 i的值为10 所以当函数被调用的时候  他会打印出10！
 */
// for(var i=0;i<10;i++) {
//     setTimeout(function() {
//         console.log(i)
//     },1000*i)
// }
// 10

// for(var i=0;i<10;i++) {
//     (function(i) {
//         setTimeout(function() {
//             console.log(i)
//         },1000*i)
//     })(i)
// }

/**
 * 块作用域
 * 当用let声明一个变量  它使用的是 词法作用域或块作用域
 * 不同于使用var声明的变量那样可以再包含他们的函数外访问
 * 块作用域变量在包含他们的块或for循环之外是不能访问的
 * 
 * 拥有块级作用域的变量的一个特点是 他们不能在被声明之前读或写
 * 虽然这些变量始终"存在"于他们的作用域里 但是直到声明它的代码之前的
 * 区域都属于暂时性死区
 */

//  function ff(input:boolean) {
//      let a = 100;
//      if(input) {
//         let b = a+1
//         return b
//      }
//      return a
//  }
//  console.log(ff(false))

// function sumMatrix(matrix:number[][]) {
//     let sum = 0;
//     for(let i=0;i<matrix.length;i++) {
//         var currentRow = matrix[i]
//         for(let i=0;i<currentRow.length;i++) {
//             sum += currentRow[i]
//         }
//     }
//     return sum;
// }
// var arr = [[1,2,3,4],[1,2,3,4]]
// console.log(sumMatrix(arr))

/**
 * const 
 *  const声明与let相似  但是const 被赋值后不能再改变
 * 他们拥有与let相同的作用域规则 但是不能对他们重新赋值
 */

 /**
  * 解构
  *  对象的解构 注意  需要使用括号将他括起来
  *  因为js通常会将以{起始的语句解析为一个块 
  * 你可以在对象里使用...语法创建剩余变量
  * 
  *   ({a,b} = {a:'baz',b:101})
  * 
  * let {a,...passthrough} = {a:'foo',b:12,c:'bar'}
  */

//   function f([first,second]: [number,number]) {
//       console.log(first,second)
//   }
//   f([1,2])

// let [first,...rest] = [1,2,3,4]
// console.log(first,rest)
// let [second] = [5,6,7,8]
// console.log(second)

// let defaults = {
//     food:'spicy',
//     price:'$$',
//     ambiance:'noisy'
// }
// let search = {
//     food:'rich',
//     ...defaults,
// }
// console.log(search)

class C {
    p = 12;
    m() {
        console.log(111)
    }
}
let c = new C()
let clone = {...c}
console.log(clone)
