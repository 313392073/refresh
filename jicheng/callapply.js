/**
 * 谈一谈你对this call apply和bind的理解
 * 1 在浏览器里 在全局范围内this 指向window对象
 * 2 在函数中 this 永远指向最后调用他的那个对象
 * 3 构造函数中 this 指向new出来的那个新的对象
 * 4 call apply bind中的this被强制绑定在指定的那个对象上
 * 5 箭头函数中this比较特殊 箭头函数this为父作用域的this 而不是调用时的this
 *   要知道前四种方式都是调用时确定 也就是动态的  而箭头函数的this 指向是静态的 声明的时候就确定了下来
 * 6 apply call bind都是js给函数内置的一些API 调用他们可以为函数指定this的执行 同时也可以传参
 */


function getJSON(url) {
    //创建一个promise对象
    let promise = new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest()
        //新建一个http请求
        xhr.open("GET", url, true)
        //设置状态的监听函数
        xhr.onreadystatechange = function () {
            if (this.readyState !== 4) return;
            //当请求成功或失败时 改变promise的状态
            if (this.status === 200) {
                resolve(this.response)
            } else {
                reject(new Error(this.statusText))
            }
        }
        //设置错误监听函数
        xhr.onerror = function () {
            reject(new Error(this.statusText))
        }
        //设置响应的数据类型
        xhr.responseType = 'json'
        //设置请求头信息
        xhr.setRequestHeader("Accept", "application/json")
        //发送http请求
        xhr.send(null)
    })
    return promise
}

/**
 * 1 首先js是单线程运行的  在代码执行的时候 通过将不同函数的执行上下文压入执行栈中来保证代码的有序执行
 * 2 在执行同步代码的时候 如果遇到了异步事件  js引擎并不会一直等待其返回结果 而是会将这个事件挂起 继续执行执行栈中的其他任务
 * 3 当同步事件执行完毕后  再将异步事件对应的回调加入到当前执行栈中不同的另一个任务队列中等待执行
 * 4 任务队列可以分为宏任务队列和微任务队列  当当前执行栈中的事件执行后完毕后 js引擎首先会判断微任务队列中是否有任务可以执行
 *    如果有就将微任务队首的事件压入栈中执行
 * 5 当微任务队列中的任务都执行完成后 再去判断宏任务队列中的任务
 */

/**
 * 通用的时间侦听器函数
 */

const EventUtils = {
    //添加事件 视能力分别使用dom1 || dom2 || IE方式来绑定事件
    addEvent: function (element, type, handler) {
        if (element.addEventListener) {
            element.addEventListener(type, handler, false)
        } else if (element.attachEvent) {
            element.attachEvent("on" + type, handler)
        } else {
            element["on" + type] = handler
        }
    },
    //移除事件
    removeEvent: function (element, type, handler) {
        if (element.removeEventListener) {
            element.removeEventListener(type, handler, false)
        } else if (element.detachEvent) {
            element.detachEvent("on" + type, handler)
        } else {
            element["on" + type] = null
        }
    },
    //获取事件目标
    getTarget: function (event) {
        return event.target || event.srcElement
    },
    //获取event对象的引用 取到事件的所有信息 确保随时能使用event
    getEvent: function (event) {
        return event || window.event
    },
    //阻止事件（主要是事件冒泡 因为IE不支持事件捕获）
    stopPropagation: function (event) {
        if (event.stopPropagation) {
            event.stopPropagation()
        } else {
            event.cancelBubble = true
        }
    },
    //取消事件的默认行为
    preventDefault: function (event) {
        if (event.preventDefault) {
            event.preventDefault()
        } else {
            event.returnValue = false
        }
    }
}
//高阶函数 只是将函数作为参数或返回值的函数
// function hightOrderFunction(param, callback) {
//     return callback(param)
// }

