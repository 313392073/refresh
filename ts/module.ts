/**
 * 内部模块： 命名空间
 * 外部模块： 模块
 * 
 *  模块在其自身的作用域里执行  而不是在全局作用域里 这意味着定义在一个模块里的变量  函数  类等等在模块外部是不可见的
 *  除非你明确的使用export 形式之一导出他们 相反  如果想使用其他模块导出的变量 函数 类  接口等的时候  你必须要导入他们 import形式之一
 * 
 *  模块是自声明的 两个模块之间的关系是通过在文件级别上视同imports和exports建立的
 * 
 *  模块使用模块加载器去导入其他的模块 在运行时 模块加载器的作用是在执行此模块代码前去查找并执行
 *  这个模块的所有依赖 任何包含顶级import和export的文件都被当成一个模块
 */

 /**
  * 导出
  *  任何声明都能通过添加export关键字来导出
  * 
  *     implements 关键字将类A当作一个接口 这意味着类C必须去实现定义在A中所有的方法 无论这些方法是否在类A中有没有默认的实现
*       同时 也不用在类C中定义super方法
  */
// export interface StringValidator {
//     isAcceptable(s:string):boolean
// }

// export const numberRegexp = /^[0-9]+$/
// export class ZipCodeValidator implements StringValidator {
//     isAcceptable(s:string) {
//         return s.length === 5 && numberRegexp.test(s)
//     }
// }

/**
 * 导出语句很便利 因为我们可以需要对导出的部分重命名 所以上面的例子可以这样子改写
 */

// class ZipCodeValidator implements StringValidator {
//     isAcceprable(s:string) {
//         return s.length === 5 && numberRegexp.test(s)
//     }
// }
// export {ZipCodeValidator}
// export {ZipCodeValidator as mainValidator}

/**
 * 重新导出
 *  我们经常会去扩展其他模块 并且只导出那个模块的部分内容 重新导出功能并不会在当前模块导入那个模块
 *  或定义一个新的局部变量
 */

// export class ParseIntBasedZipCodeValidator {
//     isAcceptable(s:string) {
//         return s.length === 5 && parseInt(s).toString() === s;
//     }
// }

/**
 * 导入 
 *  模块的导入操作与导出一样简单  可以使用以下import形式之一来导入其他模块中的导出内容
 * 
 *  具有副作用的导入模块
 *  尽管不推荐这么做  一些模块会设置一些全局状态供其他模块使用  
 * 这些模块可能没有任何的导出或用户根本就不关注他的导出 
 * import "./my-module.js"
 */

/**
 * 默认导出
 *   每个模块都可以有一个default导出 默认导出使用default关键字标记
 * 并且一个模块只能够有一个default导出 需要使用一种特殊的导入形式来导入default导出
 */

 /**
  *命名空间
    随着更多验证器的加入  我们需要一种手段来组织代码 以便于记录他们类型的同时 还不用担心与其他对象产生
    命名冲突  因此 我们把验证器包裹到一个命名空间内 而不是把他们放在全局命名空间下
        在以下的例子中 把所有与验证器相关的类型都放到一个叫做Validation的命名空间里
        因为我们想让这些接口和类在命名空间之外也是可访问的 所以需要使用export
  */
namespace Validation {
    export interface StringValidator {
        isAcceptable(s:string):boolean
    }
    const lettersRegexp = /^[A-Za-z]+$/
    const numberRegexp = /^[0-9]+$/

    export class LettersOnlyValidator implements StringValidator {
        isAcceptable(s:string) {
            return lettersRegexp.test(s)
        }
    }

    export class ZipCodeValidator implements StringValidator {
        isAcceptable(s:string) {
            return s.length === 5 && numberRegexp.test(s)
        }
    }
}

let strings = ["hello",'97052',"101"]

let Validatiors:{[s:string]:Validation.StringValidator} = {}