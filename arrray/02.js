// const arr1 = [1,2,3,4,5]
// const arr2 = [4,5,6,7,8]
// const result = arr1.concat(arr2.filter(v => !arr1.includes(v)))
// // console.log(result) //[ 1, 2, 3, 4, 5, 6, 7, 8 ]

// const arr3 = [{name:'name1',id:1},{name:'name2',id:2},{name:'name3',id:3}]
// const arr4 = [{name:'name1',id:1},{name:'name4',id:4},{name:'name5',id:5}]
// let arr5 = arr3.concat(arr4)
// let resultd = []
// let obj = []
// resultd = arr5.reduce((prev,cur,index,arr) => {
//     obj[cur.id]?'':obj[cur.id] = true && prev.push(cur)
//     return prev
// },[])
// // console.log(resultd)

// const diff = arr1.filter(item => !new Set(arr2).has(item))
// // console.log(diff)  //[ 1, 2, 3 ]
// let result2 = arr3.filter(v => {
//     return arr4.every(n => {
//         JSON.stringify(n) !== JSON.stringify(v)
//     })
// })
// // console.log(result2)

// const arr = [{name:'Rom',age:12},{name:'Bob',age:22}].sort((a,b) => {
//     return b.age - a.age
// })
// // console.log(arr)

// // console.log(Math.max(...[1,2,3,4,8]))
// // console.log(Math.max.apply(this,[1,2,3,4,8]))

// const brr = [{ id: 1, name: 'jack' },{ id: 2, name: 'may' },{ id: 3, name: 'shawn' },{ id: 4, name: 'tony' }]
// let brr1 = Math.max.apply(Math,brr.map(item => {
//     return item.id
// }))
// let brr2 = brr.sort((a,b) => {
//     return b.id - a.id
// })
// // console.log(brr1)
// console.log(brr2)

// const sum = [1,2,3,4].reduce(function (prev,cur) {
//     return prev+cur
// },0)
// // console.log(sum)

// const sum1 = [{age:1},{age:2}].reduce((prev,cur) => {
//     return prev+cur.age
// },0)
// console.log(sum1)
/**
 * 数组合并
 */
// console.log([1,2,3,4].concat([5,6]))
// console.log([...[1,2,3],...[4,5]])
// const arrA = [1,2]
// const arrB = [3,4]
// const arrC = [].concat.apply(arrA,arrB)
// console.log(arrC)

// const arr4 = [{age:1}].concat([{age:2}])
// console.log(arr4)

/**
 * 数组是否包含
 * includes() 返回true或者false
 * indexOf()  如果存在就返回索引
 */
// console.log([1,2,3].includes(4)) 
// console.log([1,2,3].indexOf(4))
// console.log([1,2,3].find((item) => item === 4))
// console.log([1,2,3].findIndex((item) => item === 3))

// const flag = [{age:1},{age:2}].some(v=> JSON.stringify(v) === JSON.stringify({age:2}))
// console.log(flag)

/**
 * 数组每一项都满足
 */
// const isHas = [1,2,3].every(item => {return item > 0})
// const arr = [{age:3},{age:4},{age:5}]
// const isHas = arr.every(item => {
//     return item.age > 5
// })
// console.log(isHas)
/**
 * 数组有一项满足
 */
// const flag = [1,2,3].some(item => {return item>2})
// const arr = [{age:3},{age:5},{age:2}]
// const flag = arr.some(item => { return item.age < 4})
// console.log(flag)


/**
 * 排序
 */
// function sortNumber(a,b) {
//     return a - b
// }
// const b = [1,2,3,4,5,6]
// const a = ["1.5", "1.5", "1.40", "1.25", "1.1000", "1.1"];

// console.log(a.sort(sortNumber))
// console.log(b.sort(sortNumber))
//去除数组空值 || 空格
if(!Array.prototype.trim) {
    Array.prototype.trim = function() {
        let arr = [];
        this.forEach(e => {
            if(e.match(/\s+/)) {
                arr.push(e)
            }
        })
        return arr
    }
}

//提取数字部分
function toNum(a) {
    let d = a.toString()
    let c = d.split(/\D/).trim();
    let num_place = ["","0","00","000"];
    let r = num_place.reverse();
    for(let i=0;i<c.length;i++) {
        let len = c[i].length
        c[i] = r[len]+c[i]
    }
    let res = c.join('')
    return res
}
//提取字符
function toChar(a) {
    let d = a.toString();
    let c = d.split(/\.|\d/).join('')
    return c
}

function sortVersions(a,b) {
    let _a1 = toNum(a);
    let _b1 = toNum(b)
    if(_a1 !== _b1) {
        return _a1 - _b1
    }else{
        _a2 = toChar(a).charCodeAt(0).toString(16)
        _ab = toChar(b).charCodeAt(0).toString(16)
        return _a2 - _b2
    }
}