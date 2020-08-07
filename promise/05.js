function add(xPromise,yPromise) {
    /**
     * Promise.all([..])接收一个promise的数组 并返回一个等待他们全部完成的新的Promise
     */
    return Promise.all([xPromise,yPromise]).then(function(value) {
        return value[0]+value[1]
    })
}
/**
 * Promise 不是回调的替代品  Promise 提供了一种可信的中介机制  
 * 也就是 在你的调用代码和将要执行任务的异步代码之间 一一来管理回调
 * 
 * 另一种考虑Promise的方式是作为一种事件监听器 你可以在它上面注册监听一个通知你任务何时完成的事件
 * 他是一个仅被触发一次的事件 但不管怎样 都可以被看作是一个事件
 * 
 * Promise 可以被链接在一起  他们可以是一系列顺序的、异步完成的步骤 与all(..)方法和race(..)方法这样的高级抽象一起 promisel链可以提供一种异步流程控制的机制
 * 
 * 还有一种概念化Promise的方式是 将它看作一个未来值 一个与事件无关的值的容器 无论底层的值是否是最终值
 * 这种容器都可以被同样地推理  观测一个Promise的解析会在这个值准备好的时候将他抽取出来 换言之 一个Promise被认为是一个同步函数返回值的异步版本
 * 
 * 一个Promise只可能拥有两种解析结果： 完成或者拒绝 并带有一个可选的信号值 
 * if 一个promise被完成  这个最终值成为一个完成值 
 * if 被拒绝 这个最终值称为理由（拒绝的理由） 
 * promise 只可能被解析一次（完成或拒绝） 任何其他的完成或拒绝的尝试都会被简单的忽略 
 * 一旦一个Promise被解析  他就成为一个不可被改变的值
 */

 /**
  * 创建和使用promise
  * 要构建一个peomise实例 可以使用Promise构造器
  * 
  * var p = new Promise(function pr(resolve,reject) {
  *     ..
  * })
  * 
  * Promise 构造器接收一个单独的函数（pr()） 它被立即调用并以参数值的形式收到两个控制函数
  * 通常被命名为resolve(..)和reject(..)
  *     使用：
  *   如果你调用reject(..) promise 就会被拒绝 而且如果有任何值被传入reject(..) 它就会被设置为拒绝的理由
  *   如果你不使用参数值 或任何非promise值调用resolve(..) promise就会被完成
  *   如果你调用resolve(..)并传入另一个promise  这个promise就会简单的采用 要么立即要么最终地 这个被传入地promise的状态（不是完成就是拒绝）
  */

function ajax(url,cb) {
    //发起请求，最终调用cb(..)
}
ajax('url',function handler(err,contents) {
    if(err) {
        //处理ajax错误
    }else{
        //处理成功的contents
    }
})
//转换为：
function ajax(url) {
    return new Promise(function pr(resolve,reject) {
        //发起请求 最终不是调用resolve(..)就是调用reject(..)
    })
}
ajax('url').then(function fulfilled(contents) {
    //处理成功的contents
},function rejected(reason) {
    //处理ajax的错误reason
})

/**
 * Promise拥有一个方法then(..)  他接受一个或两个回调函数 
 * 第一个函数被看作是promise被成功的完成时要调用的处理器
 * 第二个函数被看作是promise百明确拒绝时 或者任何错误/异常在解析的过程中被捕捉到时要调用的处理器
 * 
 * 如果这两个参数值之一被省略或者不是一个合法的函数 通常你会用null来代替
 * 那么一个占位用的默认等价物就会被使用 默认的成的回调将传递它的完成值
 * 而默认的错误回调将传播它的拒绝理由
 * 
 * 调用then(null,handleRejection)的缩写是catch(handleRejection)
 * 
 * then(..)和catch(..) 两者都自动的构建并返回另一个promise实例 它被链接在原本的promise上
 * 接收原本的promise的解析结果 （实际被调用的）完成或拒绝处理器返回的任何值
 */
