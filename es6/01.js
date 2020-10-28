/**
 * 1 let const 块级作用域以及和var的区别
 *      let const 声明的变量 在for if语句中 会形成块级作用域  块级作用域内的变量 不能被作用域外部使用
 *      let const 声明变量不再会有声明提升  在变量声明之前使用运行时会报错
 * 
 *      块级作用域声明变量 会出现"暂时性死区" 块级作用域声明变量前使用变量 将会报错
 * 
 *      如果const常量声明必须初始化
 *      如果const声明的是基本类型常量 初始化后不能修改  引用类型的常量 可以修改其成员变量
 */
    // const arr = [1,2,3]
    // arr[0] = 4
    // console.log(arr) //[4,2,3]

/**
 * 解构-快速提取数组/对象中的元素
 *      数组解构： 单独解构-根据数组索引  将数组解构成单独的元素
 *      剩余解构-用"...+变量名"解构剩余参数到新数组 只能用一次
 */


 /**
  * 对象解构
  *     单个/多个解构-跟数组解构差不多
  *     解构+重命名-给结构出来的变量重命名
  *     默认值-给结构变量设置默认值
  */


  /**
   * 模板字符串
   *    使用`将字符串包裹起来`
   *    可以换行  插值  使用标签函数进行字符串操作
   */

   /**
    * 字符串模板函数 
    * strs 以插值为分隔符组成的字符串数组
    * name 插值的value 有多少个就会传入多少个
    */


/**
 * 字符串扩展方法
 *  includes-是否包含 返回true 或者false
 *  startsWith-是否以什么开始 返回true 或者false
 *  endsWith-是否以什么结束 返回true 或者false
 */


/**
 * 参数默认值 & 剩余参数
 *  给函数形参设置默认值
    // 带默认参数的形参一般放在后面  减少传参导致的错误几率
    const defaultParams = function(name,age=0) {
        return [age,name]
    }
    console.log(defaultParams(1))

    使用...rest形式设置剩余形参 支持无限参数
 */


/**
 * 展开数组
 *  使用...将数组展开
 */


/**
 * 箭头函数
 *  特性&优势
 *  1 简化了函数的写法
 *  2 没有this机制  this继承自上一个函数的上下文 如果没有上一层函数  则指向window
 *  3 作为异步回调函数时，可解决this指向问题
 */

/**
 * 对象字面量增强
 *  同名属性可以省略key:value, 直接key
 *  函数可以直接省略key:value形式
 *  可以直接func()
 *  可以使用计算属性， 
 */

 
/**
 * Object.assign(target1,target2,targetN)- 复制/合并对象
 *  后面的属性向前面的属性合并
 *  如果target1是空对象，可以创建一个全新对象，而不是对象引用
 */

/**
 * Object.is(value1,value2) 
 *  作用： 比较两个值是否相等
 *      特性： 没有隐式转换  可以比较+0 -0 NaN
 */


/**
 * Proxy(object,handler)
 *  代理一个对象的所有  包括读写操作和各种操作的监听
 */

// const P = {
//     n:'p',
//     a:19
// }

// const proxy = new Proxy(P,{
//     get(target,property) {
//         return property in target?target[property]:null
//     },
//     defineProperty(target,property,attrs) {
//         console.log(target,property,attrs)
//     },
//     deleteProperty(target,property) {
//         console.log(target,property)
//         delete target[property]
//     },
//     set(target,property,value) {
//         target[property] = value
//     }
// })
// proxy.c = 100;
// console.log('pp',P)

/**
 * Reflect 作用：
 *  集成Object操作的所有方法  统一 方便  
 *  用于对对象的统一操作 集成Object相关的所有方法
 *      1 apply: 类似Function.prototype.apply
 *      2 Reflect.construct()
 *  对构造函数进行new操作  相当于执行new target(...args)
 */

/**
 * class & 静态方法 & 继承
 * 使用class关键字定义类
 * 方法： 
 *      实例方法 需要实例化之后才能调用  this指向实例
 *      静态方法 用static修饰符修饰  可以直接通过类名调用  不需要实例化 this不指向实例 而是指向当前类
 */
// class Person {
//     constructor(props) {
//         this.props = props
//     }
//     //实例方法
//     eat() {

//     }
//     //静态方法
//     static run() {

//     }
// }
// //调用静态方法
// Person.run()
// const person = new Person("props")
// //调用实例方法
// person.eat()

/**
 * 继承： 子类使用extends关键字实现继承 可以继承父类所有属性
 */
// class Student extends Person {
//     construct(props) {
//         super(props)
//     }
//     printProps() {
//         console.log(this.props)
//     }
// }
// const student = new Student("student")
// student.printProps()

/**
 * Set 
 *      Set是一种类似于数组的数据解构
 *  特性： 
 *      元素唯一性 不允许重复元素
 *      使用add增加重复元素 将会被忽略
 *  用途:
 *      数组去重
 *      数据存储
 * Array.from 从一个类似数组或可迭代对象创建一个新的 浅拷贝的数组实例
 */

// const arr = [1,2,3,4,2,1,1]
// const set = new Set(arr)
// set.add(5)
// console.log(set)
// const newArr = Array.from(set)
// console.log(newArr)

/**
 * Map 
 *      类似Object 以key value形式存储数据
 *  区别：
 *      Map键不会应是转换成字符串  而是保持原有类型
 */

let obj = {
    '1':1,
    true:true,
    a:'a'
}
const map = new Map()
    map.set(1,1)
    map.set('name',"map")
    map.set(obj,obj)
// console.log(map.get(obj))
map.forEach((val,key) => {
    console.log(key,val)
})