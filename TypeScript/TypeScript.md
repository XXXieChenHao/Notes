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
当你声明了一个变量使用 const，var 或者 let，你能够随意的添加类型注释明确的指定变量的类型：
```tsx
let myName: string = "Xichao";
```
Ts 不使用类型在左侧的声明方式像，int x = 0; 类型注释总是在输入的内容之后。

然而在大多数情况下是不需要的，Ts 会随时自动推断代码中的类型。例如变量的类型是根据其初始化式的类型推断出来的。
```tsx
//  不需要类型注释——'myName'推断为类型'string'
let myName = "Xichao";
```
对于大部分情况你不需要学习接口的规则，如果你敢开始，尝试比思考更少的使用类型注解-你可能惊喜，你可能会惊讶地发现，你只需要这么少的TypeScript 就能完全理解发生了什么。

**5. 函数**
函数是 Js 中传递数据的主要方式。Ts 允许指定函数输入和输入的值的类型。

*5.1 参数类型注解*
当声明了一个函数，你能每一个参数之后添加类型注解，以声明函数接收何种类型的参数。参数类型注解在参数名之后：
```tsx
function greet(name: string) {
  console.log("Hello, " + name.toUpperCase() + "!!");
}
```
当一个参数有了类型注解，调用函数传参时会进行校验：
```tsx
// 如果执行会出现错误
greet(42);
// 警告提示：Argument of type 'number' is not assignable to parameter of type 'string'.
```
即使你没有参数类型竹节，Ts 仍然会检查你传递参数的数量是否正确

*5.2 返回类型注解*
你也能添加返回类型注解。返回类型注释出现在参数列表之后:
```tsx
function getFavoriteNumber(): number {
  return 26;
}
```
像变量类型注解一样，你通常不需要返回类型注解，因为 Ts 会根据返回语句推断出函数的返回类型。
上面例子中的类型注解没有任何改变，有些代码库会显式地指定返回类型，以用于文档编制、防止意外更改或只是出于个人偏好。

*5.3 匿名函数*
你们函数与声明式函数有一点不同，当一个函数出现在 Ts 可以决定它将如何被调用的位置时，该函数的参数会自动被指定类型。
```tsx
// 这里没有类型注解，但是 Ts 不会标记为错误
const names = ["Alice", "Bob", "Eve"];
 
// 函数的上下文类型
names.forEach(function (s) {
  console.log(s.toUppercase());
  // Property 'toUppercase' does not exist on type 'string'. Did you mean 'toUpperCase'?
});
 
// Contextual typing also applies to arrow functions
names.forEach((s) => {
  console.log(s.toUppercase());
  // Property 'toUppercase' does not exist on type 'string'. Did you mean 'toUpperCase'?
});
```

即使参数没有类型注解，TypeScript 使用forEach函数的类型以及数组的推断类型来确定 s 将拥有的类型。
这个过程被称为上下文类型，因为函数执行的上下文会告之其类型。
类似于推理规则，你不需要明确了解如何发生，但理解它的发生可以帮助您了解到什么时候不需要类型注解。

**6. 对象类型**
除了基本元素外，最常见的类型就是对象类型。这指的是带有属性的任意 Js 值，几乎是所有属性。声明一个对象类型，只需列出属性和对应的类型。
例如：
```tsx
// 参数的类型注解就是对象注解
function printCoord(pt: { x: number; y: number }) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}
printCoord({ x: 3, y: 7 });
```
为参数的两个属性进行类型注释 - x 和 y - 两个类型都是 number。可以使用逗号 (,) 或者分号 (;) 进行分割属性，并且最后一个分割是可选的。
每个属性的类型部分也是可选的，如果你不特殊指定类型，它将被认为是 any 类型。

