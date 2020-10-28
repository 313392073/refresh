/**
 * 声明一个Greeter类 此类有3个成员：
 * greeting的属性
 * 一个构造函数
 * 一个greet方法
 * 我们在引用任何一个类成员的时候都用了this  他表示我们访问的是类的成员
 * 最后 我们使用了new 构造了Greeter类的一个实例 它会调用之前定义的构造函数
 * 创建一个Greeter类型的新对象 并执行构造函数初始化它
 */
// class Greeter {
//     greeting:string;
//     constructor(message:string) {
//         this.greeting = message
//     }
//     greet() {
//         return "Hello, "+this.greeting
//     }
// }
// let greeter = new Greeter("world")
// console.log(greeter.greeting)
/**
 * 继承
 * 基于类的程序设计中 一种最基本的模式是允许使用继承来扩展现有的类
 * 类从基类中继承了属性和方法  Dog是一个 派生类
 * 他派生自Animal 基类 通过extends关键字 派生类通常被称作 子类 基类通常被称作超类
 */
// class Animal {
//     move(distanceInmeters:number = 0) {
//         console.log(`Animal moved ${distanceInmeters}m.`)
//     }
// }
// class Dog extends Animal {
//     bark() {
//         console.log("woof! woof")
//     }
// }
// const dog = new Dog()
// dog.move(1)
// dog.bark()
// class Animal {
//     name:string;
//     constructor(theName:string) {
//         this.name = theName
//     }
//     move(distanceInmeters: number = 0) {
//         console.log(`${this.name} moved ${distanceInmeters}m.`)
//     }
// }
// class Snake extends Animal {
//     constructor(name:string) {
//         super(name)
//     }
//     move(distanceInmeters = 5) {
//         console.log("Slithering...")
//         super.move(distanceInmeters)
//     }
// }
// class Horse extends Animal {
//     constructor(name:string) {
//         super(name)
//     }
//     move(distanceInmeters = 45) {
//         console.log("Galloping...")
//         super.move(distanceInmeters)
//     }
// }
// let sam = new Snake("Sammy the Python")
// let tom:Animal = new Horse("Tommy the Palomino")
// sam.move()
// tom.move(32)
/**
 * 与之前不同的是  派生类包含了一个构造函数  他必须调用super()
 * 它会执行基类的构造函数 而且在构造函数里访问this的属性之前 我们一定要调用spuer()
 * 这是ts强制执行的一条重要规则
 */
/**
 * 公共 私有与受保护的修饰符
 *    默认 public
 *    私有 private 当成员被标记为private时 他就不能自在声明他的类的外部访问
 */
// class Animal {
//     private name:string;
//     public constructor(theName:string) {
//         this.name = theName
//     }
//     public move(distanceInmeters: number) {
//         console.log(`${this.name} moved ${distanceInmeters}m.`)
//     }
// }
// const cat = new Animal("哈哈")
// cat.move(10)
//name 属性标记为private 所以不能外部访问
/**
 * 当我们比较带有private或protected成员的类型的时候  情况就不同了
 * 如果其中一个类型里面包含一个private成员 那么只有当另外一个类型中也
 * 存在这样一个private成员 并且它们都是来自同一处声明时 我们才认为这两个类型是兼容的
 * 对于protected成员也使用这个规则
 */
// class Animal {
//     private name:string;
//     constructor(theName:string) {
//         this.name = theName
//     }
// }
// class Rhino extends Animal {
//     constructor() {
//         super("Rhino")
//     }
// }
// class Employee {
//     private name:string
//     constructor (theName:string) {
//         this.name = theName
//     }
// }
// let animal = new Animal("Goat")
// let rhino = new Rhino()
// let employee = new Employee('Boss')
// animal = rhino
// console.log(animal)
// console.log(rhino)
// console.log(employee)
// class Person {
//     protected name:string;
//     constructor(name:string) {
//         this.name = name
//     }
// }
// class Employee extends Person {
//     private department:string
//     constructor(name:string,department:string) {
//         super(name)
//         this.department = department
//     }
//     public getElevatorPitch() {
//         return `Hello,my name is ${this.name} and I work in ${this.department}.`
//     }
// }
// let howard = new Employee("Howard","Sales")
// console.log(howard.getElevatorPitch())
// console.log(howard)
/**
 * readonly 修饰符
 * 你可以使用readonly 关键字将属性设置为只读的 只读属性必须在声明或构造函数里被初始化
 */
//  class Octopus {
//      readonly name:string;
//      readonly numberOfLegs:number = 8;
//      constructor(theName:string) {
//          this.name =  theName
//      }
//  }
//  let dad = new Octopus("Man with the 8 strong legs")
//  console.log(dad)
//  dad.name = "Man with the 3-piece suit"
// class Employee {
//     fullName:string;
// }
// let employee = new Employee();
// employee.fullName = "Bob Smith"
// if(employee.fullName) {
//     console.log(employee.fullName)
// }
// let passcode = "secret passcode"
// class Employee {
//     private _fullName:string;
//     get fullName(): string {
//         return this._fullName
//     }
//     set fullName(newName:string) {
//         if(passcode && passcode == 'secret passcode') {
//             this._fullName = newName
//         }else{
//             console.log('Error:')
//         }
//     }
// }
// let employee = new Employee();
// employee.fullName = "Bob Smith";
// if(employee.fullName) {
//     console.log(employee.fullName)
// }
// class Grid {
//     static origin = {x:0,y:0}
//     claculateDistanceFromOrigin(point:{x:number;y:number}) {
//         let xDist = (point.x - Grid.origin.x)
//         let yDist = (point.y - Grid.origin.y)
//         return Math.sqrt(xDist * xDist+yDist*yDist) / this.scale
//     }
//     constructor (public scale:number) { }
// }
// let Greeter = (function() {
//     function Greeter(message) {
//         this.greeting = message
//     }
//     Greeter.prototype.greet = function() {
//         return "Hello, "+this.greeting
//     }
//     return Greeter
// })()
// let greeter;
// greeter = new Greeter("world")
// console.log(greeter.greet())
// var Greeter = /** @class */ (function () {
//     function Greeter() {
//     }
//     Greeter.prototype.greet = function () {
//         if (this.greeting) {
//             return "Hello, " + this.greeting;
//         }
//         else {
//             return Greeter.standardGreeting;
//         }
//     };
//     Greeter.standardGreeting = "Hello,there";
//     return Greeter;
// }());
// var greeter1;
// greeter1 = new Greeter();
// console.log(greeter1.greet());
// var greeterMaker = Greeter;
// console.log(greeter1.greet());


// function doSomething(cb) {
//     setTimeout(() => {
//       cb(done)
//     },100)
//   }
//   doSomething((arg) => {
//     console.log(`done Headers,${arg}`)
//   })

//   function doSomethings() {
//       return new Promise((resolve,reject) => {
//           setTimeout(() => {
//               resolve(done)
//           },100)
//       })
//   }
//   doSomethings.then(res => {
//       console.log(`done here ${res}`)
//   }).catch(err => {
//       console.log(err)
//   }) 