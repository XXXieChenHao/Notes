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
class Parent extends React.Component {
  state = {
    msg: ''
  }
  getChildMsg = (msg) => {
    this.setState({
      msg: msg
    })
  }

  render() {
    return (
      <div>
        父组件：{this.state.msg}
        <Child getMsg={this.getChildMsg} />
      </div>
    )
  }
}

class Child extends React.Component {
  state = { msg: 'React' }
  handleClick = () => {
    this.props.getMsg(this.state.msg)
  }
  render() {
    return (
      <div>
        <button onClick={this.handleClick}>点击传递</button>
      </div>
    )
  }
}

ReactDOM.render(<Parent />, document.getElementById('root'))