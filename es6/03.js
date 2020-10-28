/**
 * 块作用域声明
 *   在js中变量作用域的基本单位总是function 如果需要创建一个作用域的块儿 除了普通的函数声明以外  最流行的方法
 * 就是使用立即被调用的函数表达式
 */
// var a = 2;
// (function() {
//     var a = 3
//     console.log(a) //3
// })()
// console.log(a) //2

/**
 * let 声明
 *  但是 现在我们可以创建绑定到任意的块儿上的声明了 他称为块儿作用域 这意味着一对{。。。}就是我们用来创建
 * 一个作用域所需要的全部 var 总是声明附着在外围函数（或者全局 ）上的变量 取而代之的是 使用let:
 * let 声明附着在块儿作用域  而且在他们出现在块儿中之前是不会被初始化的
 */
// var a = 2;
// {
//     let a = 3;
//     console.log(a)
// }
// console.log(a)

// let a = 2;
// if(a>1) {
//     let b = a*3; 
//     console.log(b) //6

//     for(let i=a;i<=b;i++) {
//         let j = i+10;
//         console.log(j) //12 13 14 15 16
//     }
//     let c = a+b;
//     console.log(c) //8
// }

/**
 * 在for头部中的let i 不仅是为for循环本身声明了一个i 而且它为循环的每一次迭代都重新声明了一个新的i
 * 这意味着在循环迭代内部创建的闭包都分别引用着那些在每次迭代中创建的变量 
 * 如果你尝试在这段相同代码的for循环头部使用var i 那么你会得到5而不是3
 * 因为在被引用的外部作用域中只有一个i 而不是为每次迭代的函数都有一个i被引用
 */
// var funcs = []; //0 1 2 3 4 
// for(let i=0;i<5;i++) {
//     funcs.push(function() {
//         console.log(i)
//     })
// }
// funcs[3]()

// var funcs = [];
// for(var i=0;i<5;i++) {
//     let j = i;
//     funcs.push(function() {
//         console.log(j)
//     })
// }
// funcs[3]()

/**
 * const 声明
 *    const 创建的是常量
 *  变量持有的值一旦在声明时被设定就不允许你改变了 一个const声明必须拥有一个明确的初始化
 *  如果想要一个持有undefined值的常量 你必须声明const a = undefined来得到它
 *  常量不是一个作用域值本身的制约 而是作用于变量对这个值的赋值  换句话说 值不会因为const而冻结或不可变
 *  只是它的赋值被冻结了 如果这个值是一个复杂值 比如对象或数组 那么这个值的内容仍然是可以被修改的
 */

// {
//     const a = [1,2,3];
//     a.push(4)
//     console.log(a)
//     // a = 42
// }
/**
 * 变量a实际上没有持有一个恒定的数组 而是持有一个指向数组的恒定的引用 数组本身可以自由变化
 * 
 * 将一个对象或数组作为常量赋值意味着这个值在常量的词法作用域消失以前是不能够被垃圾回收的
 * 因为指向这个值的引用是永远不能解除的 
 * 
 * 实质上 const 声明强制实行了我们许多年在代码中用文体来表明的东西：
 * 我们声明一个名称全由大写字母组成的变量并赋予它某些字面值 我们小心照看
 * 它以使它永远不改变 var赋值没有强制性 但是现在const赋值上有了 他可以帮你发现不经意的改变
 */

/**
 * 块儿作用域的函数
 *  从es6开始 发生在块儿内部的函数声明现在被明确规定属于那个块儿的作用域 
 *  在es6之前 语言规范没有要求这一点 但是许多实现不管怎样都是药这么做的 
 */
// {
//     foo();
//     function foo() {
//         console.log(111)
//     }
// }

// if(true) {
//     function foo() {
//         console.log(1)
//     }
// }else{
//     function foo() {
//         console.log(2)
//     }
// }
// foo()

/**
 * 扩散/剩余
 *  es6引入了一个新的...操作符  根据你在何处以及如何使用它  他一般被称作 扩散 或 剩余操作符
 *  
 *  当...在一个数组前面被使用时 他就将数组"扩散"为它的个别的值
 *  通常你将会在前面所展示的那样的代码段中看到这种用法 他将一个数组扩散为函数调用的一组参数
 *  在这种用法中 ...扮演了apply(..)方法的简约语法替代品
 */
// function foo(x,y,z) {
//     console.log(x,y,z)
// }
// foo(...[1,2,3])

// foo.apply(null,[1,2,3])

// var a = [2,3,4];
// var b = [1,...a,5];
// console.log(b) //[1,2,3,4,5] 在这里的行为就像[1].concat(a,[5])
/**
 * 另一种...的用法常见于一种 实质上相反的操作  与将值散开不同 ...将一组值 收集到一个数组中
 */
