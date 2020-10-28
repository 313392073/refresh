let isDone: boolean = false;
let count: number = 10;
let named: string = "Sstrings";

let list: number[] = [1,2,3]; //array
let list1: Array<number> = [1,2,3]; //Array<number> 泛型语法

/**
 * enum 类型
 *  使用枚举我们可以定义一些带名字的常量 使用枚举可以清晰地表达意图或创建一组有区别的用例
 */
// enum Directon {
//     NORTH,
//     SOUTH,
//     EAST,
//     WEST
// }
// let dir: Directon = Directon.NORTH

/**
 * 字符串枚举 在一个字符串枚举里 每个成员都必须使用字符串字面量 或另外一个字符串枚举成员进行初始化
 */
// enum Directon {
//     NORTH = 'NORTH',
//     SOUTH = 'SOUTH',
//     EAST = 'EAST',
//     WEST = 'WEST'
// }

/**
 * Any类型
 * 任何类型都可以被归为any类型 这让any类型成为了类型系统的顶级类型 也被称作全局超级类型
 */