/**
 * 函数被称为一等公民
 * 在js中  函数不仅拥有一切传统函数的使用方式（声明和调用）而且可以做到像简单值一样
 */
// var func = function() {} //赋值
// function func(x,callback){callback();} //传参
// function() {return function(){}} //返回

//手动实现Array.prototype.map 方法
/**
 * map() 方法创建一个新数组 其结果是该数组中的每个元素都调用一个提供的函数后返回的结果
 */

function map(arr, mapCallback) {
    if (!Array.isArray(arr) || !arr.length || typeof mapCallback !== 'function') {
        return []
    } else {
        let result = []
        //每次调用此函数时 我们都会创建一个result 数组 因为我们不想改变原始数组
        for (let i = 0, len = arr.length; i < len; i++) {
            result.push(mapCallback(arr[i], i, arr))
            //将mapCallback 返回的结果push到result数组中
        }
        return result;
    }
}
//手动实现Array.prototype.filter方法
/**
 * filter() 方法创建一个新数组 其包含通过所提供函数实现的测试的所有元素
 */

function filter(arr, filterCallback) {
    //首先检查传递的参数是否正确
    if (!Array.isArray(arr) || !arr.length || typeof filterCallback !== 'function') {
        return []
    } else {
        let result = [];
        //每次调用此函数时 我们都会创建一个result数组 因为我们不想改变原始数组
        for (let i = 0, len = arr.length; i < len; i++) {
            //检查filterCallback 的返回值是否是真值
            if (filterCallback(arr[i], i, arr)) {
                //如果条件为真 则将数组元素push到result中
                result.push(arr[i])
            }
        }
        return result
    }
}
/**
 * 手动实现Array.prototype.reduce方法
 * 
 * reduce()方法对数组中的每个元素执行一个由你提供的reducer函数（升序执行） 将其结果汇总为单个返回值
 */
function reduce(arr, reduceCallback, initialValue) {
    if (!Array.isArray(arr) || !arr.length || typeof reduceCallback !== 'function') {
        return []
    } else {
        //如果没有将initialValue传递给该函数  我们将使用第一个数组项作为initialValue
        let hasInitialValue = initialValue !== undefined
        let value = hasInitialValue ? initialValue : arr[0]
        //如果没有传递initialVal 则索引从1开始 否则从0开始
        for (let i = hasInitialValue ? 1 : 0, len = arr.length; i < len; i++) {
            value = reduceCallback(value, arr[i], i, arr)
        }
        return value
    }
}
/**
 * 浅拷贝的实现方式
 * Object.assign()方法：用于将所有可枚举属性的值从一个或多个源对象复制到目标对象 它将返回目标对象
 * Array.prototype.slice(): slice()方法返回一个新的数组对象 这一对象是一个有begin和end(不包括end)
 * 决定的原数组的浅拷贝  原始数组不会被改变
 * 扩展运算符...
 */

let a = {
    name: 'Jake',
    flag: {
        title: 'beter day bu day',
        time: '2020-05-31'
    }
}
let b = { ...a }
/**
 * 深拷贝的实现方式：
 * 乞丐版：JSON.parse(JSON.stringify(object)) 缺点诸多（会忽略undefined symbol 函数 不能解决循环引用 不能处理正则 new Date()）
 * 基础版 浅拷贝+递归（只考虑了普通的object和array两种数据类型）
 */
function cloneDeep(target, map = new WeakMap()) {
    if (typeof target === 'object') {
        let cloneTarget = Array.isArray(target) ? [] : {}
        if (map.get(target)) {
            return target
        }
        map.set(target, cloneTarget)
        for (const key in target) {
            cloneTarget[key] = cloneDeep(target[key], map)
        }
        return cloneTarget
    } else {
        return target
    }
}

function forEach(array, interatee) {
    let index = -1;
    const length = array.length;
    while (++index < length) {
        interatee(array[index], index)
    }
    return array
}

