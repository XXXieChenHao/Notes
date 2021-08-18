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
从这个角度看，类型是描述那些值可以传递给 fn 并且哪些值将会崩溃。JavaScript 只真正提供动态类型-运行时才知道发生了什么。
另一种供选择的方式是在代码运行之前使用静态类型系统预测预期代码

**1. 静态类型检查**
重新思考之前尝试将字符串作为方法调用得到的类型错误。大多数人们不喜欢在运行代码时出现任何错误，这些都被认为是 bug！并且当编写新的代码时，总会尝试尽可能避免引入新的 bug。
如果只是添加大量代码，保存文件，重新运行代码，并且立即看到错误，我们可能会很快找出问题所在；但情况并非总是如此，我们可能没有对某一功能进行足够的测试，所以可能永远不会遇到运行时可能抛出的错误！或者如果我们很幸运遇到这个错误，我们可能最终会进行大规模的重构并且添加大量不同的代码，而又不得不去挖掘这些代码。
理想情况下，我们想要一个工具帮助我们在代码运行之前找到这些问题。这就是静态类型检查工具像 TypeScript 一样。静态类型系统描述了值在项目运行时的形状和行为。使用一个类型检查像 TypeScript 会使用这些信息并且告诉我们什么时候会出现问题。
```js
const message = "hello!";
 
message();
// 这个表达式不能被调用，字符串类型没有可被调用的方法
```
在 TypeScript 中在使用初始值运行代码之前将会提示一个错误信息。

**2. 非例外状况错误（Non-exception Failures）**
到目前为止所讨论的是确定的运行时错误 - JavaScript 告诉我们在运行时有些事情是黄喵的。出现这些情况是因为 ECMAScript 中说明了语言在遇到特殊情况时的行为。
例如，规范中声明调用某些不能够被调用的东西时应该抛出错误。可能听起来像是 “明显的行为”，但是你可以想象，访问对向上不存在的属性时今天也应该抛出错误，相反 JavaScript 给了不同的行为并且返回它得值为 undefined。
```javascript
const user = {
  name: "Daniel",
  age: 26,
};
user.location; // returns undefined
```

最终，一个静态类型系统不得不调用那些在系统中被标记错误的代码，即使它是 “有效的” JavaScript 代码也不会立即抛出异常，在 TypeScript 中下面的代码将产生一个关于location未定义的错误:
```tsx
const user = {
  name: "Daniel",
  age: 26,
};
 
user.location;
// Property 'location' does not exist on type '{ name: string; age: number; }'.
// Location 属性不存在于类型 '{ name: string; age: number; }' 上
```
虽然有时这意味着你可以在表达内容方面的权衡，但目的是捕获程序中的合法错误。TypeScript捕获了很多合法的错误。
例如
*打字错误：*
```tsx
const announcement = "Hello World!";
announcement.toLocaleLowercase();
announcement.toLocalLowerCase();
// Property 'toLocaleLowercase' does not exist on type '"Hello World!"'. Did you mean 'toLocaleLowerCase'?
```
*未调用方法：*
```tsx
function flipCoin() {
  // 这里 Math.random 而不是 Math.random()
  return Math.random < 0.5;
// Operator '<' cannot be applied to types '() => number' and 'number'.
}
```

*基础逻辑错误：*
```tsx
const value = Math.random() < 0.5 ? "a" : "b";
if (value !== "a") {
  // ...
} else if (value === "b") {
// 这里的 value === 'b' 总是返回 false，因为 类型 'a' 与 'b' 没有重合部分
}
```

**3. 类型的工具**
TypeScript 能够抓住 bug 当我们在代码中制造了一个错误，这是很好的，但是 TypeScript 也能够从一开始就防止我们制造这些错误。
类型选择器有一些信息去检查我们是否访问了正确的变量属性或其他属性，一旦它拥有了信息，它也可以提供你可能想要使用的属性建议。
这意味着 TypeScript 也能够编写代码，在编写代码过程中其核心类型检查器可以提供错误消息和代码完成。

### 基础类型
这里包含了大多数在 JavaScript 中可以找到的基础类型，并且在 TypeScrtip 中解释相应的描述类型。这不是一个详尽的列表，未来的章节将描述更多命名和使用其他类型的方法
类型能够出现在很多地方而不仅是类型注释，在了解类型本身的同时也能了解到在哪些地方引用这些类型形成新的构造。
我们将从回顾你可能在写 Js 或是 Ts 代码时遇到的最基础和普通的类型。这些将在以后形成更复杂类型的核心构建块。

**1. 基本类型 String、Number、Boolean**
Js 有三个非常常见被使用的基础类型：string，number， 和 boolean。每一个在 Ts 中都有相应的，如你所愿，如果你是用 Js 中的typeof 操作符查看这些类型时你可以看到它们在 Ts 有相同的类型名字：
- string 表示字符串如： "Hello, world"
- number 是数字，如 42， JavaScript没有整数的特殊运行时值， 所以没有int或float的等价物——所有的都是数字
- boolean 是只有 true 和 false 两个值的类型

类型名称String、Number和Boolean(以大写字母开头)是合法的，但是要参考一些在代码中很少出现的特殊内置类型。类型经常使用 string，number或者boolean类型。

**2. 数组 Arrays**
对于特殊类型的数组如 `[1, 2, 3]`, 你可以使用 `number[]` 语法；这语法适用于任何类型（如字符串数组 string[] 等）。你也可能看到`Array<number>` 这样的写法，这意味着相同的事情，在讨论泛型时，我们将学习更多关于语法T<U>的内容。
注意[数字]是不同的;请参阅元组类型一节。

**3. 任意类型 any**
Ts 也有一个特殊的类型，any，你能够使用它当你不想要因为某一特定值导致类型检测错误。当一个值是 any 类型，你能够访问任何它的属性（反过来它将是 any 类型），像函数一样调用它，将它赋给(或从)任何类型的值，或几乎任何语法上合法的其他东西:
```tsx
let obj: any = { x: 0 };
// 下面的代码不会抛出编译器错误。
// 使用' any '禁用所有进一步的类型检查，这是假定的
// 假设你比TypeScript更了解环境。
obj.foo();
obj();
obj.bar = 100;
obj = "hello";
const n: number = obj;
```
当你不想只为了 Ts 中某一行代码的正确而写一个长类型 any 类型是有用的。

*编译器标志 noImplicitAny*
当你不没有指定类型并且 Ts 不能从上下文中腿短出来的时候，编译器通常会默认为any。但是，您通常希望避免这种情况，因为任何都没有进行类型检查。使用编辑器 noImplicitAny 将任何隐式any标记为错误。


**4. 变量的类型注释**
