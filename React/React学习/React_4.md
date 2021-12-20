# React 组件进阶

## 组件通讯介绍
组件是独立且封闭的单元，默认情况下，只能使用组件自己的数据，在组件化过程中，我们将一个完整的功能拆分成多个组件，以更好的完成整个应用的功能，这个过程中，多组件之间不可避免地要共享某些数据，因此需要打破组件的独立封闭性，让其与外界沟通，这个过程就是组件通讯。
## 组件的 props
- 组件是封闭的，要接受外部数据应该通过 props 来实现
- props的作用：接受不了传递给组件的数据
- 传递数据：给组件标签添加属性

### 函数组件
函数组件会接收一个形参，一般规范叫做 props 这个 props 是一个对象，以后无论接收多少数据都可以使用 props. 的方式拿到.
在传递时直接在标签调用时添加自定义属性。
```jsx
const Hello = (props) => {
  return (
    <div>
      <h1>props: {props.name}</h1>
    </div>
  )
}

ReactDOM.render(<Hello name="jack" />, document.getElementById('root'))
```

### 类组件
类组件中使用 this.props 来接收数据
```jsx
class Hello extends React.Component {
  render() {
    return (
      <div>
        <h1>name: {this.props.name}</h1>
        <h2>age: {this.props.age}</h2>
      </div>
    )
  }
}


ReactDOM.render(<Hello name="rose" age={19} />, document.getElementById('root'))
```
在传递非祖父穿数据时需要使用{}，字符串数据则不需要如 "rose"
使用单花括号可以传递任意类型{[1,2,3]},{() => console.log('这是一个函数')}
甚至还可以传递 JSX：tag={<p>这是一个P标签</p>}，在组件中就可以渲染出来

### props 的特点
**1. 修改 props**
```jsx
const Hello = (props) => {

  props.name = ''
  return (
    <div>
      <h1>props: {props.name}</h1>
    </div>
  )
}

ReactDOM.render(<Hello name="jack" />, document.getElementById('root'))
```
会提示报错：不能将值分配给对象的只读属性 name

**2. 获取 prosp**
使用类组件时，如果写了构造函数，应该将 props 传递给 super(), 否则，无法在构造函数中获取到 props
```jsx
class Hello extends React.Component {
  // 推荐使用 props 作为constructor 的参数传入
  constructor(props) {
    super(props)

    console.log('constructor', props)
  }
  
  render() {

    console.log('render', this.props)
    return (
      <div>
        <h1>name: {this.props.name}</h1>
        <h2>age: {this.props.age}</h2>
      </div>
    )
  }
}


ReactDOM.render(<Hello name="rose" age={19} />, document.getElementById('root'))
```
## 组件通讯的三种方式
### 父组件传递数据给子组件
1. 父组件提供要传递的 state 数据
2. 给子组件标签添加属性，值为 state 中的数据
3. 子组件中通过 props 接收父组件中传递的数据

```jsx
class Parent extends React.Component {
  state = {
    lastName: 'NiceXch'
  }

  render() {
    return (
      <div>
        父组件：{this.state.lastName}
        <Child name={this.state.lastName} />
      </div>
    )
  }
}

const Child = (props) => {
  return (
    <div>
      <p>子组件，接收到父组件的数据: {props.name}</p>
    </div>
  )
}

ReactDOM.render(<Parent />, document.getElementById('root'))
```

**2. 子组件传递数据给父组件**
子组件利用父组件提供的回调函数，将要传递的数据作为回调函数的参数
1. 父组件中提供一个回调函数（用于接收数据）
2. 将该函数作为属性的值，传递给子组件

```jsx
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
```

## Context
## props 深入
## 组件的生命周期
## render-props 和 高阶组件