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


function App() {
  function handleClick() {
    console.log('触发了')
  }

  return (
    <button onClick={handleClick}>点我</button>
  )
}
ReactDOM.render(<App />, document.getElementById('root'))