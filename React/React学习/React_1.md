# React 概述
React 是一个用于构建用户界面的 Js 库
React 仅提供了是涂层，并非完整的 MVC 功能

## 特点
<br />

### 1. 声明式
  - 只需要描述 UI(HTML) 看起来什么样，就跟 HTML 一样
  - React 负责渲染 UI，并在数据变化时改变 UI
### 2. 基于组件
  - 组件式 React 最重要的内容
  - 组件表示页面中的部分内容
### 3. 学习一次，随处使用
  - 可以开发 WEB 应用
  - 开发移动原生应用 react-native
  - 开发 VR 等

## React 的基本使用
<br />

### 1. 安装 React
安装命令： `npm i react reat-dom`
- react 包是核心，提供创建元素、组件等功能
- react-dom 包提供 DOM 相关功能等
两者相互配合完成

### 2. 使用 React
**1. 引入 react 和 react-dom 两个 js 文件**
```
<script src="{path}/node_modules/react/umd/react.development.js"></script>
<script src="{path}/node_modules/react/umd/react-dom.development.js"></script>
```
**2. 创建 React 元素**
使用 React。createElement 方法
**3. 渲染 React 元素到页面中**
``` js
  /*
    2. 创建 react 元素
    参数一： 元素名称
    参数二： 元素属性
    参数三： 元素的子节点
  */
  const title = React.createElement('h1', null, 'Hello React')
  /*
    3. 渲染 react 元素
    参数一： 要渲染的 react 元素
    参数二： 挂载点、页面中的某一个节点
  */
  ReactDOM.render(title, document.getElementById('root'))
```

### 3. 方法说明
**React.createElement() 说明**
- 第一个参数为元素标签
- 第二个参数为元素属性
  - 第二个参数为 Object 多个参数可以使用 键值对 添加
- 第三个参数及其以后的参数都为元素的子节点
  - 如果子节点又是一个元素，则可以再使用 createEelement 方式创建

```js
const title = React.createElement(
  'p', 
  {
    title: '标题', id: 'p1'
  }, 
    'Hello React'
    React.createElement('span', null, 'Hello Xichao')
  )
```

**ReactDOM.render() 说明**
- 第一个参数为要渲染的 React 元素
- 第二个参数为 DOM 对象，用于指定页面中的位置

```js
ReactDOM.render(el, document.getElementById('root'))
```


## React 脚手架
脚手架是开发现代 WEB 应用的必备

### 使用 React 脚手架初始化项目
1. 使用命令 `npx create-react-app project-name`
2. 启动项目 在根目录中执行命令 `npm start`

**1.npx 命令介绍**
npx 命令介绍
- npx v5.2.0 后引入一条命令
- 目的：提升包内提供的命令行工具的使用体验
在没有给npx 先全局安装脚手架包，再使用这个包提供的命令，使用 npx 命令后无需安装脚手架包，直接通过这个包提供的命令

**2. 在脚手架中使用 React**
1. 导入 react 和 react-dom 两个包
```js
import React from 'react'
import ReactDOM from 'react-dom'
```
2. 调用 React.createElement() 方法创建 react 元素
3. 调用 ReactDOM.render() 方法渲染 react 元素到页面中

```js
// 1. 导入 react
import React from 'react'
import ReactDOM from 'react-dom'

// 2. 创建 react 元素
const title = React.createElement('h1', null, 'Hello React脚手架!!')

// 3. 渲染 react 元素
ReactDOM.render(title, document.getElementById('root'))
```


## React 基础总结
1. React 是构架有0年关乎界面的 JavaScript 库
2. 使用 react 时，推荐使用脚手架方式
3. 初始化命令 npx create-react-app project-name
4. 启动命令 npm start

