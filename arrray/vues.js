/**
 * vue3 利用require.context可以大量引入重复的代码
 * 
 * require.context(diretory,useSubdirectories,regExp)
 * directory:说明需要检索的目录
 * useSubdirectories: 是否检子目录
 * redExp：匹配文件的正则表达式  一般是文件名
 */
// const path = require('path')
// const files = require.context("@/components/home",false,/\.vue$/)
// const modules = {};
// files.keys().forEach(key => {
//     const name = path.basename(key,'.vue')
//     modules[name] = files(key).default || files(key)
// })
// components:modules

/**
 * props 父传子的属性  props值可以是一个数组或对象
 */
//对象
//  props:{
//     inpVal:{
//         /**
//          * type 值可以是 String Boolean Array Object Date Function Symbol
//          * type 还可以是一个自定义的构造函数 并且通过instanceof 来进行检查确认
//          */
//         type:Number,//传入值限定类型
//         required:true, //是否必传
//         default:200, //默认值  对象或数组默认值必须从一个工厂函数获取 如default:() => []
//         validator:(value) {
//             //这个值必须匹配下列字符串中的一个
//             return ['success','warning','danger'].indexOf(value) !== -1
//         }
//     }
//  }

/**
 * $emit 触发子组件触发父组件给自己绑定的事件 其实就是子传父的方法
 *  <home @title="title">
 *  this.$emit("title",[{title:'这是title'}])
 */


/**
*  provide 和 inject 主要为高阶插件/组件库提供用例 并不推荐直接用于应用程序代码中
    并且这对选项需要一起使用  以允许一个祖先组件向其所有子孙后代注入一个依赖 不论组件层次有多深
    并起上下游关系成立的时间里始终生效
*/
//父组件 provide 是一个对象 提供一个属性或方法
// provide:{
//     foo:'这是foo',
//     fooMethod:() => {
//         console.log("父组件fooMethod被调用")
//     }
// },
// //子组件或孙子组件
// inject:['foo','fooMethod'], //数组或者对象 注入到子组件
// mounted() {
//     this.fooMethod()
//     console.log(this.foo)
// }


Vue.component('asnc-webpack-example',function(reolve) {
    /**
     * 
     */
    require(['./my-async-component'],resolve)
})