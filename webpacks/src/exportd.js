// export default "斤斤计较"
// console.log("模块文件order.js")
// export default {
//     name:'哈哈哈哈ssssss',
//     total:(a,b) => {
//         return a*b
//     }
// }

// export const name = "订单系统1"
// export const total = (a,b) => {
//     return a*b
// }

const name = "订单系统2"
const total = (a,b) => {
    return a+b
}
export {name,total as getTotal}