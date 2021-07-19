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



## 表单

在 React 中， HTML 表单元素与其他 DOM 元素的使用有很大的不同，因为 Form 表单会保持一些内部状态。

Form 在 react 中与 HTML 一样都存在默认事件，点击提交按钮浏览器会打开一个新的页面，如果想要此效果 react 就会工作，如果想要在 js 中通过函数的方式访问表单中的数据，则需要**受控组件**



### 受控组件

在HTML 的 form 表单中，如input、select、textarea 等元素都是维持自身状态并根据用户输入进行更新，但在 react 中状态的更新都保存在组件中并通过 `setState()` 进行更新。

将两者结合起来使 react 的 state 成为单一数据源。然后 react 组件渲染一个表单控制着随后用户的发生的操作。被 React 以这种方式控制取值的表单输入元素就叫做“受控组件”。

```jsx
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this); 
  }

  handleFormSubmit(event) {
    console.log('A name was submitted: ' + this.state.value)
    event.preventDefault();
  }

  handleInputChange(event) {
    this.setState({
      value: event.target.value
    })
  }

  render() {
    return (
      <form onSubmit={this.handleFormSubmit} >
        <label>
          Name: 
          <input type="text" value={this.state.value} onChange={this.handleInputChange} />
        </label>
        <input type="submit" value="Submit"/>
      </form>
    )
  }
}

ReactDOM.render(
  <NameForm />,
  document.getElementById('root')
)
```

当 value 属性被设置到表单元素中，显示的值总是 `this.state.value`，这使 React 的 state 成为唯一数据源。随后每一次键盘输入都会执行 `handleChange` 方法从而更新 React 状，显示的值也将会随着用户更新。

对于受控组件来说，输入的值始终由 React 的 state 驱动。而这也意味值你不得不编写更多的代码，你才能将 value 传递给其他 UI 元素，或者通过其他事件处理函数重置。



### TextArea 标签

在 HTML 中 TextArea 元素通过子元素声明它的文字内容。

```html
<textarea>
  textarea 的文字书写在其中
</textarea>
```

而在 React 中则是使用 value 属性代替。

```jsx
class EssayForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = { value: '这是写在 textarea 中的默认文字' };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(event) {
    console.log(this.state.value)
    event.preventDefault();
  }

  handleChange(event) {
    this.setState({
      value: event.target.value
    })
  }

  render() {
    return(
      <form onSubmit={ this.handleSubmit } >
        <label>
          文本域：
          <textarea value={ this.state.value } onChange={ this.handleChange } ></textarea>
        </label>
        <input type="submit" value="Submit" />
      </form>
    )
  }
}

ReactDOM.render(
  <EssayForm />,
  document.getElementById('root')
)
```

注意，其中初始化时对 `this.state.value` 进行了赋值，所以文本域中一开始就包含了一些文字。



### Select 标签

在 HTML 中 select 标签创建了一个下拉列表，例如创建一个最喜爱的运动列表

```html
<select>
  <option value="篮球">篮球</option>
  <option value="足球">足球</option>
  <option value="台球" selected>台球</option>
  <option value="棒球">棒球</option>
</select>
```

其中默认选中*台球*，因为手动为台球选项设置了 selected 属性，而在 React 中，在根节点上设置 value 而不是通过 selected，这样可以保证在一个地方更新时就可以更方便管理受控组件。

```jsx
class SelectForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '台球' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
    console.log('changed');
  }

  handleSubmit(event) {
    console.log('你最喜欢的运动是: ', this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={ this.handleSubmit }>
        请选择您最喜欢的运动
        <select onChange={ this.handleChange } value={ this.state.value} >
          <option value="篮球">篮球</option>
          <option value="足球">足球</option>
          <option value="台球">台球</option>
          <option value="棒球">棒球</option>
        </select>
        <input type="submit" value="Submit" />
      </form>
    )
  }
}

ReactDOM.render(
  <SelectForm />,
  document.getElementById('root')
)
```

input、textarea 和 select 的工作原理都非常相似，都是接收一个 value 属性可以用来在受控组件中使用

