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


// // 1. 创建 context 得到两个组件
// const { Provider, Consumer } = React.createContext()
// // 2. 将父组件使用 Provider 包裹
// // 3. 设置 Provider 的属性 value，表示要传递的数据
// // 4. 使用COnsumer 组件接收数据
// class App extends React.Component {
//   render() {
//     return (
//       <Provider value="pink">
//         <div>
//           <Node />
//         </div>
//       </Provider>
//     )
//   }
// }
// const Node = props => {
//   return (
//     <div>
//       <SubNode />
//     </div>
//   )
// }

// const SubNode = props => {
//   return (
//     <div>
//       <Child />
//     </div>
//   )
// }
// const Child = props => {
//   return (
//     <div>
//       <Consumer>{data => <span>我是子节点=={data}</span>}</Consumer>
//     </div>
//   )
// }


// ReactDOM.render(<App />, document.getElementById('root'))

// props.children
// const App = props => {
//   console.log(props.children)
//   return (
//     <div>
//       <h1>组件标签的子节点</h1>
//       {props.children}
//     </div>
//   )
// }

// ReactDOM.render(<App>我是子节点</App>, document.getElementById('root'))


// const App = props => {
//   console.log(props.children)
//   props.children()
//   return (
//     <div>
//       <h1>组件标签的子节点</h1>
//       {/* {props.children} */}
//     </div>
//   )
// }

// // 文本节点
// // ReactDOM.render(<App>我是子节点</App>, document.getElementById('root'))


// // React 元素
// // ReactDOM.render(<App><p>我是一个React 元素标签</p></App>, document.getElementById('root'))


// // 组件节点
// // const Test = () => <button>我是button组件</button>
// // ReactDOM.render(<App><Test /></App>, document.getElementById('root'))


// // 传递函数
// // ReactDOM.render(<App>{() => console.log('这是一个函数子节点')}</App>, document.getElementById('root'))



// props 校验
// import PropTypes from 'prop-types'

// const App = props => {
//   const arr = props.colors
//   const lis = arr.map((item, index) => <l1 key={index}>{item.name}</l1>)

//   return <ul>{lis}</ul>
// }

// App.propTypes = {
//   colors: PropTypes.array
// }

// ReactDOM.render(<App colors={19} />, document.getElementById('root'))

// import PropTypes from 'prop-types'

// const App = props => {
//   return (
//     <div>
//       <h1>props校验</h1>
//     </div>
//   )
// }

// App.propTypes = {
//   a: PropTypes.number,
//   fn: PropTypes.func.isRequired,
//   tag: PropTypes.element,
//   filter: {
//     area: '上海',
//     price: 1999
//   }
// }

// const App = props => {
//   return (
//     <div>
//       <h1>此处展示 props 默认值: {props.pageSize}</h1>
//     </div>
//   )
// }

// App.defaultProps = {
//   pageSize: 10
// }

// ReactDOM.render(<App />, document.getElementById('root'))
// ReactDOM.render(<App pageSize={20} />, document.getElementById('root'))

// 创建时
// class App extends React.Component {
//   constructor(props) {
//     super(props)
//     console.warn('生命周期钩子函数：constructor')
//   }

//   componentDidMount() {
//     console.warn('componentDidMount')
//   }

//   render() {
//     console.warn('render')
//     return (
//       <div>
//         <h1>render</h1>
//       </div>
//     )
//   }
// }

// ReactDOM.render(<App />, document.getElementById('root'))


// 更新时
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 0
    }
    console.warn('生命周期钩子函数：constructor')
  }

  handleClick = () => {
    this.setState({
      count: this.state.count + 1
    })
  }

  render() {
    console.warn('App render')
    return (
      <div>
        <Counter />
        <button onClick={this.handleClick}></button>
        <h1>App render</h1>
      </div>
    )
  }
}

class Counter extends React.Component {
  render() {
    return <h1>子组件</h1>
  }
}

ReactDOM.render(<App />, document.getElementById('root'))