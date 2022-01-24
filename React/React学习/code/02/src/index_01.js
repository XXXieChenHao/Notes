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
// const name = 'Xichao';

// const title = <h1 className="title">Hello {name}</h1>;

// ReactDOM.render(title, document.getElementById('root'));



// JSX 的条件渲染
// const isLoading = true

// if..else
// const loadData = () => {
//   if (isLoading) {
//     return <div>Loading...</div>
//   }

//   return <div>数据加载完成</div>
// }

// 三元
// const loadData = () => {
//   return isLoading ? (<div>Loading...</div>) : (<div>数据加载完成</div>)
// }

// 逻辑与

// const loadData = () => {
//   return isLoading && (<div>Loading...</div>)
// }

// const title = (
//   <h1>
//     条件渲染：
//     {loadData()}
//   </h1>
// )

// ReactDOM.render(title, document.getElementById('root'));

// JSX 列表渲染

// const songs = [
//   { id: 1, name: '南下' },
//   { id: 2, name: '漠河舞厅' },
//   { id: 3, name: '南山南' }
// ]

// const list = (
//   <ul>
//     {songs.map(item => <li key={item.id}>{item.name}</li>)}
//   </ul>
// )

// ReactDOM.render(list, document.getElementById('root'));

// JSX 样式处理


// 行内
// const title = (
//   <h1 style={{ color: 'red' }}>
//     JSX的样式处理
//   </h1>
// )

// ReactDOM.render(title, document.getElementById('root'));

// 使用类名
// import './css/index.css'
// const title = (
//   <h1 className="title">
//     JSX的样式处理
//   </h1>
// )
// ReactDOM.render(title, document.getElementById('root'));