*可选属性*
对象类型也能够执行全部属性中的某一个为可选属性。如果这么做的话添加一个问号 (?) 在属性名的后面
```tsx
function printName(obj: { first: string; last?: string }) {
  // ...
}
// Both OK
printName({ first: "Bob" });
printName({ first: "Alice", last: "Alisson" });
```
在 Js 中如果访问某个属性但是该属性不存在，你将会得到返回值为 undefined 而不是运行错误。正因如此当从可选属性中读取时应当在试用期那先检验是否为 undefined。
```tsx
function printName(obj: { first: string; last?: string }) {
  // Error - might crash if 'obj.last' wasn't provided!
  console.log(obj.last.toUpperCase());
  // Object is possibly 'undefined'.
  if (obj.last !== undefined) {
    // OK
    console.log(obj.last.toUpperCase());
  }
 
  // A safe alternative using modern JavaScript syntax:
  console.log(obj.last?.toUpperCase());
}
```


**7. 联合类型**
Ts 的类型系统允许您使用各种各样的操作符从现有类型构建新的类型。

*7.1 定义联合类型*
组合类型的第一个方法是联合类型。一个联合类型是由两个或多个其他类型组成的类型，表示可能是其中一种类型的值。将每一种类型成为联合类型的成员。
```tsx
function printId(id: number | string) {
  console.log("Your ID is: " + id);
}
// OK
printId(101);
// OK
printId("202");
// Error
printId({ myID: 22342 });
//Argument of type '{ myID: number; }' is not assignable to parameter of type 'string | number'. Type '{ myID: number; }' is not assignable to type 'number'.
```

*7.2 使用联合类型*
这是简单的去提供一个匹配联合类型的值 - 只需匹配联合类型成员中的任意一个。
Ts 将会只允许你去做一些联合类型中每一个成员都有效的事情。例如，如果你有一个联合类型 string ｜ number 你不能使用只在字符串上有效的方法
```tsx
function printId(id: number | string) {
  console.log(id.toUpperCase());
  // Property 'toUpperCase' does not exist on type 'string | number'. Property 'toUpperCase' does not exist on type 'number'.
}
```
解决的方法是缩小联合代码的范围，就像在没有类型注释的 Js 一样。当 Ts 可以根据代码结构为某个值推断出更具体的类型的时候，就会发生收缩。
例如， Ts 知道只有一个 string 的值将会被 typeof 为 string
```tsx
function printId(id: number | string) {
  if (typeof id === "string") {
    // In this branch, id is of type 'string'
    console.log(id.toUpperCase());
  } else {
    // 这里 id 是
    console.log(id);
  }
}
```
另一个例子使用方法类似 Array.isArray
```tsx
function welcomePeople(x: string[] | string) {
  if (Array.isArray(x)) {
    // Here: 'x' is 'string[]'
    console.log("Hello, " + x.join(" and "));
  } else {
    // Here: 'x' is 'string'
    console.log("Welcome lone traveler " + x);
  }
}
```
注意在 else 分支上不需要做任何特殊的操作 - 如果 x 不是 string[] 那一定是 string。
有时你会有一个所有成员都有共同点的联盟。例如每个 arrays 和 strings 都有一个 slice 方法。如果联合中的每一个成员都有一个共同属性，你不需要缩小就可以使用这个属性：
```tsx
// 返回的类型推断为 numberp[] 或 string
function getFirstThree(x: number[] | string) {
  return x.slice(0, 3);
}
```
令人困惑的是联合类型的并集可能具有这些属性的交集。这并不是一个意外 - 联合这个名字来源于类型理论。联合 number ｜ string 是由每个类型的值组合而成。注意给定两个集合，每个集合都有相应的事实，只有这些事实的交集应用于集合本身。例如如果有一个房间的带着帽子的高个子人，另一个房间里是带着帽子讲西班牙语的人，当两间屋子联合在一起时可以得知每一个人都带着一顶帽子。


**8. 类型别名**
我们一直通过在类型注释中使用对象类型和联合联合类型，这虽然很方便，但通常希望多次使用同一类型并通过单个名称访问它。
类型别名就是任何类型的名称：
```tsx
type Point = {
  x: number;
  y: number;
};
 
// Exactly the same as the earlier example
function printCoord(pt: Point) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}
 
printCoord({ x: 100, y: 100 });
```
实际上可以给任意类型设置类型别名，不仅仅是对象类型。例如类型别名可以为联合类型命名：
```tsx
type ID = number | string;
```
注意别名知识别名 - 你不能使用类型别名来创建一个类型的 不同的/明显的版本。当你使用这个别名时就像写了别名类型一样。换句话说，代码看起来像是不和规则的但是在 Ts 是符合的，因为两种类型都是同一个类型的别名。
```tsx
type UserInputSanitizedString = string;
 
function sanitizeInput(str: string): UserInputSanitizedString {
  return sanitize(str);
}
 
// Create a sanitized input
let userInput = sanitizeInput(getInput());
 
// Can still be re-assigned with a string though
userInput = "new input";
```

