import React from "react";
import './App.css'

function App() {
    return (
        <div className="App">
            <h1>你好呀</h1>
            <p>今天又是充满希望的一天。。。</p>
        </div>
    )
}
export default App

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            text:'我是...'
        }
    }
    updateText() {
        this.setState({
            text:'今天天气不错'
        })
    }
    render() {
        return (
            <div className="App">
                <p>我是一个动态的数据：{this.state.text}</p>
                <button onClick={this.updateText.bind(this)}>更换</button>
            </div>
        )
    }
}