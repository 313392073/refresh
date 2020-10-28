/**
 * 任何函数都有call这个方法 call属于Function.prototype的一个方法
 * 所以每个function 实例都有一个call属性
 */

//  [].slice.call(obj)
/**
 * slice 这个方法在不接受任何参数的时候会返回this本身
 * arguments 是属于函数内部的变量 其值是函数参数列表  一个类数组对象 是具有长度属性的 
 * 却并不是数组  不具备slice这个方法  那就意味着arguments.slice()行不通
 * 
 * [].slice.call(arguments)或者Array.prototype.slice.call(arguments)方法可以让arguments拥有数组的所有方法
 * call方法的含义： 改变this指向 obj1.(method).call(obj2,arhument1,argument2)
 * 如上  call 的作用就是把obj1的方法放到obj2上使用 后面的argument1...这些作为参数传入
 */

// Object.prototype.toString.call()