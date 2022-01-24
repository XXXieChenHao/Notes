# 理解 Function 的调用和 This 指向
<br />
站在巨人的肩膀上学习 [https://yehudakatz.com/2011/08/11/understanding-javascript-function-invocation-and-this/](https://yehudakatz.com/2011/08/11/understanding-javascript-function-invocation-and-this/)

## 原始核心
<br />

首先，让我们查看 function 调用的原始核心，一个方法的 call 方法。使用 call 的调用方法是比较直接的。

1. 制作一个参数列表(argList)，从参数1到结束
2. 第一个参数就是 this 的值
3. 用这个设置为thisValue并将argList作为它的参数列表来调用函数

```js
function hello(thing) {
  console.log(this + " says hello " + thing);
}

hello.call("XiChao", "world");  // XiChao says hello world
```

如例所见，调用 hello 方法并且设置 this 为 "XiChao" 和一个参数 "world"。这是JavaScript函数调用的核心原语。
您可以将所有其他函数调用看作是对这个原语的解糖化。（解糖化是采用一种方便的语法，并用更基本的核心原语来描述它）


## 通过简单的函数调用
<br />

总是使用 call 调用是非常烦人的。Js 允许直接使用括号语法(hello("world"))调用函数。当使用括号语法直接调用函数时，可脱糖为：
```js
function hello(thing) {
  console.log("Hello " + thing);
}

hello("world");

hello(window, "world");
```
**在 ES5 严格模式中为：**

```js
function hello(thing) {
  console.log("Hello " + thing);
}

hello("world");

hello(undefined, "world");
```

**在Node中为：**

```js
function hello(thing) {
  console.log("Hello " + thing);
}

hello("world");

hello(global, "world");
```
<br />

**自调用函数：**

```js
(function() {
})()

(function() {
}).call(window[ES5-strict: undefined)[node global))
```

## 成员函数
<br />
非常常见的一种方式调用方法是作为对象的属性进行调用。对象成员函数的脱糖为：
```js
var person = {
  name: "Xichao",
  hello: function(thing) {
    console.log(this + " says hello " + thing);
  }
}

person.hello("world");

// 脱糖为：
person.hello.call(person, "world");
```
在成员函数中，函数是如何添加到对象上的并不重要，如果使用独立函数动态的添加到对象中:
```js
function hello(thing) {
  console.log(this + " says hello " + thing);
}

person = { name: "Brendan Eich" }
person.hello = hello;

person.hello("world");  // 脱糖为 person.hello.call(person, "world");
hello("world"); // 脱糖为 hello(window, "world");
```

由此可见，此函数并没有持久确定的 this 指向，它总是根据调用者调用它的方式在调用时设置。

## 使用 Function.prototype.bind
<br />

因为有时引用具有持久 this 的方法是非常方便的，以前开发者使用简单的闭包将一个函数转换为一个不变的this
```js
var person = {
  name: 'Xichao',
  hello: function (thing) {
    console.log(this.name + " says hello " + thing);
  }
}

var boundHello = function (thing) { return person.hello.call(person, thing); }

boundHello('Word')
```
尽管 boundHello 调用是由 window 但是在 boundHello 内部将使用原始的调用方法将this值更改为我们想要的值。
当你需要一个原始函数作为回调函数传递时，这是最有用的,将这种方式变成通用的方式

```js
var person = {
  name: 'Xichao',
  hello: function (thing) {
    console.log(this.name + " says hello " + thing);
  }
}

var bind = function(func, thisValue) {
  return function() {
    return func.apply(thisValue, arguments);
  }
}

var boundHello = bind(person.hello, person);
boundHello("world") // "Xichao says hello world"
```
此中，arguments 为参数列表，apply 与 call 功能相同只是接收一个类似数组的参数。
bind 会返回一个新的函数，当新函数被调用时传入原始函数与 this 指向。