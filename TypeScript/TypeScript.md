# TypeScript 英文文档试读
> 路漫漫其修远兮，吾将上下而求索

## 一段介绍
可能常常听到 TypeScript 是 JavaScript 的一种 “风格” 或是 “变种”，在现代编程语言中 TS 与 Js 两者之间的关系是独一无二的，所以了解两者之间的关系可以帮助理解 TypeScript 是如何添加到 JavaScript 中的。

### 一段简单的历史
JavaScript 生命的开始是在浏览器中的一段简单的脚本语言。在刚刚被发生的时候，它只是被期望嵌入到一个 web 页面当中，甚至几十行代码都是不同寻常的。正因如此，早期浏览器执行这种代码速度非常缓慢，然而，随着时间的发展，Js 变得越来越流行并且很多开发者使用它来创造交互体验。

Web 浏览器开发人员不断优化执行引擎并且添加 API，使开发人员更多地使用。浏览器经常运行跨越数十万行代码的应用程序。

不仅如此，Js 如今已经变得足够流行，可以在浏览器的环境意外使用，如在 NodeJs 中实现 Js 服务器。

总而言之，Js 是从一个为了快速使用而设计的语言，成长到如今可以编写具有数百万行代码的应用程序的成熟的工具。

每一门语言都有自己的怪癖，而 Js 的起步也让它同样拥有这种问题，例如：
1. Js 中判断操作符
```javascript
if('' == 0) {
  // 结果为 true
}

if(1 < x < 3) {
  // 结果为 true,并且 x 的任何值都成立
}
```

2. JavaScript 允许访问不存在的属性
```javascript
const obj = {width: 10, height: 15};
const area = obj.width * obj.heigth;  // 这里的 heigth 不存在
// area 结果为 NaN, 并不会报错
```

在这类错误发生时，大多数的编程语言都会抛出异常，有些则会在编译阶段就抛出异常。在编写小的程序时，虽然这些怪癖很烦，但是还可以控制，在使用数百或数千行代码编写应用程序时，这些不断出现的怪癖就是一个很严重的问题。

### TypeScript: 静态类型检查器
有些语言根本不允许运行有 bug 的程序。在不运行代码的情况下检查出代码的错误叫做静态检查。根据值的类型判断哪些是错误哪些不是被称为静态类型检查。
TypeScript 在程序执行之前依据值的类型检查代码错误，所以 Ts 是一个静态类型检查器。例如：

```javascript
const obj = { width: 10, height: 15 };
const area = obj.width * obj.heigth;
// Property 'heigth' does not exist on type '{ width: number; height: number; }'. Did you mean 'height'?ts(2551)
```
在 TS 中会提示错误，但是在 Js 中则不会报错。

### JavaScript 的超集
> TypeScript 与 JavaScript 的关系

**1. 语法**
TypeScript 是 JavaScript 的超集，因此 Ts 中使用 Js 语法也是合法的。语法是我们编写文本以形成程序的方式。Ts 不会将任何 Js 中的语法当成错误，这意味着你可以将任何可工作的JavaScript代码放入TypeScript文件中，而不必担心它是如何编写的。
**2. 类型**
TypeScript 是一个类型的超集，这意味着它添加了一些关于如何使用不同类型值的规则。之前 obj 的错误中，并不是语法错误，而是使用了一个错误的类型。
如下，在 Js 中可以运行，并且打印出来一个值，而在 Ts 中则会检查为错误。
```javascript
console.log(4 / []);  // Js 中输出一个合法的类型 Infinity （无穷大）
```
然而在 Ts 中则考虑，数字除以一个数组是没有意义的，所以提示错误

