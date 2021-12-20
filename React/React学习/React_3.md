# React 组件
- 组件是 React 的一等公民，使用 React 就是在使用组件
- 组件表示页面中的部分功能
- 组合多个组件实现完整的页面功能
- 特点： 可复用、独立、可组合

## React 组件创建方式
<br />

### 使用函数创建组件
函数组件：使用 JS 的函数（或箭头函数创建的组件）
约定： 
  - 函数名称必须以**大写字母**开头,React 根据此区分组件和普通的 React 元素
  - 函数组件**必须有返回值**，表示该组件的结构
  - 如果返回 **null**，表示不渲染任何内容
渲染函数组件： **使用函数名作为组件标签名**

```jsx
function Hello() {
  return (
    <div>这是一个函数组件</div>
  )
}

ReactDOM.render(<Hello />, document.getElementById('root'))
```
*如果函数名称小写*
提示 标签并非浏览器中的标签，如果想要渲染 React 组件，请以大写字母开头

*如果没有返回值*
没有返回值这通常意味着 return 语句丢失，如果不想要渲染任何内容，请返回 null

**使用箭头函数**
```jsx
const Hello = () => <div>这是一个箭头函数组件</div>
ReactDOM.render(<Hello />, document.getElementById('root'))
```

### 使用类创建组件
- 类组件：使用 ES6 的 class 创建组件
- 约定
  - 类名称必须以**大写字母开头**
  - 类组件应该继承 **React.Component** 父类，从而可以使用父类中提供的方法或属性
  - 类组件必须提供 **render()** 方法
  - render() 方法**必须有返回值**，表示该组件的结构

```jsx
class Hello extends React.Component {
  render() {
    return (
      <div>类组件</div>
    )
  }
}

ReactDOM.render(<Hello />, document.getElementById('root'))
```
如果不渲染则可以再 render() 返回值返回 null

### 抽离单独的 JS 文件
1. 创建一个 js 文件
2. 在此文件中导入 React
3. 创建组件（函数 或 类）的 方式
4. 在文件中导出组件
5. 在使用的时候引入组件
6. 渲染组件

**Hello.js**
```jsx
import React from 'react'

class Hello extends React.Component {
  render() {
    return (
      <h1>抽离到 Js 文件中的组件</h1>
    )
  }
}

export default Hello
```
**Index.js**
```jsx
import Hello from './Hello'
ReactDOM.render(<Hello />, document.getElementById('root'))
```

## React 事件处理

### 事件绑定
- React 事件绑定语法与 DOM 语法相似
- 语法： `on + 事件名 = (事件处理程序)`，比如: onClick = {() => {}}
- 注意： `React 事件采用驼峰命名法`，比如: onClick、onMouseEnter……
**使用函数组件**
```jsx
function App() {
  function handleClick() {
    console.log('触发了')
  }

  return (
    <button onClick={handleClick}>点我</button>
  )
}
ReactDOM.render(<App />, document.getElementById('root'))
```


**使用类组件**
```jsx
class App extends React.Component {
  render() {
    return (
      <button onClick={this.handleClick}>点我，点我</button>
    )
  }
  handleClick() {
    console.log('事件触发了')
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
```

### 事件对象
- 可以通过**事件处理程序的参数**获取到事件对象
- React 中的对象叫做：合成事件（对象）
- 合成事件：兼容所有浏览器，无需担心跨浏览器兼容问题

使用事件对象组织默认事件
```jsx
function App() {
  function handleClick(e) {
    e.preventDefault()
    console.log('a标签的单击事件触发了')
  }

  return (
    <a href="http://nicexch.cn" onClick={handleClick}>点我</a>
  )
}
ReactDOM.render(<App />, document.getElementById('root'))
```


## 有状态组件和无状态组件
- 类组件又叫做有状态组件, 函数组件又叫做无状态组件
状态 (state) 即数据，如果从数据的角度看待，函数组件自己没有状态，只负责数据展示，表示是一种静态的效果，类组件有自己的状态，负责更新 UI，让页面动起来。


## 组件的 state 和 setState()
<br />

### state 的基本使用
- 状态（state） 即数据，**state 的值是对象**，表示一个组件中可以有多个数据

- 状态是组件内部的**私有**数据，只能在组件内部使用
- 通过 **this.state** 获取状态

```jsx
class App extends React.Component {
  // constructor() {
  //   super()

  //   // 初始化 state
  //   this.state = {
  //     count: 0
  //   }
  // }

  // 简化语法
  state = {
    count: 0
  }

  render() {
    return (
      <div>
        <h1>计数器：{this.state.count}</h1>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
```

### setState()
- 状态是可变的
- 语法：this.setState({要修改的数据})
- **注意：**不要直接修改 state 中的值
- setState() 的作用：
  - 修改 state
  - 更新UI
