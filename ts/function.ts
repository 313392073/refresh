/**
 * 函数类型包含两部分：
 * 参数类型和返回值类型 当写出完整函数类型的时候  这两部分都是需要的 
 * 我们以参数列表的形式写出参数类型 为每个参数指定一个名字和类型 
 */
/**
 * 可以给每个参数添加类型之后  再为函数本身添加返回值类型
 * 返回类型 对于返回值  我们在函数和返回值类型之前使用（=》）符号
 * 使之清晰明了 
 */
// let myAdd = function(x:number,y:number):number {return x+y}

// let youAdd:(baseValue:number,increment:number) => number = function(x:number,y:number) {
//     return x+y
// }

/**
 * 可选参数和默认参数
 *  传递给一个函数的参数个数必须与函数期望的参数个数一致
 *  在ts里面 我们可以在参数名旁使用？实现可选参数的功能
 *  可选参数必须跟在必须参数后面
 */
// function buildName(firstName:string,lastName?:string) {
//     if(lastName) {
//         return firstName+" "+lastName
//     }else{
//         return firstName
//     }
// }

// let result1 = buildName("Bob")
// console.log(result1) //Bob
// let result2 = buildName("Bob","Adams")
// console.log(result2) //Bob Adams

/**
 * 在TS里 我们也可以为参数提供一个默认值当用户没有传递这个参数或传递的值是undefined时
 * 它们叫做有默认初始化值的参数
 * 
 * 在所有必须参数后面的带默认初始化的参数都是可选的 与可选参数一样
 * 在调用函数的时候 可以省略 也就是说 可选参数与末尾的默认参数共享参数类型
 */
// function buildName(firstName:string,lastName="Smith") {
//     return firstName+" "+lastName
// }
// let result1 = buildName("Bob")
// console.log(result1)
// let result2 = buildName("Bob","result2")
// console.log(result2)

/**
 * 与普通可选参数不同的是  带默认值的参数不需要放在必须参数的后面
 * 如果带默认值的参数出现在必须参数前面 用户必须明确的传入undefined值
 * 来获得默认值
 */
// function buildName(firstName="Will",lastName:string) {
//     return firstName+" "+lastName
// }
// let result1 = buildName(undefined,"Bob")
// console.log(result1)

/**
 * 剩余参数
 *  必要参数  默认参数和可选参数有个共同点：
 * 它们表示某一个参数  有时  你想同时操作多个参数 或者你并不知道会有多少参数传递进来 
 * 在js里 可以使用arguments来访问所有传入的参数
 */

// function buildName(firstName:string,...restOfName:string[]) {
//     return firstName+" "+restOfName.join(" ")
// }
// let employeeName = buildName("Joseph","Samuel","Lucas","MacKinzie")

/**
 * 剩余参数会被当成多个不限的可选参数 可以一个都没有  也可以有任意个
 */

// let suits = ['hearts','spades','clubs','diamonds'];

// function pickCard(x):any {
//     if(typeof x == 'object') {
//         let pickedCard = Math.floor(Math.random()*x.length)
//         return pickedCard
//     }else if(typeof x == 'number') {
//         let pickedSuit = Math.floor(x/13)
//         return {suit:suits[pickedSuit],card:x%13}
//     }
// }

/**
 * 接口 就是为了这些类型命名和为你的代码或第三方代码定义契约
 */

// function printLabel(labelledObj:{label:string}) {
//     console.log(labelledObj.label)
// }
// let myObj = {size:10,label:"size 10 Object"}
// printLabel(myObj)

/**
 * 类型检查器会查看printLabel的调用  printLabel有一个参数 并要求这个对象参数有一个名为
 * label类型为string的属性 需要注意的是 我们传入的对象参数实际上会包含很多属性 但是编译器只会检查
 * 那些必需的属性是否存在 并且其类型是否匹配
 */
// interface LabelledValue {
//     label:string
// }
// function printLabel(labelledObj:LabelledValue) {
//     console.log(labelledObj.label)
// }
// let myObj = {size:10,label:'Size 10 Object'}
// printLabel(myObj)

/**
 * 可选属性的接口和普通接口定义差不多  只是在可选属性名字定义的后面加一个？符号
 * 可选属性的好处之一是 可以对可能存在的属性进行预定义 
 * 之二是 可以捕获引用了不存在的属性时的错误 
 */