```tsx
console.log(4 / []);  // The right-hand side of an arithmetic operation must be of type 'any', 'number', 'bigint' or an enum type. 
```
算数符右侧的值必须是 'any', 'number', 'bigint' 或者 enum 类型。
可能有的时候只是想要看一看数字类型除以数组会发生什么，然而在大多数情况下，这都是一个程序错误。TypeScript 类型检查器被设计成允许正确的程序通过，但仍然收集了很多常见的错误。
如果你将一些代码从 Js 中移动到 Ts 中则会发现一些类型错误，这取决于代码如何编写。这些可能是合理的，或者是 Ts 过于保守。后续则可以通过添加 Ts 语法来消除这些问题。

**3. 执行期行为**
TypeScript 也是编程语言，它保留了 Js 在执行时的行为。例如除以 0 在 Js 中输出 `Infinity` 而不是抛出运行异常。作为一个原则，Ts 绝对不会改变 Js 代码运行时的行为。
这意味着从 Js 中移动代码到 Ts 时保证以相同的方式运行，即使 Ts 认为代码存在类型错误。
保持执行时行为一致是 Ts 的一个基本承诺，这意味着可以在两种语言之间请以转换，而无需担心细微差异影响程序停止。

**4. 擦除类型**
粗略地说，一旦 Ts 检查完代码以后就会擦除类型以生成编译的代码，这意味着一旦代码被编译，Js 代码中就不会含有类型信息。
这也意味着 Ts 绝对不会根据它推断出来的类型改变程序的运行。你可能在代码中看到类型错误，但是类型系统本身与程序的工作方式无关。
另外，Ts 不会提供任何运行时的库，你的程序将使用与 Js 相同标准的库，所以不需要学习额外的框架。


## 技术重点

### 基本原则
在 JavaScript 中每一个值都有不同的行为，可以通过不同的操作观察到这些行为。虽然听起来抽线，但是参考例子，考虑我们可能运行在变量 message 上的一些操作。
```javascript
// 访问 message 上的 toLowerCase 属性并且带哦用
message.toLowerCase();
// 调用 message 方法
message();
```
如果我们拆开来看，第一行访问一个 toLowerCase 属性并且调用了它，第二行则直接尝试调用 message 方法。但是假设我们不知道 message 的值，-并且它是一个常见的-我们不能确切的说出运行代码后得到的结果。每个操作的行为完全依赖于最初的值。
- message 是否可以调用？
- 是否包含 toLowerCase 属性？
- 如果存在，toLowerCase 是否可以调用？
- 如果两者都可以调用，则会返回什么？
这些问题的答案通常都是我们在写 JavaScript 代码时牢记于心的，并且我们只希望我们记住的细节都是正确的。

假设 message 是如下方式声明的。
```javascript
const message = 'Hello Xichao'
```
可以猜测，如果尝试运行 `message.toLowerCase()`,将会得到小写相同的字符串。如果熟悉 JavaScript 则会知道第二行代码运行会报错
```javascript
TypeError: message is not a function
```
如果可以避免诸如此类的错误就特别好。
当我们运行代码，JavaScript 运行时通过计算值的类型进行选择-行为排序和其拥有的能力。
这是TypeError暗指的一部分-它说字符串"Hello World!"不能作为函数调用。
对于一些值，如原始字符串或数字，能够确认值的类型在运行时使用 typeof 操作符。但是对于其他的如函数，没有相应的机制在运行时确认类型。考虑如下函数：
```js
function fn(x) {
  x.flip()
}
```
我们能通过阅读代码观察到这个函数将只能工作通过一个对象调用 flip 属性，并且 JavaScript 并没有一种方式能够在运行时查看信息。在 Js 中唯一纯粹的方式去获取一个特殊的值就是去调用并且发生了什么。这种行为使得很难在代码运行前语言，也意味着很难在编写代码时得知代码将如何执行。

从这个角度看，




Seen in this way, a type is the concept of describing which values can be passed to fn and which will crash. JavaScript only truly provides dynamic typing - running the code to see what happens.

The alternative is to use a static type system to make predictions about what code is expected before it runs.

### 
