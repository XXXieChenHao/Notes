# TypeScript 编译配置
> 路漫漫其修远兮，吾将上下而求索

## 基础类型
TypeScript 支持与 JavaScript 几乎相同的数据类型，此外还提供了一些额外的类型以供使用.
### 布尔值
- 关键字 boolean
- 可用值 false、true
```tsx
let isDone: boolean = true;
isDone = false;
```

### 数字
- 关键字 number
- 可用值 全部的数字类型如 整数、小数、负数、十六进制、二进制、八进制等
```tsx
let decLiteral: number = 6;
let floatLiteral: number = 2.56;
let minusLiteral: number = -3;
let hexLiteral: number = 0xf00d;
let binaryLiteral: number = 0b1010;
let octalLiteral: number = 0o744;
```
在经过编译以后会得到除了十六进制外全都被编译为十进制的数字类型

### 字符串
- 关键字 string
- 可用值 字符串
```tsx
let myName: string = 'Xichao';
myName = 'Hello, Xichao';
```
模版字符串用法
```tsx
let myName: string = 'Xichao';
let age = 23;
let sentence: string = `Hello, myName is ${myName}. I'll be ${age + 1} years old next month.`;
```

### 数组
- 关键字
  - 数据类型 后面加上 []
  - 泛型 Array<数据类型>

```tsx
// 数据类型[]
let list0: number[] = [1 , 2, 3, 4, 5, -1];
let list1: string[] = ['1', 'hhh', '好啊'];

// 泛型
let list2: Array<number> = [1 , 2, 3, 4, 5, -1];
```

### 元组 Tuple
元组类型是另一种Array类型，它确切地知道它包含多少元素，以及在特定位置包含哪些类型。元祖类型允许表示一个已知元素数量和类型的数组，各元素类型不必相同。

**1. 声明**

```tsx
let x: [number, string];
x = [10, 'hello'];  // success