ajax("url").then(function fulfilled(contents) {
    return contents.toUpperCase()
},function rejected(reason) {
    return 'default value'
}).then(function fulfilled(data) {
    //处理来自于原本的promise的处理器中的数据
})
/**
 * 上面代码 我们要么从fulfilled（..） 返回一个立即值 要么从rejected(..)返回一个立即值
 * 然后再下一个事件周期中这个立即值被第二个then(..)的fulfilled(..)接收  如果我们返回一个新的promise
 * 那么这个新promise就会作为解析结果被纳入与采用
 */

 /**
  * Promise API
  * Promise API 还为处理Promise提供了一些静态方法
  * Promise.resolve(..)创建一个被解析为传入的值的promise 让我们将它的工作方式与更手动的方法比较一下
  */

var p1 = Promise.resolve(43)
var p2 = new Promise(function pr(resolve) {
    resolve(42)
})
/**
 * p1和p2 将拥有完全相同的行为  使用一个promise进行解析也一样
 */

var theP = ajax();
var p1 = Promise.resolve(theP)
var p2 = new Promise(function pr(resolve) {
    resolve(theP)
})

/**
 * Promise.resolve(..) 就是前一节提出的thenable 信任问题的解决方案
 * 任何你还不确定是一个可信promise的值 他甚至可能是一个立即值
 * 都可以通过传入 Promise.resolve(..)来进行规范化 如果这个值已经是一个可识别的promise或thenable
 * 它的状态/解析结果将简单地被采用 将错误行为与你隔绝开
 * 如果相反他是一个立即值 那么他将会被"包装"进一个纯粹的promise 以此将他的行为规范化为异步的
 */
/**
 *  Promise.reject(..)创建一个立即被拒绝的promise 与它的Promise(..)构造器对等品一样
 */
var p1 = Promise.reject("Oops")
var p2 = new Promise(function pr(resolve,reject) {
    reject('Oops')
})
/**
 * 虽然resolve(..)和Promise.resolve(..)可以接收一个promise并采用它的状态/解析结果 
 * 但是reject(..)和Promise.reject(..) 不会区分他们接收到什么样的值 
 * 所以  如果你使用一个promise或thenable进行拒绝 这个promise/thenable本身将会被设置为拒绝的理由 而不是它底层的值
 */

/**
 * Promise.all([..])接收一个或多个值的数组 返回一个promise 这个promise会在所有的值完成时完成 或者在这些值中 第一个被拒绝的值出现时被立即拒绝
 */

var p1 = Promise.resolve(42);
var p2 = new Promise(function pr(resolve) {
    setTimeout(function() {
        resolve(43)
    },100)
})
var v3 = 44
var p4 = new Promise(function pr(resolve,reject) {
    setTimeout(() => {
        reject('Oops')
    }, 10);
})

Promise.all([p1,p2,p3]).then(function fulfilled(vals) {
    console.log(vals) //42 43 44 
})
Promise.all([p1,p2,p3,p4]).then(function fulfilled(vals) {
    //永远不会跑到这里
},function rejected(reason) {
    console.log(reason) //Oops
})
/**
 * Promise.all([...])等待所有的值完成（或第一个拒绝）
 * 而Promise.race([..])仅会等待第一个完成或拒绝
 */
Promise.race([p1,p2,v3]).then(function fulfilled(val) {
    console.log(val) //42
})
Promise.race([p2,p4]).then(function fulfilled(val) {
    //永远不会跑到这里
},function rejected(reason) {
    console.log(reason) //Oops
})

step1().then(step2,step1Failed).then(function step3(msg) {
    return Promise.all([
        step3a(msg),
        step3b(msg),
        step3c(msg),
    ])
}).then(step4)

function *main() {
    try {
        var ret = yield step1()
    }catch(err) {
        ret = yield step1Failed(err)
    }

    ret = yield step2(ret)

    ret = yield Promise.all([
        step3a(ret),
        step3b(ret),
        step3c(ret),
    ])
    yield step4(ret)
}


function run(gen) {
    var args = [].slice.call(arguments,1),it;
    it = gen.apply(this,args);

    return Promise.resolve().then(function handleNext(value) {
        var next = it.next(value);
        return (function handleResult(next) {
            if(next.done) {
                return next.value
            }else{
                return Promise.resolve(next.value).then(
                    handleNext,
                    function handleErr(err) {
                        return Promise.resolve(
                            it.throw(err)
                        ).then(handleResult)
                    }
                )
            }
        })(next)
    })
}