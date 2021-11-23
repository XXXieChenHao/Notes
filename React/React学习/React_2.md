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

```jsx
const name = 'Xichao'
const dv = (
  <div>你好，我叫：{name}</div>
)
```



