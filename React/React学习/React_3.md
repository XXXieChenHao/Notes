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




## 有状态组件和无状态组件
## 组件的 state 和 setState()
## 事件绑定 this 指向
## 表单处理