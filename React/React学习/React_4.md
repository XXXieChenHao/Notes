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

### 子组件传递数据给父组件
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

### 兄弟组件
- 将**共享状态**提升到最近的公共父组件总，由**父组件**管理这个状态
- 公共父组件职责
  1. 提供共享状态
  2. 提供操作共享状态的方法
- 要通讯的子组件只需要通过 props 接收状态或操作状态的方法

```jsx
class Counter extends React.Component {
  // 提供共享状态
  state = {
    count: 0
  }

  // 提供修改状态的方法
  onIncrement = (step) => {
    this.setState({
      count: this.state.count + step
    })
  }
  render() {
    return (
      <div>
        <Child1 count={this.state.count} />
        <Child2 onIncrement={this.onIncrement} />
      </div>
    )
  }
}

const Child1 = (props) => {
  return <h1>计数器：{props.count}</h1>
}

const Child2 = (props) => {
  let step = 1
  return <button onClick={() => props.onIncrement(step)}>+{step}</button>
}


ReactDOM.render(<Counter />, document.getElementById('root'))
```
## Context
如果层级较多的情况使用 props 传递数据非常繁琐，所以更好的方式就是 Context
作用就是跨组件传递数据

**使用步骤**
1. 调用 React.createContext() 创建 Provider(提供数据) 和 Consumer(消费数据) 两个组件。
`const {Provider, Consumer} = React.createContext()` 
2. 使用 Provider 组件作为父节点

```jsx
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
```

## props 深入

<br />
### children 属性
- children 属性： 表示组件标签的子节点。当组件标签有子节点时，props 就会有该属性

```jsx
const App = props => {
  console.log(props.children)
  return (
    <div>
      <h1>组件标签的子节点</h1>
      {props.children}
    </div>
  )
}

ReactDOM.render(<App>我是子节点</App>, document.getElementById('root'))
```
- children 属性与普通的 props 一样，值可以是任意值（文本、React元素、组件、甚至函数）

```jsx
const App = props => {
  console.log(props.children)

  // 传递函数时需要调用
  // props.children()
  return (
    <div>
      <h1>组件标签的子节点</h1>
      {props.children}
    </div>
  )
}

// 文本节点
// ReactDOM.render(<App>我是子节点</App>, document.getElementById('root'))


// React 元素
// ReactDOM.render(<App><p>我是一个React 元素标签</p></App>, document.getElementById('root'))


// 组件节点
// const Test = () => <button>我是button组件</button>
// ReactDOM.render(<App><Test /></App>, document.getElementById('root'))


// 传递函数
// ReactDOM.render(<App>{() => console.log('这是一个函数子节点')}</App>, document.getElementById('root'))
```

### props 校验
对于组件来说，props 是外来的，无法保证使用者传入什么格式的数据
- props 校验：允许在创建组件的时候，就指定 props 的类型、格式等
- 作用：捕获使用组件时因为 props 导致的错误，给出明确的错误提示，增加组件的健壮性

使用步骤
1. 安装包 prop-types
2. 导入 prop-types 包
3. 使用**组件名.propTypes = {}**来给组件的 props 添加校验规则
4. 校验规则通过 PropTypes 对象来指定

```jsx
import PropTypes from 'prop-types'

const App = props => {
  const arr = props.colors
  const lis = arr.map((item, index) => <l1 key={index}>{item.name}</l1>)

  return <ul>{lis}</ul>
}

App.propTypes = {
  colors: PropTypes.array
}

ReactDOM.render(<App colors={19} />, document.getElementById('root'))
```
可以获取一个明确的错误异常
```
Failed prop type: Invalid prop `colors` of type `number` supplied to `App`, expected `array`.
```

约束规则 
1. 常见类型： arra、bool、func、number、object、string
2. React 元素类型： element
3. 必填项： isRequired
4. 特定结构的对象： shape({}) 
5. 属性 filter 的类型： 对象({area: '上海', price: 19999}) 

```jsx
App.propTypes = {
  a: PropTypes.number,
  fn: PropTypes.func.isRequired,
  tag: PropTypes.element,
  filter: {
    area: '上海',
    price: 1999
  }
}
```
### props 默认值
```jsx
const App = props => {
  return (
    <div>
      <h1>此处展示 props 默认值: {props.pageSize}</h1>
    </div>
  )
}

App.defaultProps = {
  pageSize: 10
}

// ReactDOM.render(<App />, document.getElementById('root'))
// ReactDOM.render(<App pageSize={20} />, document.getElementById('root'))
```
不传值时默认值为 10， 传值时 pageSize 为传入的值

## 组件的生命周期
意义：组件的生命周期有利于理解组件的运行方式，完成更复杂的组件功能、分析组件错误原因等
生命周期（类组件）：从组件被创建到挂在到页面中运行，在到组件不被使用时卸载的过程
钩子函数：生命周期的每个阶段都会伴随一些方法调用，就是钩子函数
钩子函数的作用：为开发人员在不同阶段操作组件提供了时机

### 生命周期的三个阶段
1. 每个阶段的执行时机
2. 每个阶段钩子函数的执行顺序
3. 每个阶段钩子函数的作用

**1. 创建时（挂载阶段）**
- 执行时机：组件创建时（页面加载时）
- 钩子函数以及执行顺序
  - constructor -> render -> componentDidMount
```jsx
class App extends React.Component {
  constructor(props) {
    super(props)
    console.warn('生命周期钩子函数：constructor')
  }

  componentDidMount() {
    console.warn('componentDidMount')
  }

  render() {
    console.warn('render')
    return (
      <div>
        <h1>render</h1>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
```
- 作用：
  - constructor 创建组件时，最先执行
    1. 初始化 state
    2. 为事件处理程序绑定 this
  - render 每次组件渲染都会触发
    - 渲染 UI（注意不能调用 setState）因为会递归更新
  - componentDidMount 组件挂载（完成 DOM 渲染）后
    1. 发送网络请求
    2. DOM 操作


** 2. 更新时（更新阶段）**
- 执行时机： 组件被更新时
- 钩子函数以及执行顺序
  - render -> componentUpdate
- 影响原因：
  - New Props
  - setState()
  - forceUpdate()
```jsx
```
## render-props 和 高阶组件