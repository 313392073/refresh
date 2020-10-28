/**
 * Object 
 */
//变量属性
// const flag = true;
// const obj = {
//     a:0,
//     [flag?'c':'d']:2
// }
// console.log(obj)

//对象多余属性删除
// const {name,age,...obj} = {name:'张三',age:13,dec:'描述',info:'信息'}
// console.log(obj)

//对象嵌套属性解构
// const { info:{dec} } = {name:'张三',age:13,info:{dec:'描述',info:'信息'}}
// console.log(dec)

//结构对象属性别名
// const {name:newName} = {name:'张三',age:13}
// console.log(newName)

//结构对象属性默认值
// const {dec = '这是默认dec值'} = {name:'张三',age:13}
// console.log(dec)

//拦截对象 Object.defineProperty拦截对象

let obj = {name:'',age:'',sex:''}
// let defaultName = ['这是name','这是age','sexxx']
// Object.keys(obj).forEach(key => {
//     Object.defineProperty(obj,key,{
//         get() {
//             return defaultName;
//         },
//         set(value) {
//             defaultName = value
//         }
//     })
// })
// console.log(obj.name)
// obj.name = '改变的值'
// console.log(obj.name)

// let objOne = {};
// let defaultNameOne = "这是默认值2"

// Object.defineProperty(obj,'name',{
//     get() {
//         return defaultNameOne
//     },
//     set(value) {
//         defaultNameOne = value
//     }
// })
// console.log(objOne.name)
// objOne.name = "这是改变的值"
// console.log(objOne.name)

// let handler = {
//     get(target,key,receiver) {
//         console.log('get',key)
//         return Reflect.get(target,key,receiver)
//     },
//     set(target,key,value,receiver) {
//         console.log('set',key,value)
//         return Reflect.set(target,key,value,receiver)
//     }
// }
// let proxy = new Proxy(obj,handler)
// proxy.name = "李四"
// proxy.age = 24