**8. 接口**
接口声明是命名对象类型的另一种方法:
```tsx
interface Point {
  x: number;
  y: number;
}
 
function printCoord(pt: Point) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}
 
printCoord({ x: 100, y: 100 });
```
就像之前使用的类型别名一样，例子中就像使用匿名对象类型一样。Ts 只关心传递给函数的结构 - 它只关心是否具有预期的属性。因为只关心类型的结构和功能，所以我们称TypeScript为结构类型的类型系统。

**9. 类型别名和接口的区别**
类型别名和接口非常相似，并且在很多案例中可以自由的在两者之间选择。 几乎接口的所有特性都可以通过type来实现，关键的区别是类型不能重新打开以添加新属性，而接口总是可扩展的。

扩展接口
*Interface*
```tsx
interface Animal {
  name: string
}

interface Bear extends Animal {
  honey: boolean
}

const bear = getBear() 
bear.name
bear.honey
```
*Type*
```tsx
type Animal = {
  name: string
}

type Bear = Animal & { 
  honey: boolean 
}

const bear = getBear();
bear.name;
bear.honey;
```

向现有接口添加新字段
*Interface*
```tsx
interface Window {
  title: string
}

interface Window {
  ts: TypeScriptAPI
}

type TypeScriptAPI =  {
  transpileModule: (a: string, b: {}) => {
    
  }
}

const src = 'const a = "Hello World"';
window.ts.transpileModule(src, {});
window.title = src
```
*Type*
```tsx
type Window = {
  title: string
}

type Window = {
  ts: TypeScriptAPI
}
// 错误  已存在 Window
```

**9. 类型断言**
有时候会有 TypeScript 无法知道的值类型信息。
例如，如果使用`document.getElementById`, Ts 只知道它将返回 HTML元素中的某一些， 但是你可能知道你的页面总是有一个带有给定 ID 的 HTMLCanvasElement。
在这种情况下，可以使用类型断言来指定更具体的类型
```tsx
const myCanvas = document.getElementById("main_canvas") as HTMLCanvasElement;
```
想类型注释一样，类型断言会被编译器在移除所以并不会影响代码运行时的行为。
你也能使用尖括号（除非是在 .tsx 文件中），例如：
```jsx
const myCanvas = <HTMLCanvasElement>document.getElementById("main_canvas);
```
提示：因为类型断言在编译时被移除，因此没有与类型断言相联合的运行代码检查.如果类型断言错误并不会产生异常或者 null。

Ts 只允许类型断言转换为更特定或更不特定的类型。这条规则提供“不可能”的强制措施：
```tsx
const x = "hello" as number;
// Conversion of type 'string' to type 'number' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.
// 将类型'string'转换为类型'number'可能是一个错误，因为这两种类型都不能与另一种类型充分重叠。如果这是有意的，首先将表达式转换为“unknown”。
```
有时这个规则也过于保守并且不允许更复杂的可能有效的存在。如果是这样，你能使用两个断言，首先是 any（或者是 unknown） 然后转换到需要的类型。
```tsx
const a = ('hello' as any) as number;
const b = ('hello' as unknown) as number;
```

