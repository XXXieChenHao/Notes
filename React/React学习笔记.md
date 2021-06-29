# React 学习(一) ——核心概念



## 环境

1. 新建文件，引入 CDN 地址

- React
- ReactDOM
- Babel

2. 新建根节点 id 为 root 的html 标签
3. script 标签声明 type="text/babel"

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
	<script src="https://unpkg.com/react@17/umd/react.production.min.js" crossorigin></script>
	<script src="https://unpkg.com/react-dom@17/umd/react-dom.production.min.js" crossorigin></script>
	<script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
</head>

<body>
	<div id="root"></div>
  <script type="text/babel">
		// 在这里面写 JSX 代码
  </script>
</body>

</html>
```



## JSX

> JSX 既不是字符串也不是HTML标签。JSX 产生 React 中的元素。JSX 在 JavaScript 代码中使用UI时很有帮助。

### JSX 中嵌入表达式

**1. 花括号**

在 JSX 中使用花括号嵌入 JS 表达式

```jsx
const name = 'Xi Chao';
const element = <h1>Hello, my name is {name}</h1>;
ReactDOM.render(
	element,
	document.getElementById('root')
);
```

**2. 括号**

为了可读性，可以将 JSX 拆分成多行，虽然括号不是必须的，但是使用括号可以避免 JavaScript 引擎编译时的自动插入分号导致的错误。

```jsx
const name = 'Xi Chao';
const element = (
  <h1>
    Hello, my name is {name}
  </h1>
);
ReactDOM.render(
	element,
	document.getElementById('root')
);
```

**3. 嵌入表达式**

你可以将有效的 JavaScript 表达式放到 JSX 的花括号中。例如表达式，对象属性或者函数等所有有效的JavaScript 表达式。

```jsx
function say(time) {
  return 'Xichao is coding ' + time;
};

const user = {
	firstName: 'Xi',
	lastName: 'Chao'
};

const element = (
  <h1>
    {user.firstName + user.lastName} say {say('now')}
  </h1>
);

ReactDOM.render(
  element,
  document.getElementById('root')
);
```

**4.  JSX 也是表达式**

在编译后 JSX 成为常规的 JavaScript 函数，这意味着你可以在 if 、for 中使用，并且 JSX 可以作为函数的参数和返回值。

```jsx
function loopJsx(times) {
	let str = [];
	for(let i = 0; i < times; i++) {
		str.push(<li>Li标签：{i}</li>)
	}
	return str
};

function distance(flag) {
	if(flag) {
		return <h1>flag is true</h1>
	}
	return <h1>flag is false</h1>
};

const element = (
	<div>
		{distance(true)}
		<ul>{loopJsx(10)}</ul>  
	</div>
);

ReactDOM.render(
	element,
	document.getElementById('root')
);
```

**5.  使用 JSX 指定属性**

在 JSX 中声明指定属性可以使用引号，但注意不要在花括号中加入引号，您应该使用引号(用于字符串值)或花括号(用于表达式），避免同时使用两者在同一属性中。

```jsx
const img = {
  url: 'https://www.google.com/search?q=%E5%9B%BE%E7%89%87&tbm=isch&source=iu&ictx=1&fir=vQjlM9KtkGsb_M%252CJeaDEV9l4RQZhM%252C_&vet=1&usg=AI4_-kTHQSaEWY8Hyc_KflPp4H67JSU8nA&sa=X&ved=2ahUKEwj8p9iKzrLxAhU0yosBHVxGAQkQ9QF6BAgREAE&biw=1440&bih=796#imgrc=vQjlM9KtkGsb_M'
}

const element = (
  <div>
		<h1 index="0">h1 标签</h1>
			<img src={img.url} />
	</div>
);
```

**6. JSX 防注入攻击**

默认情况下，JSX 在编译时会将嵌入的表达式之前进行转义，所有内容在呈现之前都会转成字符串，以达到防止 xss 注入攻击。



**7. JSX 代表对象**

babel 会将 JSX 转换成 React.createElement() 函数调用

下面两者是相等的

```jsx
const element = (
	<h1 className="h1">
		Hello, Xichao
	</h1>
)

ReactDOM.render(
	element,
	document.getElementById('root')
);
```

```jsx
const element = React.createElement(
	'h1',
	{className: 'h1'},
		'Hello, Xichao'
)