```jsx
class App extends React.Component {
  state = {
    count: 0,
    test: 'a',
  }

  render() {
    return (
      <div>
        <h1>计数器：{this.state.count}</h1>
        <button onClick={() => {
           this.setState({ count: this.state.count + 1 })
        }}>+ 1</button>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
```
state 种可能会有很多数据，setState 只需要设置对应的属性修改即可。

react 的 setState 是数据驱动视图的思想提现

### 从 JSX 中抽离时间处理程序
- JSX 中掺杂过多 JS 逻辑代码，会显得非常混乱，JSX 的功能更多是为了描述页面 UI，所以应该避免逻辑与 JSX 混杂。

```jsx
class App extends React.Component {
  state = {
    count: 0,
    test: 'a',
  }

  addCount() {
    this.setState({ count: this.state.count + 1 })
  }

  render() {
    return (
      <div>
        <h1>计数器：{this.state.count}</h1>
        <button onClick={this.addCount}>+ 1</button>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
```
将逻辑抽离成单独的方法，但样做了以后发现事件处理程序中报错，this 的值为 undefined, 如果将 this 指向修改为期望值，则逻辑抽离就完成了。

## 事件绑定 this 指向
1. 箭头函数
2. Function.prototype.bind()
3. class 的实例方法

**1. 利用箭头函数自身不绑定 this 的特点**
```jsx
class App extends React.Component {
  state = {
    count: 0,
    test: 'a',
  }

  addCount() {
    this.setState({ count: this.state.count + 1 })
  }

  render() {
    // 箭头函数中的 this 指向外部环境，此处为 render() 方法
    return (
      <div>
        <h1>计数器：{this.state.count}</h1>
        <button onClick={() => this.addCount()}>+ 1</button>
      </div>
    )
  }
}
```

**2. Function.prototype.bind()**
利用 bind 方法，将事件处理程序中弄的 this 与组件实例绑定到一起

```jsx
class App extends React.Component {
  state = {
    count: 0,
    test: 'a',
  }

  constructor() {
    super()
    this.addCount = this.addCount.bind(this)
  }

  addCount() {
    this.setState({ count: this.state.count + 1 })
  }

  render() {
    // 箭头函数中的 this 指向外部环境，此处为 render() 方法
    return (
      <div>
        <h1>计数器：{this.state.count}</h1>
        <button onClick={this.addCount}>+ 1</button>
      </div>
    )
  }
}
```

bind 方法的绑定其实是在最开始执行并且返回一个新函数

**3. class 的实例方法**
利用箭头函数的 class 实例方法
```jsx
class App extends React.Component {
  state = {
    count: 0,
    test: 'a',
  }

  // 这里本身就是一个箭头函数，所以 this 指向当前实例
  addCount = () => {
    this.setState({ count: this.state.count + 1 })
  }

  render() {
    // 箭头函数中的 this 指向外部环境，此处为 render() 方法
    return (
      <div>
        <h1>计数器：{this.state.count}</h1>
        <button onClick={this.addCount}>+ 1</button>
      </div>
    )
  }
}
```
## 表单处理
1. 受控组件
2. 非受控组件(Dom 的方式)

### 受控组件
- HTML 中的表单元素是可输入的，也就是有自己的可变状态
- 而 React 中可变状态通常保存在 state 中，并且只通过 setState() 方法来修改
- React 将 state 与表单元素 value 绑定在一起，由 state 的值来控制表单元素的值
- 受控组件：其 value 值受到了 Recat 的控制

步骤：
1. 在 state 中添加一个状态，作为表单元素的 value 值（控制表单元素值的变化）
2. 给表单元素绑定 change 事件，将表单元素的值设置为 state 的值（控制表单元素值的变化）
```jsx
class App extends React.Component {
  state = {
    txt: ''
  }

  handleChange = e => {
    this.setState({
      txt: e.target.value
    })
  }

  render() {
    return (
      <div>
        <input type="text" value={this.state.txt} onChange={this.handleChange} />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
```

表单元素中，输入框、富文本、下拉筛选都是操作 value
而 复选框则是操作 checked 属性
```jsx
class App extends React.Component {
  state = {
    txt: '',
    content: '',
    city: 'bj',
    isChecked: false
  }
  // 输入框处理
  handleChange = e => {
    this.setState({
      txt: e.target.value
    })
  }
  // 富文本处理
  handleContent = e => {
    this.setState({
      content: e.target.value
    })
  }
  // 下拉筛选处理
  handleCity = e => {
    this.setState({
      city: e.target.value
    })
  }
  // 复选框处理程序
  handleChecked = e => {
    this.setState({
      isChecked: e.target.checked
    })
  }

  render() {
    return (
      <div>
        {/* 输入框 */}
        <input type="text" value={this.state.txt} onChange={this.handleChange} />
        <br />
        {/* 富文本框 */}
        <textarea type="text" value={this.state.content} onChange={this.handleContent} />
        <br />
        {/* 下拉框 */}
        <select value={this.state.city} onChange={this.handleCity}>
          <option value="sh">上海</option>
          <option value="gz">广州</option>
          <option value="bj">北京</option>
        </select>
        <br />
        {/* 复选框 */}
        <input type="checkbox" checked={this.state.isChecked} onChange={this.handleChecked} />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
```

