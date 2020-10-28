// console.log((() => 3)())
// console.log((() => (3))())
/**
 * 函数隐式返回值
 * 函数省略大括号  或者将大括号改成小括号可以确保代码以单个语句的形式进行求值
 */
// console.log(function(){return 2}())
//  const Func = function(){return 2}()
// Promise.reject('这是第二个reject值').then(data => {
//     console.log(data)
// }).catch(err => {
//     console.log(1,err)
// })

function getSomething() {
    return "something";
}
async function testAsync() {
    return Promise.resolve("hello async")
}
async function test() {
    const v1 = await getSomething();
    const v2 = await testAsync();
    console.log(v1,v2)
}
test()