x = [10, 'hello', 2]; // error
// '[number, string, number]' 类型不能分配给 '[number, string]' 类型，源有三个元素但目标只允许两个
x = ['hello', 2]; // error
// 'hello' string 类型不能赋值给 number
// 2 number 类型不能赋值给 string
```


**2. 访问**
当访问一个已知索引的元素，会得到正确的类型
```tsx
console.log(x[0].substr(1)); // Error, 'number' does not have 'substr'
console.log(x[1].substr(1)); // OK
```

当访问一个越界的元素。
```tsx
console.log(x[2]);
//  '[number, string]' 元祖类型长度为 2 没有索引 2 的元素.
```

### 枚举
枚举是TypeScript少数几个不是JavaScript类型级扩展的特性之一。  枚举允许开发人员定义一组命名常量。使用枚举可以更容易地记录意图，或创建一组不同的案例。TypeScript同时提供了基于数字和字符串的枚举
- 关键字 enum
```tsx
enum Direction {Up, Down, Left, Right};
let up: Direction = Direction.Up;
let down: Direction = Direction.Down;
console.log(up, down);  // 0, 1
```
默认情况下，从0开始为元素编号,具有自增行为，你也可以手动的指定成员的数值。 例如，我们将上面的例子改成从 1开始编号：
```tsx
enum Direction {Up = 1, Down, Left, Right};
let up: Direction = Direction.Up;
let down: Direction = Direction.Down;
console.log(up, down); // 1, 2
```
如果只有部分赋值，则后续编号都从赋值位置开始递增：
```tsx
enum Direction {Up, Down=3, Left, Right};
let up: Direction = Direction.Up;
let down: Direction = Direction.Down;
let left: Direction = Direction.Left;
let right: Direction = Direction.Right;
console.log(up, down, left, right); // 0, 3, 4, 5
```
或者，全部都采用手动赋值：
```tsx
enum Direction {Up = 1, Down=3, Left=12, Right=5};
let up: Direction = Direction.Up;
let down: Direction = Direction.Down;
let left: Direction = Direction.Left;
let right: Direction = Direction.Right;
console.log(up, down, left, right); // 1, 3, 12, 5
```
枚举类型提供的一个便利是你可以由枚举的值得到它的名字。 例如，我们知道数值为2，但是不确定它映射到Direction里的哪个名字，我们可以查找相应的名字：
```tsx
enum Direction {Up = 1, Down, Left, Right};
let DirectionName: string = Direction[3];
console.log(DirectionName); // Left 因为从 1 开始递增，所以 3 的位置为 Left
```

### Any
Ts 也有一个特殊的类型，any，你能够使用它当你不想要因为某一特定值导致类型检测错误。当一个值是 any 类型，你能够访问任何它的属性（反过来它将是 any 类型），像函数一样调用它，将它赋给(或从)任何类型的值，或几乎任何语法上合法的其他东西:
- 关键字 any
```tsx
let notSure: any = 4;
notSure = "maybe a string instead";
notSure = false;
```
any 类型的对象 Ts 没有任何提示，即使类型上真的有这个方法。并且 any 类型不会进行检测
```tsx
let notSure: any = 4;
notSure.ifItExists(); // okay, ifItExists might exist at runtime
notSure.toFixed(); // okay, toFixed exists (but the compiler doesn't check)
```

*编译器标志 noImplicitAny*
当你不没有指定类型并且 Ts 不能从上下文中腿短出来的时候，编译器通常会默认为 any。但是，您通常希望避免这种情况，因为任何都没有进行类型检查。使用编辑器 noImplicitAny 将任何隐式 any 标记为错误。

### Void
- 关键字 void
- 表示无任何类型
某种程度上来说，void类型像是与any类型相反，它表示没有任何类型。 当一个函数没有返回值时，返回值类型通常是 void：

```tsx
function warnUser(): void {
  console.log("This is my warning message");
}
```
### Null 和 Undefined
Js 有两个原始的值用来表示没有值或未初始化的值：null 和 undefined.null 表示空值，undefined 表示未定义，并且 null 和 undefined 的子集只有其本身. 
```tsx
let nullValue: null = null;
let undefinedValue: undefined = undefined;
```

null 和 undefined 是所有类型的子类型，也就是说 null 和 undefined 可以赋值给任意类型变量的初始化。
```tsx
let nullString: string = null;
nullString = 'nullString';
let undefinedNumber: number = undefined;
undefinedNumber = 3;
```
这些类型的行为取决于你是否开启了 strictNullChecks 选项

*strictNullChecks off*

当 strictNullChecks off 时，仍然能够正常的访问可能为 null 或 undefined 的值，并且 null 和 undefined 能够被分配给任意类型的属性。
这类似于没有null检查的语言 (如 c#、Java) 的行为。缺少这些值的检查往往是错误的主要来源。所以如果在代码库中这样做是可行时推荐使用 strictNullChecks on

*strictNullChecks on*

当 strictNullChecks on 时，当一个值为 null 或 undefined, 将需要测试它们的值在使用值的方法或者属性之前。就像在使用可选属性之前检查undefined一样，我们可以使用收缩来检查可能为空的值:

```tsx
function doSomething(x: string | null) {
  if (x === null) {
    // do nothing
  } else {
    console.log("Hello, " + x.toUpperCase());
  }
}
```


### Never
表示永不存在的值，never 类型是那些总是会抛出异常或根本就不会有返回值的函数表达式或箭头函数表达式的返回值类型。返回never的函数必须存在无法达到的终点.
```tsx
function error(message: string): never {
  throw new Error(message)
}

// 推断的返回值类型为never
function fail() {
  return error("Something failed");
}

// 返回never的函数必须存在无法达到的终点
function infiniteLoop(): never {
  while (true) {
  }
}
```

### Object
object表示非原始类型，也就是除number，string，boolean，symbol，null或undefined之外的类型。

**1. 为对象中的每一项注解**
```tsx
function createObj(obj: {a: number, b: string, c: boolean}): void {
  console.log(obj)
}

createObj({
  a: 1,
  b: '123',
  c: true
})
```

**2. 使用关键字**
```tsx
function createObj(obj: object): void {
  console.log(obj)
}

createObj({a: 1, b: '123'}) // OK
createObj(1); // Argument of type 'number' is not assignable to parameter of type 'object'.
createObj('123'); // Argument of type 'string' is not assignable to parameter of type 'object'.
```

### 类型断言
类型断言主要是用于处理那些开发者比编辑器更能知道赋值为什么类型的时候。类型断言好比其它语言里的类型转换，使用类型断言没有运行时的影响，只是在编译阶段起作用。
类型断言的两种方式：
**1. as**
```tsx
const myCanvas = document.getElementById("main_canvas") as HTMLCanvasElement;
```
**2. 尖括号**
```tsx
const myCanvas = <HTMLCanvasElement>document.getElementById("main_canvas");
```

## 接口
TypeScript的核心原则之一是对值所具有的结构进行类型检查。

### 接口初探
函数接受一个对象参数
```tsx
function printLabel(labelledObj: { label: string }) {
  console.log(labelledObj.label);
}

