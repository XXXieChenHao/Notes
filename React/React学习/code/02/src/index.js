import React from 'react'
import ReactDOM from 'react-dom'


// const Hello = (props) => {
//   return (
//     <div>
//       <h1>props: {props.name}</h1>
//     </div>
//   )
// }

// ReactDOM.render(<Hello name="jack" />, document.getElementById('root'))


// class Hello extends React.Component {
//   render() {
//     return (
//       <div>
//         <h1>name: {this.props.name}</h1>
//         <h2>age: {this.props.age}</h2>
//       </div>
//     )
//   }
// }


// ReactDOM.render(<Hello name="rose" age={19} />, document.getElementById('root'))

// 父组件传递数据给子组件

// class Parent extends React.Component {
//   state = {
//     lastName: 'NiceXch'
//   }

//   render() {
//     return (
//       <div>
//         父组件：{this.state.lastName}
//         <Child name={this.state.lastName} />
//       </div>
//     )
//   }
// }

// const Child = (props) => {
//   return (
//     <div>
//       <p>子组件，接收到父组件的数据: {props.name}</p>
//     </div>
//   )
// }

// ReactDOM.render(<Parent />, document.getElementById('root'))

// 子传父
// class Parent extends React.Component {
//   state = {
//     msg: ''
//   }
//   getChildMsg = (msg) => {
//     this.setState({
//       msg: msg
//     })
//   }

//   render() {
//     return (
//       <div>
//         父组件：{this.state.msg}
//         <Child getMsg={this.getChildMsg} />
//       </div>
//     )
//   }
// }

// class Child extends React.Component {
//   state = { msg: 'React' }
//   handleClick = () => {
//     this.props.getMsg(this.state.msg)
//   }
//   render() {
//     return (
//       <div>
//         <button onClick={this.handleClick}>点击传递</button>
//       </div>
//     )
//   }
// }

// ReactDOM.render(<Parent />, document.getElementById('root'))


// class Counter extends React.Component {
//   // 提供共享状态
//   state = {
//     count: 0
//   }

//   // 提供修改状态的方法
//   onIncrement = (step) => {
//     this.setState({
//       count: this.state.count + step
//     })
//   }
//   render() {
//     return (
//       <div>
//         <Child1 count={this.state.count} />
//         <Child2 onIncrement={this.onIncrement} />
//       </div>
//     )
//   }
// }

// const Child1 = (props) => {
//   return <h1>计数器：{props.count}</h1>
// }

// const Child2 = (props) => {
//   let step = 3
//   return <button onClick={() => props.onIncrement(step)}>+{step}</button>
// }


// ReactDOM.render(<Counter />, document.getElementById('root'))


// 1. 创建 context 得到两个组件
const { Provider, Consumer } = React.createContext()
// 2. 将父组件使用 Provider 包裹
// 3. 设置 Provider 的属性 value，表示要传递的数据
// 4. 使用COnsumer 组件接收数据
class App extends React.Component {
  render() {
    return (
      <Provider value="pink">
        <div>
          <Node />
        </div>
      </Provider>
    )
  }
}
const Node = props => {
  return (
    <div>
      <SubNode />
    </div>
  )
}

const SubNode = props => {
  return (
    <div>
      <Child />
    </div>
  )
}
const Child = props => {
  return (
    <div>
      <Consumer>{data => <span>我是子节点=={data}</span>}</Consumer>
    </div>
  )
}


ReactDOM.render(<App />, document.getElementById('root'))