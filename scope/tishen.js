/**
 * 函数作用域和块作用域的行为都是依赖这个相同规则的：
 *  在一个作用域中声明的任何变量都附着在这个作用域上
 * 
 * 提升： 先有神明 后有赋值（变量和函数）
 *  注意：只有声明本身被提升了，而任何赋值或者其他的执行逻辑都被留在原处
 *  并且 提升是 以作用域为单位的
 * 
 *  函数声明会被提升 但是函数表达式不会 
 */
// function foo() { //函数声明
//     console.log(1)
// }

// var bar = function() { //函数表达式
//     console.log("bar")
// }

/**
 *  函数声明和变量声明都会被提升 但一个微妙的细节是：
 *      函数会首先被提升  然后才是变量
 */
// foo();
// var foo; //这地方是一个重复的声明 会被无视
// function foo() {
//     console.log(1)
// }
// foo = function() {
//     console.log(2)
// }


// foo();
// function foo() {
//     console.log(1)
// }
// var foo = function() {
//     console.log(2)
// }
// function foo() {
//     console.log(3)
// }

/**
 * 闭包 就是函数能够记住并访问他的词法作用域  
 * 即使当这个函数在他的词法作用于之外执行时
 */

// function foo() {
//     var a = 2;
//     function bar() {
//         console.log(a)
//     }
//     bar()
// }
// foo()

function foo() {
    var a = 2;
    function bar() {
        console.log(a)
    }
    return bar()
}
var baz = foo
baz()
/**
 * 函数bar()对于foo()内的作用域拥有词法作用域的访问权 但是之后我们拿起bar()
 * 这个函数本身 将它像值一样传递 在上面的例子中 我们return bar引用的函数对象本身
 * 
 * 在执行foo()之后  我们将它返回的值（内部bar()函数）赋予一个称为baz的变量
 * 然后我们实际的调用baz() 这将理所当然的调用我们内部的函数bar() 只不过是通过
 * 一个不同的标识符引用
 * 
 * bar()被执行了  必然的 但是在这个例子中 他是在它被声明的词法作用域外部被执行的
 * 
 * foo()被执行之后  一般来说 我们会期望foo()的整个内部作用域都将消失 因为我们知道 
 * 引擎启用了垃圾回收器 在内存不再被使用时来回收他们  因为很显然foo()的内容不再被使用了
 * 所以看起来他们很自然的应该被认为是消失了
 * 
 * 但是闭包的"魔法"不会让这发生 内部的作用域实际上依然“在使用” 因此将不会消失 是在使用它？函数bar()本身
 * 
 * 有赖于它被声明的位置 bar() 拥有一个词法作用域闭包覆盖折foo()的内部作用域 闭包为了能使bar()
 * 在以后任意的时刻可以引用这个作用域而保持它的存在
 * 
 * bar()依然拥有对那个作用域的引用  而这个引用称为闭包
 */