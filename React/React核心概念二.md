# React 学习(二) ——核心概念

<br />

## 条件渲染

在 React 中可以根据不同的行为创建多个独立的自定义组件，同时可以根据应用的状态选择性的呈现某一部分。
React 中的条件渲染与 JavaScript 没有不同，通过 If 或者条件操作符来创建表示当前状态的元素，并让 React 更新 UI 去匹配它们。

```jsx
function UserGreeting(props) {
  return <h1>Welcome back!</h1>
}

function GuestGreeting(props) {
  return <h1>Please sign up.</h1>
}

function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;
  if(isLoggedIn) {
    return <UserGreeting />
  } else {
    return <GuestGreeting />
  }
}

ReactDOM.render(
  // <Greeting isLoggedIn={ true }/>,
  <Greeting isLoggedIn={ false }/>,
  document.getElementById('root')
)
```



### 元素变量

将元素存储到变量中，这样在进行条件渲染的时候就可以有条件的渲染部分组件，而输出的其余部分不变。

```jsx
function UserGreeting(props) {
  return <h1>Welcome back!</h1>
}

function GuestGreeting(props) {
  return <h1>Please sign up.</h1>
}

function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;
  if(isLoggedIn) {
    return <UserGreeting />
  } else {
    return <GuestGreeting />
  }
}

function LoginButton(props) {
  return (
    <button onClick={ props.onClick } >
      Login  
    </button>
  )
}

function LogoutButton(props) {
  return (
    <button onClick={ props.onClick } >
      Logout  
    </button>
  )
}

// 创建一个含有状态的组件
class LoginControl extends React.Component {
  constructor(props) {
    super(props);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.state = { isLoggedIn: false };
  }

  handleLoginClick() {
    this.setState({ isLoggedIn: true })
  }

  handleLogoutClick() {
    this.setState({ isLoggedIn: false })
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn;
    let button;
    if (isLoggedIn) {
      button = <LogoutButton onClick={ this.handleLogoutClick } />
    } else {
      button = <LoginButton  onClick={ this.handleLoginClick } />
    }

    return (
      <div>
        <Greeting isLoggedIn={isLoggedIn} />
        { button }
      </div> 
    )
  }
}

ReactDOM.render(
  <LoginControl />,
  document.getElementById('root')
)
```



### 三元与逻辑运算符

使用JavaScript 条件操作符 `condition ? true : false` 也可以进行条件渲染：

```jsx
class Login extends React.Component {
  constructor(props) {
    super(props);
    // this.state = { isLoggedIn: true }
    this.state = { isLoggedIn: false }
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn;
    return (
      <div>
        <h1>You are {isLoggedIn ? 'currently': 'not'} logged in </h1>  
      </div>
    )
  }
}

ReactDOM.render(
  <Login />,
  document.getElementById('root')
)
```

三元运算符不仅仅可以进行简单的条件渲染，还可以用于更大的表达式。

```jsx
function LoginButton (props) {
  return (
    <button onClick={props.onClick} >Login</button>
  )
}

function LogoutButton (props) {
  return (
    <button onClick={props.onClick} >Logout</button>
  )
}

class Login extends React.Component {
  constructor(props) {
    super(props);
    // this.state = { isLoggedIn: true }
    this.state = { isLoggedIn: false }
    this.handleLoginClick = this.handleLoginClick.bind(this)
    this.handleLogoutClick = this.handleLogoutClick.bind(this)
  }

  handleLogoutClick() {
    this.setState({
      isLoggedIn: false
    })
  }

  handleLoginClick() {
    this.setState({
      isLoggedIn: true
    })
  }

  
  render() {
    const isLoggedIn = this.state.isLoggedIn;
    return (
      <div>
        { isLoggedIn ? 
          <LogoutButton onClick={ this.handleLogoutClick } /> :
          <LoginButton onClick={ this.handleLoginClick } />
        }
      </div>
    )
  }
}

ReactDOM.render(
  <Login />,
  document.getElementById('root')
)
```

像 JavaScript 一样，可以根据个人习惯或者可读性决定使用哪种方式进行条件渲染，但是当条件过于复杂的时候就是分离组件的时候。



### 阻止组件渲染

在有些时候可能需要隐藏组件本身，可以通过 `return null` 的形式。

