import React from 'react'
import ReactDOM from 'react-dom'

/**
 * 函数组件：
 */

// function Hello() {
//   return (
//     <div>这是一个函数组件</div>
//   )
// }

// ReactDOM.render(<Hello />, document.getElementById('root'))

// const Hello = () => <div>这是一个箭头函数组件</div>

// ReactDOM.render(<Hello />, document.getElementById('root'))

/**
 * 类组件
 */
// class Hello extends React.Component {
//   render() {
//     return (
//       <div>类组件</div>
//     )
//   }
// }

// ReactDOM.render(<Hello />, document.getElementById('root'))


// 抽离组件
// import Hello from './Hello'
// ReactDOM.render(<Hello />, document.getElementById('root'))


// React 时间处理

// class App extends React.Component {
//   render() {
//     return (
//       <button onClick={this.handleClick}>点我，点我</button>
//     )
//   }
//   handleClick() {
//     console.log('事件触发了')
//   }
// }

// ReactDOM.render(<App />, document.getElementById('root'))


// function App() {
//   function handleClick() {
//     console.log('触发了')
//   }

//   return (
//     <button onClick={handleClick}>点我</button>
//   )
// }
// ReactDOM.render(<App />, document.getElementById('root'))


// 合成对象
// function App() {
//   function handleClick(e) {
//     e.preventDefault()
//     console.log('a标签的单击事件触发了')
//   }

//   return (
//     <a href="http://nicexch.cn" onClick={handleClick}>点我</a>
//   )
// }
// ReactDOM.render(<App />, document.getElementById('root'))


// 有状态组件和无状态组件


// state 和 setState()
// class App extends React.Component {
//   state = {
//     count: 0,
//     test: 'a',
//   }

//   addCount() {
//     this.setState({ count: this.state.count + 1 })
//   }

//   render() {
//     return (
//       <div>
//         <h1>计数器：{this.state.count}</h1>
//         <button onClick={() => {
//            this.setState({ count: this.state.count + 1 })
//         }}>+ 1</button>
//       </div>
//     )
//   }
// }

// ReactDOM.render(<App />, document.getElementById('root'))


// 抽离逻辑代码

// class App extends React.Component {
//   state = {
//     count: 0,
//     test: 'a',
//   }

//   addCount() {
//     this.setState({ count: this.state.count + 1 })
//   }

//   render() {
//     return (
//       <div>
//         <h1>计数器：{this.state.count}</h1>
//         <button onClick={this.addCount.bind(this)}>+ 1</button>
//       </div>
//     )
//   }
// }

// ReactDOM.render(<App />, document.getElementById('root'))

// 表单处理
// 受控组件
// class App extends React.Component {
//   state = {
//     txt: '',
//     content: '',
//     city: 'bj',
//     isChecked: false
//   }
//   // 处理
//   handleForm = e => {
//     // 获取当前 DOM 对西那个
//     const target = e.target;
//     // 根据类型获取值
//     const value = target.type === 'checkbox'
//       ? target.checked
//       : target.value

//     // 获取 name
//     const name = target.name

//     this.setState({
//       [name]: value
//     })
//   }

//   render() {
//     return (
//       <div>
//         {/* 输入框 */}
//         <input type="text" name="txt" value={this.state.txt} onChange={this.handleForm} />
//         <br />
//         {/* 富文本框 */}
//         <textarea type="text" name="content" value={this.state.content} onChange={this.handleForm} />
//         <br />
//         {/* 下拉框 */}
//         <select name="city" value={this.state.city} onChange={this.handleForm}>
//           <option value="sh">上海</option>
//           <option value="gz">广州</option>
//           <option value="bj">北京</option>
//         </select>
//         <br />
//         {/* 复选框 */}
//         <input type="checkbox" name="isChecked" checked={this.state.isChecked} onChange={this.handleForm} />
//       </div>
//     )
//   }
// }

// ReactDOM.render(<App />, document.getElementById('root'))

// 非受控组件
class App extends React.Component {
  constructor() {
    super()

    this.txtRef = React.createRef()
  }

  getTxt = () => {
    console.log(this.txtRef.current.value)
  }

  render() {
    return (
      <div>
        <input type="text" ref={this.txtRef} />
        <button onClick={this.getTxt}>获取输入框的值</button>
      </div>
    )
  }
}
ReactDOM.render(<App />, document.getElementById('root'))