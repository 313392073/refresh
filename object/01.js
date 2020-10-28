/**
 * 访问一个对象的属性都是一个 属性访问 无论你得到什么类型的值 
 * 如果你恰好从属性访问中得到一个函数  他也没有魔法般的在那时成为一个方法 
 * 一个从属性访问得来的函数没有任何特殊性
 * 
 * 有些函数内部确实拥有this引用  而且有时这些this引用指向调用点的对象引用
 * 但是这个用法确实没有使这个函数比其他函数更像“方法” 因为this 是在运行时在调用点动态绑定的
 * 着使得它与这个对象的关系之多是间接的
 */
// function foo() {
//     console.log("foo")
// }
// var someFoo = foo;
// var myObject = {
//     someFoo:foo
// }

// // foo() //foo
// // someFoo() //foo
// myObject.someFoo() //foo

/**
 * someFoo 和 myObject.someFoo只不过是同一个函数的两个分离的引用
 * 他们中的任何一个都不意味着这个函数很特别或被其他对象所"拥有"
 * 如果foo()定义里面拥有一个this引用  那么myObject.someFoo的
 * 隐含绑定 将会是这个两个引用间 唯一 可以观察到的不同  他们中的
 * 任何一个都没有称为“方法”的道理
 */

// var myObject = {
//     foo:function foo() {
//         console.log("foo")
//     }
// }

// var someFoo = myObject.foo;

// someFoo()
// myObject.foo()

// var myArray = ['foo',42,'bar']
// myArray['5'] = 'ss'
// console.log(myArray,myArray.length)

function anoterFunction(){

}
var anotherObject ={
    c:true
}

var anoterArray = [];

var myObject = {
    a:2,
    b:anotherObject,
    c:anoterArray,
    d:anoterFunction
}
anoterArray.push(anotherObject,myObject)
// console.log(anoterArray)
// [
//     {
//         c:true
//     },
//     {
//         a:2,
//         b:anotherObject,
//         c:anoterArray,
//         d:anoterFunction
//     }
// ]

/**
 * 一个浅拷贝 会得到一个新对象 它的a是值2的拷贝 
 * 但是b、c和d属性仅仅是引用  他们指向被拷贝对象中引用的相同位置
 * 一个深拷贝将不仅复制myObject 还会复制anotherObject 和 anotherArray
 * 但是之后我们让anotherArray 拥有anotherObject和myObject的引用 所以那些也应当被
 * 复制而不是仅保留引用  现在由于循环引用  我们得到了一个无限循环复制的问题
 */
//  var newObj = JSON.parse(JSON.stringify(someObj))
/**
 * Object.assign(...)接收目标对象作为第一个参数 然后是一个或多个源 对象
 * 作为后续参数  他会在源 对象上迭代所有的可枚举  并把它们拷贝到目标对象上（仅通过 = 赋值）
 * 他还会很方便的返回目标对象 
 */

// var myObject = {
//     get a() {
//         return this._a_;
//     },
//     set a(val) {
//         this._a_ = val * 2
//     }
// }
// myObject.a = 2;
// console.log(myObject.a)

// function mixin(sourceObj,targetObj) {
//     for(var key in sourceObj) {
//         //仅拷贝非既存内容
//         if(!(key in targetObj)) {
//             targetObj[key] = sourceObj[key]
//         }
//     }
//     return targetObj;
// }

// var Vehicle = {
//     engines:1,
//     ingition:function() {
//         console.log('turning on mu engine.')
//     },
//     drive:function() {
//         this.ingition();
//         console.log('steering and moving forward!')
//     }
// }
// var Car = mixin(Vehicle,{
//     wheels:4,
//     drive:function() {
//         Vehicle.drive.call(this)
//         console.log('rolling on all'+this.wheels+"wheels!")
//     }
// })
// console.log(Car)

/**
 * Vehicle和Car分别只是我们实施拷贝的源和目标对象
 * Car 现在拥有了一份从Vehicle 得到的属性和函数的拷贝
 * 
 * 函数实际上没有被复制  而是指向函数的引用被复制了 所以  Car现在有一个称为ignition的属性
 *  它是一个ignition() 函数引用的拷贝 而且它还有一个称为engines的属性 持有从Vehicle拷贝来的值1
 */

// function Vehicle() {
//     this.engines = 1
// }

// Vehicle.prototype.ingition = function() {
//     console.log('Turning on my engine.')
// }

// Vehicle.prototype.drive = function() {
//     this.ingition()
//     console.log('steering and moving forward!')
// }

// function Car() {
//     var car = new Vehicle()
//     car.wheels = 4;
//     var vehDrive = car.drive;
//     car.drive = function() {
//         vehDrive.call(this)
//         console.log("rolling on all"+this.wheels+" wheels!")
//     }
//     return car;
// }

// var myCar = new Car()
// myCar.drive();

var Something = {
    cool:function() {
        this.greeting = "hello world"
        this.count = this.count?this.count+1:1
    }
}
Something.cool()
console.log(Something.greeting)
console.log(Something.count)

var Another = {
    cool:function() {
        //隐式的将something 会入Another
        Something.cool.call(this)
    }
}
Another.cool()
console.log(Another.greeting)
console.log(Another.count)
/**
 * Something.cool.call(this)既可以在"构造器"调用中使用
 * 也可以在方法调用中使用 我们实质上“借用”了Something.cool() 函数并在
 * Another环境下  而非Something 环境下调用它
 * 结果是  Something.cool() 中进行的赋值被实施到了nother对象 而非Something对象
 */