function isObject(target) {
    const type = typeof target
    return target !== null && (type === 'object' || type === 'function')
}

function getType(target) {
    return Object.prototype.toString.call(target)
}

function getInit(target) {
    const Ctor = target.constructor;
    return new Ctor()
}

function cloneSymbol(targe) {
    return Object(Symbol.prototype.valueOf.call(targe))
}

function cloneReg(targe) {
    const reFlags = /\w*$/
    const result = new targe.constructor(targe.source, reFlags.exec(targe))
    result.lastIndex = targe.lastIndex;
    return result
}

function cloneFunction(func) {
    const bodyReg = /(?<{)(.|\n)+(?=})/m;
    const paramReg = /(?<=\().+(?=\)s+{)/;
    const funcString = func.toString();
    if (func.prototype) {
        const param = paramReg.exec(funcString)
        const body = bodyReg.exec(funcString)
        if (body) {
            if (param) {
                const paramArr = param[0].split(',');
                return new Function(...paramArr, body[0])
            } else {
                return new Function(body[0])
            }
        } else {
            return null
        }
    } else {
        return eval(funcString)
    }
}

function cloneOtherType(targe, type) {
    const Ctor = targe.constructor
    switch (type) {
        case boolTag:
        case numberTag:
        case stringTag:
        case errorTag:
        case dateTag:
            return new Ctor(targe);
        case regexpTag:
            return cloneReg(targe);
        case symbolTag:
            return cloneFunction(targe);
        default:
            return null
    }
}

function clone(target, map = new WeakMap()) {
    //克隆原始数据
    if (!isObject(target)) {
        return target
    }
    //初始化
    const type = getType(target)
    let cloneTarget;
    if (deepTag.includes(type)) {
        cloneTarget = getInit(target, type)
    } else {
        cloneOtherType(target, type)
    }

    //防止循环引用
    if (map.get(target)) {
        return map.get(target)
    }
    map.set(target, cloneTarget)

    //克隆set
    if (type === setTag) {
        target.forEach(value => {
            cloneTarget.add(clone(value, map))
        })
        return cloneTarget
    }
    //克隆对象和数组
    const keys = type === arrayTag ? undefined : Object.keys(target)
    forEach(keys || target, (value, key) => {
        if (keys) {
            key = value
        }
        cloneTarget[key] = clone(target[key], map)
    })
    return cloneTarget
}

/**
 * call apply bind函数
 *  call函数的实现步骤：
 *  1 判断调用对象是否为函数 即使我们是定义在函数的原型上的 但是可能出现使用call等方式调用的情况
 *  2 判断传入上下文对象是否存在 如果不存在 则设置为window
 *  3 处理传入的函数 截取第一个参数后的所有参数
 *  4 将函数作为上下文对象的一个属性
 *  5 使用上下文对下个来调用这个方法 并保存返回结果
 *  6 删除刚才新增的属性
 *  7 返回结果
 */

Function.prototype.myCall = function (context) {
    //判断调用对象 
    if (typeof this !== 'function') {
        console.log("type error")
    }
    //获取参数
    let agrs = [...arguments].slice(1),
        result = null;

    //判断context是否传入 如果未传入则设置为window
    context = context || window
    //将调用函数设为对象的方法
    context.fn = this
    //调用函数
    result = context.fn(...agrs);
    //将属性删除
    // detele context.fn;
    return result
}

/**
 * apply 函数的实现步骤：
 *     1 判断调用对象是否为函数 即使我们是定义在函数的原型上的  但是可能出现使用call等方式调用的情况
 *     2 判断传入上下文对象是否存在 如果不存在  则设置为window
 *     3 将函数作为上下文对象的一个属性
 *     4 判断参数值是否传入
 *     5 使用上下文对象来调用这个方法 并保存返回结果
 *     6 返回结果
 */

Function.prototype.myApply = function (context) {
    //判断调用对象是否为函数
    if (typeof this !== 'function') {
        throw new Error("Error")
    }
    let result = null;

    //判断context是否存在 如果未传入则为window
    context = context || window
    //将函数设为对象的方法
    context.fn = this
    //调用方法
    if (arguments[1]) {
        result = context.fn(...arguments[1])
    } else {
        result = context.fn()
    }
    //将属性删除
    delete context.fn
    return result
}

/**
 * bind 函数的实现步骤：
 *  1 判断调用对象是否为函数  即使我们是定义在函数的原型上的 但是可能出现使用call等方式调用的情况
 *  2 保存当前函数的引用 获取其余传入参数值
 *  3 创建一个函数返回
 *  4 函数内部使用apply来绑定函数调用 需要判断函数作为构造函数的情况  这个时候需要传入当前函数的this给apply调用 其余情况都传入指定的上下文对象
 */
Function.prototype.myBind = function(context) {
    //判断调用对象是否为函数
    if(typeof this !== 'function') {
        throw new TypeError("Error")
    }
    //获取参数
    var agrs = [...arguments].slice(1),
    fn = this;

    return function Fn() {
        return fn.apply(
            this  instanceof Fn?this:context,
            args.concat(...arguments)
        )
    }
}
/**
 *  函数柯里化的实现
 */

function curry(fn,args) {
    //获取函数需要的参数长度
    let length = fn.length;
    args = args || [];
    return function() {
        let subArgs = args.slice(0);
        //拼接得到现有的所有参数
        for(let i=0;i<arguments.length;i++) {
            subArgs.push(arguments[i])
        }
        //判断参数的长度是否已经满足所需参数的长度
        if(subArgs.length >= length) {
            //如果满足 执行函数
            return fn.apply(this,subArgs)
        }else{
            //如果不满足 递归返回科里化的函数 等待参数的传入
            return curry.call(this,fn,subArgs)
        }
    }
}

function curry(fn,...args) {
    return fn.length <= args.length?fn(...args):curry.bind(null,fn,...args)
}

function Dog(name,color,age) {
    this.name = name;
    this.color = color;
    this.age = age
}
Dog.prototype = {
    getName:function() {
        return this.name
    }
}

new Promise((resolve,reject) => {
    setTimeout(() => {
        console.log(1)
        resolve()
    },1000)
}).then((res) => {
    setTimeout(() => {
        console.log(2)
    },2000)
}).then((res) => {
    setTimeout(() => {
        console.log(3)
    },3000)
}).catch((err) => {
    console.log(err)
})

function myPromise(constructor) {
    let self = this;
    self.status = 'pending' //定义状态改变前的初始状态
    self.value = undefined //定义状态为resolve的时候的状态
    self.reason = undefined //定义状态为rejected
    function resolve(value) {
        //两个==='pending' 保证了状态的改变是不可逆的
        if(self.status === 'pending') {
            self.value = value
            self.status = "resolved"
        }
    }
    function reject(reason) {
        //两个==='pending' 保证了状态的改变是不可逆的
        if(self.status === 'pending') {
            self.reason = reason;
            self.status = "rejected"
        }
    }
    //捕获构造异常
    try {
        constructor(resolve,reject)
    }catch(e) {
        reject(e)
    }
}

myPromise.prototype.then = function(onFullfilled,onRejected) {
    let self = this;
    switch(self.status) {
        case 'resolved':
            onFullfilled(self.value);
            break;
        case 'rejected':
            onRejected(self.reason);
            break;
        default:
    }
}

function takeLongTime(n) {
    return new Promise(resolve => {
        setTimeout(() => resolve(n+200),n)
    })
}

function step1(n) {
    console.log(`step1 with ${n}`)
    return takeLongTime(n)
}

function step2(n) {
    console.log(`step2 with ${n}`);
    return takeLongTime(n)
}

function step3(n) {
    console.log(`step3 with ${n}`)
    return takeLongTime(n)
}