// interface SquareConfig {
//     color?: string;
//     width?: number;
// }
// function createSquare(config:SquareConfig): {color:string;area:number} {
//     let newSquare = {color:"white",area:100};
//     if(config.color) {
//         newSquare.color = config.color
//     }
//     if(config.width) {
//         newSquare.area = config.width*config.width;
//     }
//     return newSquare
// }
// let mySquare = createSquare({color:"black",width:2})
// console.log(mySquare)

// interface SquareConfig {
//     color?:string;
//     width?:number;
// }

// function createSquare(config:SquareConfig): {color:string; area:number} {
//     let newSquare = {color:"white",area:100}
//     if(config.color) {
//         newSquare.color = config.color
//     }
//     if(config.width) {
//         newSquare.area = config.width * config.width
//     }
//     return newSquare
// }
// let mySquare = createSquare({color:"black"})


/**
 * 如果SquareConfig 带有上面定义的类型的color和width属性
 * 并且还会带有任意数量的其他属性 就可以按照以下的定义方式定义：
 */
// interface SquareConfig {
//     color?:string,
//     width?:number,
//     [propName:string]:any
// }

// interface SearchFunc {
//     (source:string,subString:string):boolean
// }
/**
 * 函数类型的接口 
 */
// let mySearch = SearchFunc;
// mySearch = function(source:string,subString:string) {
//     let result = source.search(subString)
//     return result > -1
// }

// interface StringArray {
//     [index:number]:string 
// }

// let myArray:StringArray;

// myArray = ["Bob","Fred"]

// let myStr:string = myArray[0]

// console.log(myStr)
/**
 * 我们定义了StringArray接口 它具有索引签名  这个索引签名表示了当用number去索引StringArray时会得到string类型的返回值
 * 
 * ts支持两种索引签名： 字符串和数字 可以同时使用两种类型的索引 但是数字索引的返回值必须是字符串索引返回值类型的子类型
 * 这是因为当使用number来索引时 js会将它转换成string然后再去索引对象
 */

// interface NumberDictionary {
//     [index: string]: number;
//     length:number;
// }

// interface ReadonlyStringArray {
//     readonly [index:number]:string;
// }
// let myArray: ReadonlyStringArray = ['Alice',"Bob"]
// myArray[1] = "Mallory"

// interface ClockInterface {
//     currentTime:Date;
//     setTime(d:Date);
// }
// class Clock implements ClockInterface {
//     currentTime:Date;
//     setTime(d:Date) {
//         this.currentTime = d
//     }
//     constructor(h:number,m:number) {}
// }

// const request = request("request");
// function fetchData(callback) {
//     request("url",function(error,response,body) {
//         callback(body)
//     })
// }

// interface Counter {
//     (start: number):string;
//     interval:number;
//     reset():void;
// }

// function getCounter():Counter {
//     let counter = <Counter>function(start:number) {};
//     counter.interval = 123;
//     counter.reset = function() {}
//     return counter
// }

// let c = getCounter();
// c(10)
// c.reset()
// c.interval = 5

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

// class Animal {
//     move(distanceInMeters: number = 0) {
//         console.log(`Animal moved ${distanceInMeters}m.`)
//     }
// }
// class Dog extends Animal {
//     bark() {
//         console.log("Woof! Woof!")
//     }
// }
// const dog = new Dog()
// dog.bark()
// dog.move()
// dog.bark()

// class Animal {
//     name:string;
//     constructor(theName:string) {
//         this.name = theName
//     }
//     move(distanceInMeters:number = 0) {
//         console.log(`${this.name} moved ${distanceInMeters} m.`)
//     }
// }

// class Snake extends Animal {
//     constructor(name:string) {
//         super(name)
//     }
//     move(distanceInMeters = 5) {
//         console.log("Slithering...")
//         super.move(distanceInMeters)
//     }
// }

// class Horse extends Animal {
//     constructor(name:string) {
//         super(name)
//     }
//     move(distanceInMeters = 45) {
//         console.log("Galloping...")
//         super.move(distanceInMeters)
//     }
// }

// let sam = new Snake("Sammy the Python")
// sam.move()
// let tom: Animal = new Horse("Tommy the Palomino")
// tom.move(34)

class Animal {
    public name: string;
    public constructor (theName:string) {
        this.name = theName
    }
    public move(distanceInMeters:number) {
        console.log(`${this.name} moved ${distanceInMeters} m.`)
    }
}
new Animal("Cat").name