// function foo(x,y,...z) {
//     console.log(x,y,z)
// }
// foo(1,2,3,4,5)

//如果没有任何命名参数 ...会收集所有的参数值
// function foo(...args) {
//     console.log(args)
// }
// foo(1,2,3,4)

/**
 * 注意：在foo(..)函数声明中 ...args经常因为你向其中收集参数的剩余部分而被称为"剩余参数"
 */

// function foo(...args) {
//     //args 已经是一个真正的数组了

//     //丢弃args中的第一个元素
//     args.shift()

//     //将args的所有内容作为参数值传给 console.log(...)
//     console.log(...args)
// }

// function bar() {
//     //将arguments转换为一个真正的数组
//     var args = Array.prototype.slice.call(arguments)
//     //在末尾添加一些元素
//     args.push(4,5)
//     //过滤掉所有奇数
//     // args = args.filter(function(v) {
//     //     return v%2 == 0
//     // })
//     //将args的所有内容作为参数值传给foo()
//     foo.apply(null,args)
// }
// bar(0,1,2,3)

/**
 * 默认参数值
 *      也许在js中 最常见的惯用法之一就是为函数参数设置默认值 
 * 注意： undefined意味着缺失 也就是 在undefined和缺失之间没有区别 至少是函数参数值而言
 */

// function foo(x,y) {
//     x = x || 11;
//     y = y || 31;
//     console.log(x+y)
// }
// foo()
// foo(1,2)
// foo(null,2)

// function foo(x=11,y=31) {
//     console.log(x+y)
// }
// foo()

/**
 * 默认值表达式
 *  函数默认值可以比基本类型简单值复杂的多 可以是任何合法的表达式 甚至是函数调用
 */

// function bar(val) {
//     console.log("bar called")
//     return y+val
// }

// function foo(x = y+3,z = bar(x)) {
//     console.log(x,z)
// }
// var y = 5;
// // foo()
// foo(10)

/**
 * 在一个函数声明中的正式参数是在他们自己的作用域中 不是在函数体的作用域中 这意味着在一个默认值
 * 表达式中的标识符引用会首先在正式参数的作用域中查找标识符 然后再查找一个外部作用域
 */
/**
 * 解构
 *  es6引入一个称为解构的新语法特性 将它考虑为结构化赋值 
 */
// function foo() {
//     return [1,2,3]
// }
// var tmp = foo(),a = tmp[0],b = tmp[1],c = tmp[2];
// console.log(a,b,c)

// function bar() {
//     return {
//         x:4,
//         y:5,
//         z:6
//     }
// }
// var tmp = bar(),x=tmp.x,y=tmp.y,z=tmp.z;
// console.log(x,y,z)

/**
 * 从一个数组中取得索引的值 或从一个对象中取得属性并手动赋值 可以被认为是结构化赋值
 * es6为解构增加了一种专门的语法 具体称为 数组解构和对象解构 
 */
// var [a,b,c] = foo();
// var {x:x,y:y,z:z} = bar();
// console.log(a,b,c)
// console.log(x,y,z)

// var count = 0;
// var errs = [];
// var data = [];
// function request(url) {
//     ajax({url:url}).success(function() {
//         count++;
//         callback()
//     }).fail(function() {
//         count++;
//         errs.push()
//         callback()
//     })
// }
// function callback() {
//     if(count === data.length) {
//         console.log("done!")
//     }
// }
// data.forEach(request)

/**
 * 并行请求和请求结束确定
 */
// function request(param) {
//     return new Promise(resolve => {
//         setTimeout(() => {
//             console.log(param)
//             resolve()
//         },param)
//     })
// }
// const items = [500,400,300,200,100]

// //直接使用for循环
// (() => {
//     for(let item of items) {
//         request(item)
//     }
//     console.log('end')
// })()
// //for循环使用async-await
// (async () => {
//     for(let item of items) {
//         await request(item)
//     }
//     console.log('end')
// })()

// (() => {
//     Promise.all(items.map(request)).then(res => {
//         console.log('end')
//     })
// })()

// function request(param) {
//     return new Promise((resolve,reject) => {
//         setTimeout(() => {
//             if(param === 200) {
//                 return reject({
//                     status:'error',
//                     data:param
//                 })
//             }
//             resolve({
//                 status:'success',
//                 data:param
//             })
//         },param)
//     })
// }
// const items = [500,400,300,200,100]

const onSubmit = (params = {}) => {
    const result = false;
    if(params) {
        result = true
    }
    return result
}