React 的 select 也接受同时选中多个属性

```jsx
<select multiple={true} value={['B', 'C']}>
```



### 处理多个元素

当需要处理多个受控制的输入元素时，需要添加一个 name 属性给每一个元素并且让函数根据 `event.target.name` 的值选择做些什么。

```jsx
class Multiple extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      check: false,
      name: '',
      sports: '篮球'
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleInputChange(event) {
    const target = event.target;
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    const name = target.name;
    
    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    console.log(this.state)
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={ this.handleSubmit }>
        <label>
          checkbox:
          <input 
            type="checkbox" 
            name="check" 
            checked={ this.state.check } 
            onChange={ this.handleInputChange }
          />
        </label>
        <label>
          Your name is :
          <input 
            type="text"
            name="name"
            value={ this.state.name }
            onChange={ this.handleInputChange }
          />  
        </label>
        <select 
          name="sports" 
          value={ this.state.sports }
          onChange={ this.handleInputChange }
        >
          <option value="篮球">篮球</option>
          <option value="足球">足球</option>
          <option value="羽毛球">羽毛球</option>
        </select>
        <input type="submit" value="submit"/>
      </form>
    )
  }
}

ReactDOM.render(
  <Multiple />,
  document.getElementById('root')
)
```

这里我们直接使用了 ES6 的方式去修改 React 中的状态，如果是 ES5则需要如此：

```js
var partialState = {};
partialState[name] = value;
this.setState(partialState);
```

因为 setState 是局部更改，所以只需要调用部分更改即可。



### 受控输入 null

如果受控组件中指定了 value 属性则无法进行用户编辑，如果可以编辑则是因为意外的将值置为 null

```jsx
ReactDOM.render(
  <input value="hi" />, 
  document.getElementById('root')
);

setTimeout(function() {
  ReactDOM.render(
    <input value={null} />, 
    document.getElementById('root')
  );
}, 3000);
```

前三秒输入框无法编辑，三秒钟以后可以编辑。



### 受控组件替代品

有时编写受控组件时乏味的，因为你需要为数据的每一种更改方式编写事件处理程序，并通过 React 管理相应组件。这对于转变一个之前写好的代码到 React ，或者是整合一个不包含 React 库的应用的时候非常头疼，这时候可能希望检出不受控组件，这是实现输入表单的另一种技术。

如果您正在寻找包括验证、跟踪访问字段和处理表单提交在内的完整解决方案，那么Formik是最受欢迎的选择之一。然而，它是建立在受控组件和状态管理的相同原则之上的——所以不要忽视学习它们。





### file 标签

在 HTML 中，input 标签的 file 类型是提供一个给用户一个从本地存储中选择一个或多个文件上传到服务器或调用 JavaScript APi 进行处理的方式。

```html
<input type="file" />
```

因为它的值是只读的，所以在 React 中它是一个不可控组件



## 状态提升

通常几个组件可能都需要反应状态的变化，推荐将共享状态提升至他们的最近的共同祖先中。

随着下面的案例体会状态提升的过程

### 温度计算器

编写一个温度计计算器，用户输入温度，当温度大于 100 时，页面效果为“水开了。”

```jsx
function BoilingVerdict(props) {
  if (props.celsius >= 100) {
    return <p>水开了。</p>
  } else {
    return <p>水还没开。</p>
  }
}

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = { temperature: '' };
    this.handleIptChange = this.handleIptChange.bind(this);
  }

  handleIptChange(event) {
    this.setState({
      temperature: event.target.value
    })
  }

  render() {
    const temperature = this.state.temperature;
    return (
      <div>
        <label>
          请输入温度:  
          <input type="text" value={temperature} onChange={ this.handleIptChange } />
        </label>
        <BoilingVerdict celsius={temperature} />
      </div>
    )
  }
}

ReactDOM.render(
  <Calculator />,
  document.getElementById('root')
)
```

### 第二个输入

除了摄氏温度输入外，我们还提供华氏温度输入，并且它们保持同步

