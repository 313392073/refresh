/**
 * 比较两个函数
 *    相对来讲 在比较原始类型和对象类型的时候 是比较容易理解的 问题是如何判断两个函数是兼容的
 *  要查看x是否能赋值给y 首先看他们的参数列表 x的每个参数必须能在y里找到对应类型的参数
 *  要注意的是  参数的名字相同与否无所谓  只看他们的类型 这里 x的每个参数在Y中都能找到对应的参数 所以允许赋值
 *  y = x //ok
 *  x = y //error 因为y有个必须的第二个参数  但是x并没有 所以不允许赋值
 */
// let x = (a:number) => 0;
// let y = (b:number,s:string) => 0

/**
 * 函数参数双向协变
 *  当比较函数参数类型时 只有当源函数参数能够赋值给目标函数或者反过来时才能赋值成功 这是不稳定的 
 */

enum EventType {Mouse,Keyboard}
interface Event {timestamp:number}
interface MouseEvent extends Event { x:number;y:number }
interface KeyEvent extends Event { keyCode:number }

function listenEvent (eventType:EventType,handler:(n:Event) => void) {

    
}