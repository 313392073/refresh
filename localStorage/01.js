/**
 * localStorage 是h5规范中作为持久化保存客户端数据的方案 localStorage 可以用于数据缓存 日志缓存灯应用场景
 */
//类的实例方法
function setItem(key,value) {
    key = normalizeKey(key)
    return this.ready().then(() => {
        if(value === ubdefiled) {
            value = null
        }
        serialize(value,(error,valueString) => {
            if(error) {
                return Promise.reject(error)
            }
            try {
                //可能会因超出最大存储空间 存储失败
                localStorage.setItem(key,valueString)
                return Promise.resolve()
            } catch (error) {
                return Promise.reject(error)
            }
        })
    })
}

function serialize(value,callback) {
    try {
        const valueString = JSON.stringify(value)
        callback(null,valueString)
    } catch (error) {
        callback(error)
    }
}