

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

