//代码量少的情况 可以直接写在标签上
{/* <input type="text" ref="mytext" />
<button onClick={() => {
    console.log('onclick',this.$refs.mytext)
}}>add</button> */}

//方便传参 改变this执行
{/* <button onClick={this.handleAdd2.bind(this)}>add2</button>
handleAdd2() {
    console.log('click1',this.refs.mytext.value)
} */}

//箭头函数无法传参
{/* <button onClick={this.handleAdd3}>add3</button>
handleAdd3 = () => {
    console.log(this.$refs.mytext.value)
} */}

//组合写法
{/* <button onClick={() => {this.handleAdd3('aaa','bbb')}}>add4</button>
handleAdd3 = (x,y) => {
    console.log(x,y,'click2',this.refs.mytext.value)
} */}

// call: 可以传入多个参数  改变this指向后立刻调用函数
// apply: 可以传入数组  改变this指向后立刻调用函数
// bind：改变this指向后 可以传入多个参数  返回的是函数  不会立即调用

// var obj1 = {
//     name:'obj1',
//     getName() {
//         console.log(this.name)
//     }
// }
// var obj2 = {
//     name:'obj2',
//     getName() {
//         console.log(this.name)
//     }
// }

// obj1.getName.call(obj2,'aaa','bbb','ccc')

export default class App extends Component {
    state = {
        myname:'5678',
    }
    render() {
        return (
            <div>{this.state.myname}</div>
        )
    }
}