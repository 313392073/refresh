/**
 * filter 返回符合条件的数组 输出的是一个数组
 */
/**
 * 1 普通的数组
 */
const arr1 = [1,2,3,4,5,8,9]
const arr2 = [5,6,7,8,9]
const intersection = arr1.filter(function(val) {
    return arr2.indexOf(val)>-1
})
console.log(intersection) //[ 5, 8, 9 ]
/**
 * 数组对象 数组对象目前仅针对value 值为简单的Number String Boolean 数据类型文中JSON.stringify 比较对象是简写方法
 */
const arr3 = [{name:'name1',id:1},{name:'name2',id:2},{name:'name3',id:3}]
const arr4 = [{name:'name1',id:1},{name:'name2',id:2},{name:'name4',id:4}]

const result = arr4.filter((v) => {
    return arr3.some(n => JSON.stringify(n) === JSON.stringify(v))
})
console.log(result) //[ { name: 'name1', id: 1 }, { name: 'name2', id: 2 } ]