**多表单元素优化**
由于多表单元素的时间处理程序过多，所以想要优化成尽量少的事件处理程序对表单组件进行监听.
优化步骤：
  1. 给表单元素添加 name 属性， name 名称与 state 中的相同
  2. 根据表单元素类型获取相应的值
  3. 在 change 时间处理程序中通过 [name] 修改对应的 state

```jsx
class App extends React.Component {
  state = {
    txt: '',
    content: '',
    city: 'bj',
    isChecked: false
  }
  // 处理
  handleForm = e => {
    // 获取当前 DOM 对西那个
    const target = e.target;
    // 根据类型获取值
    const value = target.type === 'checkbox'
      ? target.checked
      : target.value

    // 获取 name
    const name = target.name

    this.setState({
      [name]: value
    })
  }

  render() {
    return (
      <div>
        {/* 输入框 */}
        <input type="text" name="txt" value={this.state.txt} onChange={this.handleForm} />
        <br />
        {/* 富文本框 */}
        <textarea type="text" name="content" value={this.state.content} onChange={this.handleForm} />
        <br />
        {/* 下拉框 */}
        <select name="city" value={this.state.city} onChange={this.handleForm}>
          <option value="sh">上海</option>
          <option value="gz">广州</option>
          <option value="bj">北京</option>
        </select>
        <br />
        {/* 复选框 */}
        <input type="checkbox" name="isChecked" checked={this.state.isChecked} onChange={this.handleForm} />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))     
```

### 非受控组件
借助 ref 的作用使用原生 DOM 方式获取表单元素值
使用步骤：
  1. 调用 React.createRef() 方法创建一个 ref 对象
  2. 将创建好的 ref 对象添加到文本框中


```jsx
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
```
1. 调用 React.createRef() 创建一个 ref 对象
2. 将创建好的 ref 对象添加到文本框中
3. 通过 ref 对象获取到文本框的值
  - ref 对象就是原生 DOM 对象



## 总结
React 组件基础
1. 函数组件（无状态组件）负责渲染静态页面结构
2. 类组件（有状态组件）负责更新 UI，让页面动起来
3. 绑定事件要注意 this 指向问题
  - 箭头函数
  - Function.prototype.bind()
  - class 的实例方法
4. 推荐使用受控组件来处理表单
5. React 组件思想完全利用 JS 语言的能力创建组件


## 发表评论案例
```jsx
import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
  state = {
    comments: [],

    // 评论人
    userName: '',

    // 评论内容
    userContent: ''

  }

  // 渲染评论列表
  renderList = () => {
    const { comments } = this.state
    // if...else 判断
    if (comments.length === 0) {
      return (<div className="no-comment">暂无评论，快去评论吧～</div>)
    }

    return (
      <ul>
        {comments.map(item => (
          <li key={item.id}>
            <h3>评论人： {item.name}</h3>
            <p>评论内容：{item.content}</p>
          </li>
        ))}
      </ul>)


    // 三元返回
    // return comments.length === 0
    //   ? (<div className="no-comment">暂无评论，快去评论吧～</div>)
    //   : (<ul>
    //     {comments.map(item => (
    //       <li key={item.id}>
    //         <h3>评论人： {item.name}</h3>
    //         <p>评论内容：{item.content}</p>
    //       </li>
    //     ))}
    //   </ul>)
  }

  // 处理表单元素值
  handleForm = (e) => {
    const { name, value } = e.target;

    this.setState({
      [name]: value
    })
  }

  // 发表评论
  addComment = () => {
    const { userName, userContent, comments } = this.state;
    if (!userName.trim() || !userContent.trim()) {
      alert('请输入评论人和评论内容')
      return
    }
    const newComments = [{
      id: comments.length + 1,
      name: userName,
      content: userContent
    }, ...comments]

    this.setState({
      userName: '',
      userContent: '',
      comments: newComments
    })
  }

  render() {
    const { userName, userContent } = this.state
    return (
      <div className="app">
        <div>
          <input type="text" className="user" placeholder="请输入评论人" value={userName} name="userName" onChange={this.handleForm} />
          <br />
          <textarea className="content" cols="30" rows="10" placeholder="请输入评论内容" value={userContent} name="userContent" onChange={this.handleForm} />
          <br />
          <button onClick={this.addComment}>发表评论</button>
        </div>
        {/* 通过条件渲染决定渲染什么内容 */}
        {/* {this.state.comments.length == 0 ?
          (<div className="no-comment">暂无评论，快去评论吧～</div>)
          : (<ul>
            {this.state.comments.map(item => (
              <li key={item.id}>
                <h3>评论人： {item.name}</h3>
                <p>评论内容：{item.content}</p>
              </li>
            ))}
          </ul>)} */}

        {/* 抽离出去 */}
        {this.renderList()}
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
```