let myObj = { size: 10, label: "Size 10 Object" };
printLabel(myObj);
```

下面我们重写上面的例子，这次使用接口来描述：必须包含一个label属性且类型为string：

```tsx
interface LabelledValue {
  label: string;
}

function printLabel(labelledObj: LabelledValue) {
  console.log(labelledObj.label);
}

let myObj = {size: 10, label: "Size 10 Object"};
printLabel(myObj);
```

LabelledValue 接口就好比一个名字，用来描述上面例子里的要求。 它代表了有一个 label属性且类型为string的对象。 这里只会去关注值的外形。 只要传入的对象满足上面提到的必要条件，那么它就是被允许的。
类型检查器不会去检查属性的顺序，只要相应的属性存在并且类型也是对的就可以。

### 可选属性
有些是只在某些条件下存在，或者根本不存在。给函数传入的参数对象中只有部分属性赋值了。
```tsx
interface SquareConfig {
  color?: string;
  width?: number;
}

function createSquare(config: SquareConfig): {color: string; area: number} {
  let newSquare = {color: "white", area: 100};
  if (config.color) {
    newSquare.color = config.color;
  }
  if (config.width) {
    newSquare.area = config.width * config.width;
  }
  return newSquare;
}

let mySquare = createSquare({color: "black"});
```
带有可选属性的接口与普通的接口定义差不多，只是在可选属性名字定义的后面加一个?符号。
可选属性的好处之一是可以对可能存在的属性进行预定义，好处之二是可以捕获引用了不存在的属性时的错误。

### 只读属性
一些对象属性只能在对象刚刚创建的时候修改其值。 你可以在属性名前用 readonly来指定只读属性：
```tsx
interface Point {
  readonly x: number;
  readonly y: number;
}

let p1: Point = {x: 1, y: 10};
console.log(p1.x)
// p1.x = 2;   // Cannot assign to 'x' because it is a read-only property.
```
**readonly vs const**
const 用于定义不可修改的变量，而 readonly 用于只读的属性。

### 任意属性
任意属性的写法方式是固定的
[propName: string]: any;
并且任意属性的值一定是 any
```tsx
interface SquareConfig {
  color: string;
  width: number;
  [propName: string]: any;
}
let config: SquareConfig = {
  color: '#fc3704',
  width: 300,
  position: 'top',
  float: true
}

```

propName 也就是索引签名，但在这我们要表示的是 SquareConfig 可以有任意数量的属性，并且只要它们不是 color 和 width，那么就无所谓它们的类型是什么。

### 函数类型
接口能够描述JavaScript中对象拥有的各种各样的外形。 除了描述带有属性的普通对象外，接口也可以描述函数类型。
为了使用接口表示函数类型，我们需要给接口定义一个调用签名。 它就像是一个只有参数列表和返回值类型的函数定义。参数列表里的每个参数都需要名字和类型。
```tsx
interface SearchFunc {
  (source: string, subString: string): boolean;
}

let mySearch: SearchFunc;
mySearch = function(source: string, subString: string): boolean {
  let result = source.search(subString);
  return result > -1;
}
```
对于函数类型的类型检查来说，函数的参数名不需要与接口里定义的名字相匹配
```tsx
let mySearch: SearchFunc;
mySearch = function(src: string, sub: string): boolean {
  let result = src.search(sub);
  return result > -1;
}
```
函数的参数会逐个进行检查，要求对应位置上的参数类型是兼容的

### 可索引的类型
与使用接口描述函数类型差不多，也可以描述那些能够通过索引得到的类型。可索引类型具有一个索引签名，还有相应的索引返回值类型

```tsx
interface StringArray {
  [index: number]: string;
}
let myArray: StringArray = {
  0: 'hhh',
  10: 'index is 10'
}
console.log(myArray[0]) // 'hhh'
console.log(myArray[10]) // 'index is 10'
console.log(myArray[1]) // undefined
```

### 类类型
TypeScript 能够用它来明确的强制一个类去符合某种契约
