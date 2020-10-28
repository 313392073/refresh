/**
 * Object.prototype.toString.call() 使用Object 对象的原型方法toString
 * 使用call进行狸猫换太子 借用Object的toString方法
 */
// var a = Object.prototype.toString
// console.log(a.call(2))
// console.log(a.call(true))
// console.log(a.call('str'))
// console.log(a.call([]))
// console.log(a.call(function(){}))
// console.log(a.call({}))
// console.log(a.call(undefined))
// console.log(a.call(null))

/**
 * js中数据类型的判断（typeof instanceof constructor Object.prototype.toStrng.call()）
 */

 /**
  * typeof 对于原始类型来说  除了null 都可以显示正确的类型
  * typeof 对于对象来说 除了函数都会显示object 所以说typeof并不能准备判断变量到底是什么类型
  * 所以想判断一个对象的正确类型 这时候可以考虑使用instanceof
  */
//   console.log(typeof 1)
//   console.log(typeof true)
//   console.log(typeof 'str')
//   console.log(typeof []) //[] 数组的数据类型在typeof 中被解释为object
//   console.log(typeof function(){})
//   console.log(typeof {})
//   console.log(typeof undefined)
//   console.log(typeof null) //null 的数据类型被typeof解释为object

/**
 * instanceof
 * instanceof 可以正确的判断对象的类型  因为内部机制是通过判断对象的原型链中是不是能找到类型的prototype
 */
console.log(2 instanceof Number) //false
console.log([] instanceof Array) //true
// console.log(undefined instanceof Undefined)
// console.log(null instanceof Null)

/**
 * 可以看出直接的字面量值判断数据类型  instanceof 可以精准判断引用数据类型（Array Function Object）
 * 而基本数据类型不能被instanceof精准判断
 */

 const unique1 = arr => {
   let len = arr.length;
   for(let i=0;i<len;i++) {
     for(let j=i+1;j<len;j++) {
       if(arr[i] === arr[j]) {
         arr.splice(j,1)
         len--;
         j--;
       }
     }
   }
   return arr
 }

const unique1 = arr => {
  const res = [];
  for(let i=0;i<arr.length;i++) {
    if(!res.includes(arr[i])) res.push(arr[i])
  }
  return res;
}

export function setRootSize() {
  document.documentElement.style.fontSize = (100*window.innerWidth)/375+"px";
  window.addEventListener("load",function() {
    setTimeout(() => {
      document.documentElement.style.fontSize = (100*window.innerWidth)/375+"px";
      window.unit = (100*this.window.innerWidth)/375;
      let e = document.createEvent("Event");
      e.initEvent("adjustReady",true,true);
      window.dispatchEvent(e);
    },480)
  })
  window.onresize = () => {
    setTimeout(() => {
      document.documentElement.style.fontSize = (100*window.innerWidth)/375+"px";
    },480)
  };
  window.addEventListener("orientationchange",() => {
    setTimeout(() => {
      document.documentElement.style.fontSize = (100*window.innerWidth)/375+"px"
    },480)
  })
}