ReactDOM.render(
	element,
	document.getElementById('root')
);
```



## 渲染元素

> 元素是 React 的最小构建模块

不像浏览器中的 dom 元素，React 创建元素的成本更低。



### 渲染元素到 DOM 中

在 HTML 文件中的某处存在一个标签

```html
<div id="root"></div>
```

只用 React 构建的项目通常只有一个根结点。

渲染 react 元素需要将根结点与元素传入 ReactDOM.render()

```jsx
const element = <h1>hello， Xichao</h1>
ReactDOM.render(element, document.getElmentById('root'));
```

这时，页面中就会显示 hello， Xichao



### 更新已渲染的元素

React 元素是不可改变的，一旦创建了 React 元素，你就不能改变它的子元素和属性。React 表现为某个时间点的 UI。

据目前所知，改变 UI 只能通过创建一个新的元素通过 ReactDOM.render() 修改 UI。

```jsx
function tick() {
  const element = (
    <div>
      <h1>Hello, Xichao</h1>
      <div>It is { new Date().toLocaleTimeString() }</div>
    </div>
  )

	ReactDOM.render(
  	element,
  	document.getElementById('root')
  });
}

setInterval(tick, 1000);
```

打开控制台后发现，只有 It is { new Date().toLocaleTimeString() } 的 DOM 被改变，而 h1 标签并没有改变，可见 React 会将当前与之前的元素进行对比，只应用必要的更新使 React 达到期望的状态。



## 组件和 Props

组件允许你将 UI 分成**独立的、可重复使用的**部分，并且单独考虑每一部分。

从概念上来说，组件是像 JavaScript 中的 function，接收任意改变的输入（叫做 props ），并且返回应该展示在屏幕上的 React 元素的描述。



### 函数组件与类组件

> 这里只需要注意组件定义即可，对于渲染会在一下 part 描述

**注意：组件名需要大写**，小写会被当成 DOM 标签

最简单的定义一个组件的方式就是定义一个 JavaScript 方法：

```jsx
function Welcome(props) {
  return <h1>Hello, { props.name }</h1>
}

const element = <Welcome name="Xichao" />
ReactDOM.render(
  element,
  document.getElementById('root')
)
```

这个函数是一个合法的 React 组件，因为它接受了一个唯一带有数据的 props（代表属性）对象并且返回一个 React 元素，这种组件叫做 函数组件，因为它本质上与 JavaScript 无异。

你也可以使用 ES6 中的 Class 去定义组件：

```jsx
class Welcome extends React.Component {
  render () {
    return <h1>Hello, { this.props.name }</h1>
  }
}

const element = <Welcome name="Xichao" />
ReactDOM.render(
  element,
  document.getElementById('root')
)
```

对于 React 来说上述两种组件是等价的。



### 渲染组件

之前我们使用 React 元素都是使用 DOM 标签，然而元素也可以表示用户自定义组件的标签:

```jsx
const element = <Welcome name="Xichao" />;
```

当 React  观察到一个元素表示拥护自定义组件时，它会将 JSX 接收到的属性以及子组件转换为单个对像传递给组件，这个对象被称之为 props。

```jsx
function Welcome(props) {
  return <h1>Hello, { props.name }</h1>
}

const element = <Welcome name="Xichao" />
ReactDOM.render(
  element,
  document.getElementById('root')
)
```

上述代码中：

​	首先：调用 ReactDOM.render() 并传入 `<Welcome name="Xichao" />`

​	随后：React 调用 Welcome 组件，并将 { name: 'Xichao' } 作为 props 传入组件中

​	然后：Welcome 组件将 `<h1>Hello, Xichao</h1>` 元素作为结果返回

​	最后：ReactDOM 将DOM 更新为 `<h1>Hello, Xichao</h1>`



### 组合组件

组件可以在输出中引用其他组件。这样我们可以对于任何级别的细节组件进行抽象使用。

```jsx
function Welcome(props) {
  return <h1>Hello, { props.name }</h1>
}

function OnLoad() {
  return (
    <div>
      <Welcome name="Xichao" />  
      <Welcome name="Zhangsan" />  
      <Welcome name="Lisi" />  
    </div>
  ) 
}

const element = <OnLoad />
ReactDOM.render(
  element,
  document.getElementById('root')
)
```

在组合组件中，是自底向上的，逐步到达视图层次顶级结构。



### 只读属性 Props

声明组件时无论是 function 或是 class，都绝对不能改变它自身的 props。

React 是非常灵活的，但是它有一条严格的规则：**所有的 React 函数都必须像纯函数一样保护 Props 不被更改**



纯函数（pure）：纯函数不会企图修改输入的值，对于相同的输入每次返回的结果都一致。

```javascript
function sum(a + b) {
  return a + b;
}
```

非纯函数（impure）：对于函数外部产生副作用

```javascript
function withdraw(account, amount) {
  account.total -= amount;
}
```



## 状态（state）和生命后期（Lifecycle）

对于一个组件来说，组件实现的细节应该属于组件内部。如时钟案例中