**10. 文字类型**
除了基础类型 string 和 number，我们还可以在类型位置中引用特定的字符串和数字。var 和 let 两者都允许变量的内容改变，const 则不可以，这反映在 Ts 如何为字面量创建类型上。
```tsx
let changingString = "Hello World";
changingString = "Olá Mundo";
// 因为 changingString 能够表示任意可能的字符串，所以 string 就是 Ts 在类型系统中的描述方式
// changingString ==> let changingString: string
      
let changingString: string
 
const constantString = "Hello World";
// 因为 constantString 只能有一个可能的字符串，所以它有一个文字类型表示
// constantString ==> onst changingString:  "Hello World"
```
文字类型本身并不是很有价值
```tsx
let x: "hello" = "hello";
x = "hello";
x = "howdy";
// 类型 "howdy" 不能分配给类型 "hello"
```
只有一个值的变量没有多大用处！
但是通过将字面意思合并到联合中，可以表达一个更有用的概念 - 例如，函数只接受一个确定的设定好已知的值：
```tsx
function printText(s: string, alignment: "left" | "right" | "center") {
  // ...
}
printText("Hello, world", "left");
printText("G'day, mate", "centre");
// Argument of type '"centre"' is not assignable to parameter of type '"left" | "right" | "center"'.
// 类型为 "centre" 的参数不能赋给类型为 "left"|"right"|"center" 的参数
```
数字文字类型也是如此
```tsx
function compare(a: number, b: number): 1 | 0 | -1 {
  return a === b ? 0 : a > b ? 1 : -1;
}
```
当然也可以与非文字类型联合使用
```tsx
interface Options {
  width: number;
}
function configure(x: Options | "auto") {
  // ...
}
configure({width: 100})
configure("auto")
configure("atuo")
// Argument of type '"atuo"' is not assignable to parameter of type 'Options | "auto"'.
// 类型为 "atuo"的参数不能赋给类型为 'Options|"auto"' 的参数
```
还有一种文字类型:布尔文字。只有两种布尔字面值类型，true 和 false 类型。布尔类型本身实际上只是联合 true | false 的别名。

**11. 文字推断**
当使用对象初始化一个变量是， Ts 会假设这个对象的属性会在后续改变，例如：
```tsx
const obj = { counter: 0 };
if (someCondition) {
  obj.counter = 1;
}
```

Ts 并不认为将一个之前为 0 的字段赋值为 1 是错误的。另一种说法是 obj.counter 一定是数字类型，而不是 0，因为类型是用来确定读写行为的。
这也同样适用于字符串：
```tsx
const req = { url: "http://nicexch.com", method: "GET" };
handleRequest(req.url, req.method);
function handleRequest(url: string, method: "GET"|"POST") {}
// Argument of type 'string' is not assignable to parameter of type '"GET" | "POST"'.
// 字符串类型参数不能分配给 '"GET"|"POST"' 类型。
```
在上述例子中 req.method 被推断为 string 而并非 "GET". 因为代码可以在创建 req 和调用 handleRequest 之间进行评估。handleRequest 可以为 req.method 分配一个新的字符串类似于 "GUESS"，Ts 认为代码包含错误。
有两种方法可以解决这个问题:
1. 你可以通过在任意位置给接口添加类型断言：

```tsx
// Change 1:
const req = { url: "https://example.com", method: "GET" as "GET" };
// Change 2
handleRequest(req.url, req.method as "GET");
```
Change 1 意味着确定 req.method 总是具有文字类型 "GET", 防止可能分配的 "GUESS" 参数.
Change 2 意味着明确要求有其他原因，req.method 拥有值 "GET" 

2. 你也可以使用 as const 转换整个对象为文字类型：

```tsx
const req = { url: "https://example.com", method: "GET" } as const;
handleRequest(req.url, req.method);
```
`as const` 后缀的行为像 const，但对于类型系统来说， 确保所有属性都被赋值为文字类型，而不是更通用的版本，如字符串或数字。

**11. null 和 undefined**
Js 有两个原始的值用来表示没有值或未初始化的值：null 和 undefined.
Ts 有两个相应的类型并且是相同的名字。这些类型的行为取决于你是否开启了 strictNullChecks 选项

*strictNullChecks off*

当 strictNullChecks off 时，仍然能够正常的访问可能为 null 或 undefined 的值，并且 null 和 undefined 能够被分配给任意类型的属性。
这类似于没有null检查的语言 (如 c#、Java) 的行为。缺少这些值的检查往往是错误的主要来源。所以如果在代码库中这样做是可行时推荐使用 strictNullChecks on

*strictNullChecks on*

当 strictNullChecks on 时，当一个值为 null 或 undefined, 将需要测试它们的值在使用值的方法或者属性之前。就像在使用可选属性之前检查undefined一样，我们可以使用收缩来检查可能为空的值:




