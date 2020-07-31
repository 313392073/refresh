(function(global,main) {
    if(typeof define === 'function' && define.amd) {
        //amd
        define()
    }else if(typeof exports === 'object') {
        //commonjs
        module.exports = {}
    }else{
        //非模块化
        global.add = function() {}
    }
}(this,function() {
    //定义模块主体
    return {}
}))()