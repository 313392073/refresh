/**
 * 
 * @param person string  代表类型注解的意思
 */
// function greeter(person:string) {
//     return 'Hello, '+person
// }
// let user = "Jane User"
// document.body.innerHTML = greeter(user)

/**
 * 接口 使用接口来描述一个拥有firstName和lastName字段的对象
 * 在TypeScript里  只在两个类型内部的结构兼容 那么这两个类型就是兼容的
 * 就允许我们在实现接口时候 只要保证包含了接口要求的结构就可以
 */

// interface Person {
//     firstName:string,
//     lastName:string
// }

// function greeter(person:Person) {
//     return "Hello, "+person.firstName+" "+person.lastName
// }
// let user = {
//     firstName:'Jane',
//     lastName:'User'
// }
// document.body.innerHTML = greeter(user)

/**
 * 类 TypeScript支持js的新特性 比如支持基于类的面向对象
 * 
 * 创建一个Student类  它带有一个构造函数和一些公共字段
 * 注意类和接口可以一起共作 程序员可以自行决定抽象的级别
 * 还要注意 在构造函数的参数上使用public 等同于创建了同名的成员变量
 */
// class Student {
//     fullName:string;
//     constructor(public firstName,public middleInitial,public lastName) {
//         this.fullName = firstName+" "+middleInitial+" "+lastName
//     }
// }

// interface Person {
//     firstName:string,
//     lastName:string
// }
// function greeter(person:Person) {
//     return 'Hello, '+person.firstName+" "+person.lastName
// }
// let user = new Student('Jane','M.',"User");
// document.body.innerHTML = greeter(user)

/**
 * 数组的定义方式
 * 1 let list: number[] = [1,2,3]
 * 2 list: Array<number> = [1,2,3]
 */

 /**
  * 元组
  *  元组类型允许表示一个已知元素数量和类型的数组 各元素的类型不必相同
  * 比如  你可以定义一对值 分别为string 和 number类型的元组
  * 
  * let x:[string,number]
  *  x = ['hello',12]
  *  console.log(x[0].substr(1))
  */

  /**
   * 枚举
   * enum Color {Red = 1,Green,Blue}
    let colorName:string = Color[2]
    console.log(colorName) //Green
   */
  
/**
 * Any 有时候  我们想要为那些在编程阶段还不清楚类型的变量指定一个类型
 * 这些值可能来自于动态的内容  比如来自用户输入或第三方代码库 这种情况下
 * 我们不希望类型检查器对这些值进行检查而是直接让他们通过编译阶段的检查
 * 那么我们可以使用any类型类标记这些变量
 */
// let notSure:any = 4;
// notSure = "maybe a string instead";
// notSure = false
// console.log(notSure)

// let list: any[] = [1,true,'free']
// list[1] = 100;
// console.log(list)

/**
 * void 
 * Void类型像是与any类型相反 他表示没有任何类型 当一个函数没有返回值的时候 你通常会见到其返回值类型是void:
 */

//  function warnUser():void {
//     console.log('this is my waring message')
//  }
//  warnUser()

/**
 * Never 
 * never类型表示的是那些永不存在的值的类型 例如 never类型是那些总是会抛出异常或根本就不会
 * 有返回值的函数表达式或箭头函数表达式的返回值类型  变量也可能是never类型 当他们被永不为真的类型保护所约束时
 */

 //返回never的函数必须存在无法达到的终点
//  function error(message:string):never{
//     throw new Error(message)
// }
// //推断的返回值类型为never
// function fail() {
//     return error('something failed')
// }

/**
 * 类型断言
 *  类型断言这种方式可以告诉编译器 "相信我 我知道自己在干什么"
 * 类型断言好比其它语言里的类型转换 但是不进行特殊的数据检查和结构
 */
// 第一种 "尖括号"语法：
//  let someValue : any = "this is a string"
//  let strLength: number = (<string>someValue).length
//  console.log(someValue,strLength)
//第二种 as语法
// let someValue: any = "this is a string";
// let strLength: number = (someValue as string).length;
// console.log(someValue,strLength)