```jsx
const scaleName = {
  c: '摄氏度',
  f: '华氏度'
}


function BoilingVerdict(props) {
  if (props.celsius >= 100) {
    return <p>水开了。</p>
  } else {
    return <p>水还没开。</p>
  }
}

class Calculator extends React.Component {
  render() {
    return (
      <div>
        <TemperatureInput scale='c' />  
        <TemperatureInput scale='f' />  
      </div>
    )
  }

}

class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { temperature: '' };
    this.handleIptChange = this.handleIptChange.bind(this);
  }

  handleIptChange(event) {
    this.setState({
      temperature: event.target.value
    })
  }

  render() {
    const temperature = this.state.temperature;
    const scale = this.props.scale;
    return (
      <div>
        <label>
          请输入{scaleName[scale]}:  
          <input type="text" value={temperature} onChange={ this.handleIptChange } />
        </label>
      </div>
    )
  }
}

ReactDOM.render(
  <Calculator />,
  document.getElementById('root')
)
```



### 编写转换函数

```jsx
function toCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
  return (celsius * 9 / 5) + 32;
}
```

这两个函数可以转换温度，所以再编写一个函数用于接收温度参数和转换函数参数，并且最终返回保留三位小数的另一个温度的数字

```jsx
function tryConvert(temperature, convert) {
  const input = parseFloat(temperature);
  if (Number.isNaN(input)) {
    return ''
  }

  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}
```

### 状态提升

两个TemperatureInput 组件都是独立的保存他们的状态在本地，然而需求则是两者相互同步影响。

在 React 中，共享状态是通过移动状态到需要使用其最近的公共祖先来完成的。这就是**状态提升**。我们将从 TemperatureInput 组件中移除本地状态，并且将其移动到 Calculator 中。

如果 Calculator 组件拥有了共享状态，它将成为两个输入中的唯一数据源。它能保证两者都拥有一致的值。因为两者的 props 都来自于父组件，所以两个输入能够一直的同步影响。

```jsx
const scaleName = {
  c: '摄氏度',
  f: '华氏度'
}

function toCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
  return (celsius * 9 / 5) + 32;
}

function tryConvert(temperature, convert) {
  const input = parseFloat(temperature);
  if (Number.isNaN(input)) {
    return ''
  }

  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}

function BoilingVerdict(props) {
  if (props.celsius >= 100) {
    return <p>水开了。</p>
  } else {
    return <p>水还没开。</p>
  }
}

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
    this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
    this.state = { 
      temperature: '',
      scale: 'c'
    }
  }

  handleCelsiusChange(temperature) {
    this.setState({ scale: 'c', temperature })
  }

  handleFahrenheitChange(temperature) {
    this.setState({ scale: 'f', temperature })
  }

  render() {
    const scale = this.state.scale
    const temperature = this.state.temperature;
    const celsius = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;
    const fahrenheit = scale === 'f' ? tryConvert(temperature, toFahrenheit) : temperature;
    return (
      <div>
        <TemperatureInput 
          scale='c' 
          temperature = { celsius }
          onTemperatureChange = { this.handleFahrenheitChange }
        />  
        <TemperatureInput 
          scale='f'
          temperature = { fahrenheit }
          onTemperatureChange = { this.handleFahrenheitChange }
        />
        <BoilingVerdict celsius={ parseFloat(celsius) }/>
      </div>
    )
  }

}

class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleIptChange = this.handleIptChange.bind(this);
  }

  handleIptChange(event) {
    this.props.onTemperatureChange(event.target.value)
  }

  render() {
    const temperature = this.props.temperature;
    const scale = this.props.scale;
    return (
      <div>
        <label>
          请输入{scaleName[scale]}:  
          <input type="text" value={temperature} onChange={ this.handleIptChange } />
        </label>
      </div>
    )
  }
}

ReactDOM.render(
  <Calculator />,
  document.getElementById('root')
)
```



**重点**

1. 单一数据源
2. 子组件使用 this.props.属性名
3. 子组件更新时调用父组件的方法，在父组件标签中使用自定义监听，并且监听方法无特殊含义



## 组合 vs 继承

> React 中含有非常强大的组合模式，官方推荐使用组合而非继承来实现组件重用。

