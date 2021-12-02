# JSX
React 中的特色语法 JSX

**1. 为什么使用 JSX ？**
1.1 createElement() 的问题
- 繁琐不简洁
- 不直观，无法快速看出描述结构
- 不优雅，开发体验差

**2. JSX 是什么 ?**
JSX 是 javaScript XML 的简写，表示在 JS 中写 XML(HTML）格式的代码。JSX 是 React 的核心内容

**3. JSX 的优势是什么 ？**
1. 声明式语法更直观、与 HTML 结构相同
2. 与 HTML 相同，降低了学习成本
3. 提高开发效率

## JSX 的基本使用
<br />

### 使用步骤
1. 使用 JSX 语法创建 react 元素
  ```jsx
  // 使用 JSX 语法，创建 react 元素
  const title = <h1>Hello JSX</h1>
  ```
2. 使用 ReactDOM.render() 方法渲染元素
  ```jsx
  ReactDOM.render(title, document.getElementById('root'))
  ```

### 脚手架中为什么使用 JSX 语法
JSX 并不是标准的 ECMAScript 语法，只是 ECMAScript 的语法扩展，需要 babel 编译处理后才能在浏览器环境中使用。所以脚手架中已经默认有了 babel 配置，无需手动配置 

### JSX 的注意点
1. React 元素的属性名使用驼峰命名法
2. 特殊属性名
  - class -> className
  - for -> htmlFor
  - tabindex -> tabIndex
3. 没有子节点的 React 元素可以用 /> 结束
4. 推荐使用小括号包裹JSX，从而避免 JS 中的自动插入分号陷阱

```jsx
const title = (
  <h1 className="title">
    Hello React
    <span />
  </h1>
)
ReactDOM.render(title, document.getElementById('root'))
```

## 在 JSX 中使用 JavaScript 表达式
<br />

### 嵌入 JS 表达式
- 数据存储在 JS 中
- 语法：{JS表达式}
  - 注意 这里是单花括号，与 vue 的双花括号不同

```jsx
const name = 'Xichao'
const dv = (
  <div>你好，我叫：{name}</div>
)
```
这样就可以在 JSX 中使用 Js 的数据了


## JSX 的条件渲染
根据条件渲染特定的 JSX 结构

**使用 if..else.. 渲染** 
```jsx
const isLoading = false
const loadData = () => {
  if (isLoading) {
    return <div>Loading...</div>
  }

  return <div>数据加载完成</div>
}

const title = (
  <h1>
    条件渲染：
    {loadData()}
  </h1>
)

ReactDOM.render(title, document.getElementById('root'));
```

**使用三元运算符**
```jsx
const isLoading = true
const loadData = () => {
  return isLoading ? (<div>Loading...</div>) : (<div>数据加载完成</div>)
}

const title = (
  <h1>
    条件渲染：
    {loadData()}    
  </h1>
)

ReactDOM.render(title, document.getElementById('root'));
```

**逻辑与运算符**
```jsx
const isLoading = true
const loadData = () => {
  return isLoading && (<div>Loading...</div>)
}

const title = (
  <h1>
    条件渲染：
    {loadData()}
  </h1>
)

ReactDOM.render(title, document.getElementById('root'));
```

## JSX 的列表渲染
如果想要渲染一组数据，应该是用数据的 map() 
注意：渲染列表应该添加 key 属性，key 属性的值要保证唯一,避免使用索引号作为 key
原则：map() 遍历谁就给谁添加 key 属性。

```jsx
const songs = [
  { id: 1, name: '南下' },
  { id: 2, name: '漠河舞厅' },
  { id: 3, name: '南山南' }
]

const list = (
  <ul>
    {songs.map(item => <li key={item.id}>{item.name}</li>)}
  </ul>
)

ReactDOM.render(list, document.getElementById('root'));
```

## JSX 的样式处理

1. 行内样式 —— style
```jsx
const title = (
  <h1 style={{ color: 'red' }}>
    JSX的样式处理
  </h1>
)

ReactDOM.render(title, document.getElementById('root'));
```
这种方式将结构与样式结合的太过于紧密，所以不推荐

2. 类名 —— className(推荐)

```jsx
// 导入css
import './css/index.css'
// css 内容
// .title {
//    text-align: center;
//  }

const title = (
  <h1 className="title">
    JSX的样式处理
  </h1>
)
ReactDOM.render(title, document.getElementById('root'));
```

## 总结
1. JSX 是 React 的核心内容
2. JSX 表示在 JS 中写 HTML 结构，是 React 声明式的体现
3. 使用 JSX 配合嵌入 JS 表达式、条件渲染、列表渲染，可以描述任意 UI 结构
4. 使用 className 方式添加样式
5. React 完全利用 JS 语言能力来编写 UI， 而不是造轮子增强 HTML 功能