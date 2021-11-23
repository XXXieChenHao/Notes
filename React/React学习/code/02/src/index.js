// 1. 导入 react
import React from 'react'
import ReactDOM from 'react-dom'

// 使用 createElement
// // 2. 创建 react 元素
// const title = React.createElement('h1', null, 'Hello React脚手架!!')

// // 3. 渲染 react 元素
// ReactDOM.render(title, document.getElementById('root'))

// 使用 JSX
// // 2. 创建 react 元素
// const title = <h1>Hello JSX</h1>

// // 渲染 react 元素
// ReactDOM.render(title, document.getElementById('root'))


// 插入 JS 表达式
const name = 'Xichao';

const title = <h1 className="title">Hello {name}</h1>;

ReactDOM.render(title, document.getElementById('root'));