```jsx
function WarningBanner(props) {
  if (!props.warn) {
    return null;
  }

  return (
    <div>
      Warning!  
    </div>
  )
}

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showWarning: true };
    this.handleToggleClick = this.handleToggleClick.bind(this);
  }

  handleToggleClick() {
    this.setState(preState => ({
      showWarning: !preState.showWarning
    }));
  }

  render() {
    return (
      <div>
        <WarningBanner warn={ this.state.showWarning } />
        <button onClick={this.handleToggleClick}>
          {this.state.showWarning ? 'Hide' : 'Show'}  
        </button>
      </div>
    )
  }
}

ReactDOM.render(
  <Page />,
  document.getElementById('root')
)
```



## 列表与键

在 JSX 中列表的转换与 JavaScript 中的映射一样，如 JavaScript 中将 list 转换为每一项的二倍: 

```javascript
const numbers = [1, 2, 3, 4, 5];
const doubleNumbers = numbers.map(item => item * 2)
console.log(doubleNumbers)
```

使用 map 方法将原数组转换为原来的二倍，在 React 中也是如此

### 渲染多个组件

可以使用花括号构建元素集合使他们渲染在 JSX 中

```jsx
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map(item => <li>{item}</li>)

ReactDOM.render(
	<ul>{listItems}</ul>,
  document.getElementById('root')
)
```



### 基本列表组件

通常都会想要呈现列表在组件中，例如重构之前的数字列表，设置一个可以接收数字属组并呈现出列表的组件：

```jsx
function NumberList(props) {
  const numbers = props.numbers
  const listItems = numbers.map(number => <li>{ number }</li>)
  return (
    <ul>{ listItems }</ul>
  )
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={ numbers } />,
  document.getElementById('root')
)
```

虽然页面已经呈现出来了，但是控制台输出一条警告

```js
react.development.js:245 Warning: Each child in a list should have a unique "key" prop.
Check the render method of `NumberList`. See https://reactjs.org/link/warning-keys for more information.
    at li
    at NumberList (<anonymous>:12:23)
```

意思是需要为每一个循环项添加一个 key，解决这个警告就要在 map 中为每一项添加一个 key 值:

```jsx
const listItems = numbers.map(number => <li key={number.toString()} >{ number }</li>)
```

此时控制台警告消失。



### 关键字 Key

keys 帮助 React 识别哪一项已改变、添加或者删除。key 应该分配到数组中的元素，以给定一个稳定的标识。

最好的选择 key 的方式是选择一个独特的唯一标识字符串。

如数据中的 IDs

```jsx
const todoItems = todos.map((todo) =>
  <li key={todo.id}>
    {todo.text}
  </li>
);
```

如果数据中不包含稳定的标识，也可以使用自带的索引。

```jsx
function TodoList() {
  const todoList = [1, 1, 1, 1, 1];
  const todoItems = todoList.map((todoItem, index) => {
    return (
      <li key={ index }>
        {todoItem}
      </li>
    )
  } )
  return (
    <ul>{ todoItems }</ul>
  )
}

ReactDOM.render(
  <TodoList />,
  document.getElementById('root')
)
```

但是如果列表中的节点的顺序可能发生改变的话，不建议使用索引，这会引起性能上的问题并且可能导致组件状态问题。



### 正确使用 key

key 只有在数组上下文中才应该使用，与是否为 li 标签无关，同时 key 在兄弟元素中必须是唯一的。

```jsx
function ListItem(props) {
  const value = props.value;
  return (
    // 1. 不在数组上下文中不需要使用 key
    <li key={value.toString()}>{value}</li>
  )
}

function NumberList(props) {
  const numbers = props.numbers;
  const ListItems = numbers.map( number => {
    return (
      // 2. 这里应该指定 key
      <ListItem  
        value={number} 
      >
        {number}
      </ListItem>
    )
  })
  return (
    <ul>{ ListItems }</ul>
  )
}

const numbers = [1, 2, 3, 4, 5]
ReactDOM.render(
  <NumberList numbers={numbers}/>,
  document.getElementById('root')
)
```

一个好的经验是在 map() 调用中才使用 key

### 内联 map

在 JSX 中也可以使用 map 方法，只需嵌套在**花括号**中

```jsx
function ListItem(props) {
  const value = props.value;
  return <li>{ value }</li>
}

function NumberList(props) {
  const numbers = props.numbers
  return (
    <ul>
      {numbers.map(number => {
        return <ListItem value={number} key={number.toString()} />
      })}
    </ul>
  )
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers}/>,
  document.getElementById('root')
)
```

