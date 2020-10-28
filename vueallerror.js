/**
 * 优雅得处理vue项目异常
 *  
 * 你还在为处理Uncaught(in promise)ReferenceError烦恼吗？
 * 你还在为捕获异常反复的写try catch吗
 * 你还在为每一个promise写catch吗？
 * 
 * 全局异常捕获
 */
Vue.config.errorHandler = function(err,vm,info) {
    /**
     * 指定组件的渲染和观察期间未捕获错误的处理函数
     * 这个处理函数被调用时 可获取错误信息和Vue实例
     */
}


/**
 * 同步异常处理方案
 */
function globalHandleError(err,vm,info) {
    if(Vue.config.errorHandler) {
        try {
            return config.errorHandler.call(null,err,vm,info)
        } catch (error) {
            logError(error,null,'config.errorHandler')
        }
    }
    logError(err,vm,info)
}

function isPromise(ret) {
    return (ret && typeof ret.then === 'function' && typeof ret.catch === 'function')
}

const errorHandler = (error,vm,info) => {
    console.error("抛出全局异常",error,vm,info)
}

Vue.mixin({
    beforeCreate() {
        const methods = this.$options.methods || {}
        Object.keys(methods).forEach(key => {
            let fn = methods[key]
            this.$options.methods[key] = function (...args) {
                let ret = fn.apply(this,args)
                if(ret && typeof ret.then === 'function' && typeof ret.catch === 'function') {
                    return ret.catch(Vue.config.errorHandler)
                }else{
                    return ret
                }
            }
        })
    }
})
function registerActionHandle(actions) {
    Object.keys(actions).forEach(key => {
        let fn = actions[key]
        actions[key] = function(...args) {
            let ret = fn.apply(this,args)
            if(isPromise(ret)) {
                return ret.catch(errorHandler)
            }else{
                return ret
            }
        }
    })
}
const registerVuex = (instance) => {
    if(instance.$options['store']) {
        let actions = instance.$options['store']['_actions'] || {};
        if(actions) {
            let tempActions = {}
            Object.keys(actions).forEach(key => {
                tempActions[key] = actions[key][0]
            })
            registerActionHandle(tempActions)
        }
    }
}