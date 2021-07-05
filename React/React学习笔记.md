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

### 前言

对于一个组件来说，组件实现的细节应该属于组件内部。如时钟案例中原有代码为

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

在封装组件时我们更期待的是我们写一次，钟表组件就自动更新时间，如:

```jsx
ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
```

### 添加状态 （state）

1. 创建一个 ES6 的 class 类继承 `React.Component`
2. 添加空方法 render() 并且返回页面元素
3. 添加 class 构造函数初始化分配 state
4. 将 props 传入基构造函数
5. 在 render 中将 props 改为 state

```jsx
class Clock extends React.Component {
  constructor (props) {
    super(props);
    this.state = {date: new Date()};
  }
  render() {
    return (
      <div>
        <h1>hello, Xichao</h1>
        <div>It is { this.state.date.toLocaleTimeString() }</div>
      </div>
    )
  }
}

ReactDOM.render(
  <Clock />,
  document.getElementById('root')
)
```

如此，我们只差让时钟组件设置成为每秒更新

### 添加生命周期 （Lifecycle）

我们期待在时钟第一次呈现组件时创建一个定时器，这在 React 中叫做 mounting（挂载），同时在删除时钟 DOM 元素时销毁定时器释放内存，这在 React 中叫做 unmounting （卸载）

生命周期方法（Lifecycle methods）

**挂载阶段**

1. componentWillMount  发生在 render 函数之前，还没有挂载 Dom
2. render
3. componentDidMount  发生在 render 函数之后，已经挂载 Dom
4. componentWillUnmount 会在组件卸载及销毁之前直接调用。在此方法中执行必要的清理操作

```jsx
class Clock extends React.Component {
  constructor (props) {
    super(props);
    this.state = {date: new Date()};
  }
  componentDidMount() {
    this.timer = setInterval(() => {
      this.tick();
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  tick() {
    this.setState({
      date: new Date()
    })
  }

  render() {
    return (
      <div>
        <h1>hello, Xichao</h1>
        <div>It is { this.state.date.toLocaleTimeString() }</div>
      </div>
    )
  }
}

ReactDOM.render(
  <Clock />,
  document.getElementById('root')
)
```

在 DOM 加载后运行设置定时器，在组件卸载时清除定时器。

实现 tick 方法，使用`this.setState()`方法调度对组件本地状态的更新



**调用方法的顺序**

1. 当 `<Clock />`组件传递到 ReactDOM.render 中，react 调用组件中的 constructor 方法，并且初始化了包含当前时间的 state 对象。
2. react 调用 render 方法，这时 react 已经知道了需要展示在屏幕上的内容，然后 react 更新 DOM 匹配渲染的内容
3. 当 Clock 输出插入到 DOM 中，react 调用 `componentDidMount` 生命周期的方法。这个生命周期通知浏览器每间隔 1s 调用一次 tick 方法。
4. 每一秒浏览器都会调用 tick 方法，Clock 组件调用包含当前时间对象的 setState 方法，由于调用了 setState 方法，react 知道了 state 的变化，并且再一次调用 render 方法来改变屏幕上的显示，这时在 render() 中的 this.state.date 与之前不同，所以 render 将会输出包含当前时间对象的内容，并且 DOM 也会相应更新。
5. 如果当 Clock 组件被从 DOM 中移除时则会调用生命周期 `componentWillUnmount`方法，这样定时器就能够被清空。



### State 正确使用方式

**有关 setState() 的三件事**

1. 不要直接修改 state

```jsx
this.state.comment = 'Hello';
```

直接修改 state 并不会再次调用 render 方法，所以组件不会重新呈现，状态改变也不会相应的更新页面

正确做法：

```jsx
this.setState({comment: 'Hello'});
```



2. State 更新可能是异步的

在 react 中 state 和 props 的更新可能是异步的，所以不能依赖它们的值来进行计算下一个 state 的值。

```jsx
this.setState({
  counter: this.state.counter + this.props.increment
})
```

解决这种方式可以使用 setState 的第二种形式，接收函数作为参数而不是对象

```jsx
this.setState((state, props) => ({
  counter: state.counter + props.increment
}))
```

使用常规函数

```jsx
this.setState(function(state, props) {
  return {
    counter: state.counter + props.increment
  }
})
```

这种方式会接受上一个 state 作为第一个参数，将此次更新被应用时的 props 作为第二个参数



3. State 更新将会被合并

在 state 中，可能包含几个独立的变量

```jsx
constructor(props) {
  super(props);
  this.state = {
    posts: [],
    comments: []
  };
}
```

然后可以分别通过 `this.setState()` 方法单独的更新它们

```jsx
componentDidMount() {
  fetchPosts().then(response => {
    this.setState({
      posts: response.posts
    });
  });

  fetchComments().then(response => {
    this.setState({
      comments: response.comments
    });
  });
}
```

官方文档说，这里的合并是浅合并，所谓浅合并就是只更改了当前修改的state，而不会对其他 state 造成任何影响，当修改 comments 时，posts 不会受到任何影响，同样被完整保存了下来。



### 数据向下流动

无论是父组件还是子组件都无法确认是否具有状态，state 是组件内的密封状态。除了拥有和设置他的组件以外，其他任何组

件都不能访问它。

组件可以选择传递它的 state 作为子组件的 props。

```jsx
<FormattedDate date={this.state.date} />
```

FormattedDate 组件将会在 props 中接收 date 数据。但是对 FormattedDate 来说，无法确定数据来自于父组件的 state 还是 props 又或者是手动输入。

```jsx
function FormattedDate(props) {
  return <h2>It is {props.date.toLocaleTimeString()}.</h2>;
}
```

这通常称之为自顶向下或是单向性数据流。任何的 state 总是所属于特定的组件，而且从该 state 派生出的任何数据或 UI 只能影响低于它的组件。

每个组件中的 state 都是相对独立的，同一个组件多次引用，其 state 也是互不影响的。
