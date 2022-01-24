# TypeScript 
> 路漫漫其修远兮，吾将上下而求索

## 编译 TypeScript
### 前期准备
安装 typeScript 编译工具，确保电脑中包含 node 与 npm，检验方法为 
```
node -v
npm-v 
```
如果没有以上两者，自行寻找下载方法。
```
npm install typescript -g
```
苹果用户可能存在权限问题, 使用 sudo
```
sudo npm install typescript -g
```
安装 typeScript 会提供一个 tsc 工具，可以通过 tsc 的方式在控制台中输入执行相应的命令
1. 查看 tsc 是否安装

```
tsc -v
```
2. 查看 tsc 所有命令

```
tsc -h
```
### 如何编译
Ts 代码无法在浏览器直接运行，所以如果想要 Ts 代码在浏览器中正常运行则需要提前进行编译，编译后再使用。
编译的方式就是通过 tsc 工具在相应的目录下访问文件名进行编译：
假设 test 文件夹下包含 1.ts 文件，在控制台中使用 tsc 命令：
```
tsc 1.ts
```
编译结束后会发现文件夹中新增了一个名为 1.js 的文件，此文件就是编译后的结果。
### 编译配置
当前我的文件夹层级为
TypeScript ——  src
在 TypeScript 文件夹下打开控制台输入
```
tsc --init
```
此命令用于初始化 ts 配置, 此时目录结构为

TypeScript ——  src
          ｜—— tsconfig.json
在 src 文件夹下书写 ts 代码，通过配置 tsconfig.json 将 src/ts 编译后的结果放入 TypeScript/dist 文件夹中
找到并修改其中的两项

```json
    "outDir": "./dist",
    "rootDir": "./src",  
```
在 tsconfig.json 同级目录下执行 tsc 就会自动编译 src 下所有的 ts 文件并放到 dist 下。

## Ts 中的类型
这里只是有一个大概的了解
### JS 与 Ts的数据类型
原始数据类型：boolean string number null undefined symbol
引用数据类型： Object
在 Ts 中这些数据类型也都是合理的数据类型，并且也都作为相应的数据类型的关键字使用。
而在 Ts 中又额外新增了部分数据类型，
- 基础类型：any never 
- 对象类型：interface
- 数组类型：number[] string[] boolean[] 范型：Array<number>
- 函数类型：
  - 参数注解 function(a:string, b:number) {}
  - 返回值注解: function():string {}

这些新增的东西都是用来被使用上述关键字进行对类型的注解。
### 新增语法特性
- 断言 as
- 类关键字 class(oop) 面向对象的三大特性：封装、继承、多态


## 类型注解
原始类型的注解只需要在声明时的变量名后面加上相应的类型关键字即可
### 布尔值
- 关键字 boolean
- 可用值 false、true
```tsx
let isDone: boolean = false;
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

### 任意数据类型
- 关键字 any
- 可用值 任意值
any 用来表示任意数据类型，在书写代码时并不清楚变量将会被分配何种类型
```tsx
let notSure: any = 4;
notSure = false;
notSure = 'Maybe a string';
```
any 类型可以调用其变量的任意方法，无论是否存在, 并且原有存在的方法也不会有语法提示。
```tsx
let notSure: any = 4;
notSure = false;
notSure = 'Maybe a string';
notSure.ifitExists(); // 并不存在
notSure.toFixed();
```
这偏离了 ts 静态检查的意义，而在运行时却会报错，所以一般只有在为了减少类型检查时才会使用。
当只知道一部分类型时，any 是很有效果的。
```tsx
let list: any[] = [1, 'Xichao', false];
```
未初始化的变量类型为 any
```tsx
let a; // 类型为 any
a = 123;
a = '123';
```

### 无类型 
- 关键字 Void
- 可用值 无值
仅用在函数没有返回值时的类型注解
```tsx
function noReturn( ) :void {
  console.log('no return')
  // return undefined  并不会报错
  // return 3; //error： number 类型不能分配给 void 类型
}
```

### null && undefined
- 关键字 null、undefined
- 可用值 null ——> null  undefined ——> undefined
null 表示空值，undefined 表示未定义，并且 null 和 undefined 的子集只有其本身

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
如果存在报错，可以在 tsconfig.json 中将 strictNullChecks 设置为 false 即可。

### 永远不存在 Never
- 关键字 never
- 可用值 不存在的值
用来表示永不存在的值的类型。never 是任何类型的子类型，除了 never 以外任何类型都不能赋值给 never 类型
如报错：
```tsx
function error(message: string): never {
  throw new Error(message);
}

function fail() {
  return error('Something failed');
}
```
或者死循环：
```tsx
function infinteLoop(): never {
  while(true) {

  }
}
```
返回 never 的函数必须无法到达终点。 

### 对象类型 Object
- 关键字 object 
- 可用值 非原始类型
使用 declare 时，代表非原始类型
```tsx
declare function  create(o: object| null): void;

create({prop: 0})
// create(1)  error Argument of type '1' is not assignable to parameter of type 'object | null'.
```
声明一个对象类型，只需列出属性和对应的类型。
```tsx
function printCoord(pt: { x: number; y: number }): void {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}
printCoord({ x: 3, y: 7 });
```
### 类型推断
类型注解是开发者定义的 Ts 中变量的类型。在 Ts 中如果没有指定类型，Ts 会根据上下文自行推断。
```tsx
let x = 3;
// Ts 会进行相关的判断，let x: number;
``` 

### 联合类型
- 关键字 ｜
- 可用值 任意类型其中的几种
```tsx
let a: string|number;
a = 123;
a = '123';
```
赋值的时候只需要满足其中一种就好，然而需要注意
使用联合类型时只能在内部调用调用共有方法，或者缩小范围。
```tsx
function test(a: number|string){
  return a.split(''); // Property 'split' does not exist on type 'number'
}
test(1)
```
调用共有方法并不会报错
```tsx
function test(a: number|string){
  return a.toString();
}
test(1)
```
或者缩小范围
```tsx
function test(a: number|string){
  if(typeof a === 'number') {
    return a.toFixed(1)
  } else {
    return a.split(''); // Property 'split' does not exist on type 'number'
  }
}
test(1)
```

## 类型注解-进阶
### 接口初识 interface
1. 对象的形状进行描述
2. 对类的一部分行为的抽象

```tsx
interface Person{
  name: string;
  age: number;
}
let person: Person = {
  name: 'zhangsan',
  age: 23
}
```
默认 interface 接口不可多也不可以少，但是可以使用其它方式改变默认

**可选属性**
使用 ？ 表示可选属性
```tsx
interface Person {
  name: string;
  age?: number; // 可选属性
}
```

**任意属性**
任意属性的写法方式是固定的
[propName: string]: any;
并且任意属性的值一定是 any
```tsx
interface Person {
  name: string;
  age: number;
  [propName: string]: any;
}
let person: Person = {
  name: 'Xichao',
  age: 23,
  sex: 'male'
}
```

**只读属性**
在 interface 类型前书写 readonly 以后此属性不可修改
```tsx
interface Person {
  readonly id: number;
  name: string;
  age: number;
  [propName: string]: any;
}
let person: Person = {
  id: 1,
  name: 'Xichao',
  age: 23,
  sex: 'male'
}

person.id = 2;  // Cannot assign to 'id' because it is a read-only property.
```

### 数组
写法方式
- 类型[]
- Array<类型>
- interface

1. 类型[]
简单的类型[]
```tsx
let list: number[] = [1, 2, 3];
```
这种方式声明的数组内部必须为 数字，并且长度没有限制

使用联合类型
```tsx
let list: (number|string)[] = [1, 2, 3, '4'];
```

2. 范型

```tsx
let list: Array<number> = [1, 2, 3];
```

3. 接口
```tsx
interface NumberArr {
  [index: number]: number;
}

let list3: NumberArr = [1, 2, 3, 4]
```
其中属性值的类型也可以使用联合类型

### 伪数组

- 关键字 IArguments
- 可用值 伪数组

```tsx
function test() {
  let args: IArguments = arguments
}
```

或者使用 interface
```tsx
interface Args {
  [index:number]: any;
  length: number;
  callee: Function;
}
```

### 函数注解

**1. 函数声明**
函数声明时的注解需要在每一个参数后面类型注解后再注解返回值
```tsx
function test(a: number, b: number): number {
  return a + b;
}
```

**2. 函数表达式**
函数表达式
```tsx
let test:(a: number, b: number) => number = function(a: number, b: number) :number {
  return a + b;
}
```
通常函数表达式后半部分可以推断出数据类型, 所以总会忽略
```tsx
let test:(a: number, b: number) => number = function(a, b) {
  return a + b;
}
```
注意：前面并不是箭头函数

**3. 可选参数**
可选参数使用 ？ 表示可选, 可选参数一般放到后面，否则在调用时报错
```tsx
function bullName(firstName: string, secondName?: string): string {
  return firstName + secondName
}

bullName('Xi')
bullName('Xi', 'Chao')
```
**4. 默认参数**
默认参数一定不会是可选参数，一定不能加 问号
```tsx
function bullName(firstName: string, secondName: string = 'HaHaHa'): string {
  return firstName + secondName
}

bullName('Xi')
bullName('Xi', 'Chao')
```
**5. 剩余参数**
使用扩展运算符与 restOfName, 并且要放到最后面
```tsx
function bullName(firstName: string, secondName: string = 'HaHaHa', ...restOfName: string[]): string {
  return firstName + secondName + restOfName
}

bullName('Xi')
bullName('Xi', 'Chao', '哈哈哈', '诶呀诶呀')
```

**6. 结构赋值**
```tsx
function test(
  { first: , second }: { first: number, second: number } = { first: 1, second: 2 }
  ): number {
  return first + second
}

```
```tsx
function test ({first}: {first: number}): number {
  return first
}
```

**7. This 指向**
1. this 可以通过箭头函数修改 this 指向
2. 通过指定参数注解 this 的类型

```tsx
interface Card {
  suit: string;
  card: number;
}

interface Dack {
  suits: string[];
  cards: number[];
  createCardPicker(this: Dack): () => Card
}

let deck: Dack = {
  suits: ["hearts", "spades", "clubs", "diamonds"],
  cards: Array(52),
  createCardPicker: function() {
      return () => {
          let pickedCard = Math.floor(Math.random() * 52);
          let pickedSuit = Math.floor(pickedCard / 13);

          return {suit: this.suits[pickedSuit], card: pickedCard % 13};
      }
  }
}

let cardPicker = deck.createCardPicker();
let pickedCard = cardPicker();

alert("card: " + pickedCard.card + " of " + pickedCard.suit);
```

**8. 函数重载**
存在一主体方法，输入不同，无法确认返回值类型，函数重载可以进行确认
```tsx
function reverse(x: number|string) {
  if(typeof x === 'number') {
    return Number(x.toString().split('').reverse().join(''))
  } 
  if(typeof x === 'string') {
    return x.split('').reverse().join('')
  }
}
```
使用函数重载：
```tsx
function reverse(x: number): number;
function reverse(x: string): string;
function reverse(x: number|string) {
  if(typeof x === 'number') {
    return Number(x.toString().split('').reverse().join(''))
  } 
  if(typeof x === 'string') {
    return x.split('').reverse().join('')
  }
}
```
在 Ts 中的重载并没有改变任何的编译结果，但是它能起到一个更加表意清楚的作用。



## 类的注解

### 2. 类成员的修饰符
*public*
公共的成员属性
- 自身可调用
- 子类可调用
- 实例可调用

```tsx
class Animal {
  public name: string;
  public constructor (theName: string) {this.name = theName}
  public move(distance: number) {
    console.log(`${this.name} move  d ${distance} m.`)
  }
}
```

*private*
私有的成员属性
- 只能够自身调用

- 无法继承
```tsx
class Animal {
  private name: string;
  public constructor (theName: string) {this.name = theName}
  private move(distance: number) {
    console.log(`${this.name} moved ${distance} m.`)
  }
}

// Class 'Snake' incorrectly extends base class 'Animal'. Types have separate declarations of a private property 'move'
class Snake extends Animal {
  constructor(name: string) {
    super(name)
  }
  private move(distance: number) {
    super.move(2)
  }
}
```

- 实例无法调用
```tsx
class Animal {
  private name: string;
  public constructor (theName: string) {this.name = theName}
  private move(distance: number) {
    console.log(`${this.name} moved ${distance} m.`)
  }
}

let animal = new Animal('动物');
animal.move(2)  // Property 'move' is private and only accessible within class 'Animal'.
```

*proprotected*
受保护的成员属性
- 自身可调用
- 子类可调用
- 实例无法调用
```tsx
class Animal {
  protected name: string;
  public constructor (theName: string) {this.name = theName}
  protected move(distance: number) {
    console.log(`${this.name} moved ${distance} m.`)
  }
}

class Snake extends Animal {
  constructor(name: string) {
    super(name)
  }
  protected move(distance: number) {
    super.move(2) // no error  可以调用
  }
}

let an = new Animal('动物')
an.move(2) 
// Property 'move' is protected and only accessible within class 'Animal' and its subclasses.
```

*readonly*
只读的成员属性
readonly 的位置需要在 public/protected/private 后面，并且只能书写在属性声明之前，或索引之前
并且 readony 只能读取，不能写入
```tsx
class Animal {
  public readonly name: string;
  public constructor (theName: string) {this.name = theName}
  protected move(distance: number) {
    this.name = '23' // Cannot assign to 'name' because it is a read-only property.t
    console.log(`${this.name} moved ${distance} m.`)
  }
}

let an = new Animal('动物')
an.name = '2' // Cannot assign to 'name' because it is a read-only property.

```

**3. 参数属性**
参数属性通过给构造函数参数前面添加一个访问限定符来声明。 使用 private 限定一个参数属性会声明并初始化一个私有成员；对于 public 和 protected 来说也是一样。其实就是一种简写。
```tsx
class Octopus {
    readonly name: string;
    readonly numberOfLegs: number = 8;
    constructor (theName: string) {
        this.name = theName;
    }
}
```
上下是等效的。
```tsx
class Octopus {
    readonly numberOfLegs: number = 8;
    constructor(readonly name: string) {
    }
}
```

### 3. 存取器
存取器其实对应的就是 getter 和 setter, 改变赋值和读取的行为。
- get 取值函数  obj.a
- set 存值函数  obj.a = '123
- 带有 get 不带有 set 的存取器自动被推断为 readonly
```tsx
let passcode = "secret passcode";

class Employee {
    private _fullName: string;

    get fullName(): string {
        return this._fullName;
    }

    set fullName(newName: string) {
        if (passcode && passcode == "secret passcode") {
            this._fullName = newName;
        }
        else {
            console.log("Error: Unauthorized update of employee!");
        }
    }
}

let employee = new Employee();
employee.fullName = "Bob Smith";
if (employee.fullName) {
    alert(employee.fullName);
}
```

### 静态属性
静态属性是位于类的静态成员上的属性，需要通过`类名.属性`访问。在 Ts 中通过 static 定义
```tsx
class Grid {
    static origin = {x: 0, y: 0};
    calculateDistanceFromOrigin(point: {x: number; y: number;}) {
        let xDist = (point.x - Grid.origin.x);
        let yDist = (point.y - Grid.origin.y);
        return Math.sqrt(xDist * xDist + yDist * yDist) / this.scale;
    }
    constructor (public scale: number) { }
}

let grid1 = new Grid(1.0);  // 1x scale
let grid2 = new Grid(5.0);  // 5x scale

console.log(grid1.calculateDistanceFromOrigin({x: 10, y: 10}));
console.log(grid2.calculateDistanceFromOrigin({x: 10, y: 10}));
```

### 抽象类
抽象类做为其它派生类的基类使用。 它们一般不会直接被实例化。
- abstract 关键字是用于定义抽象类和在抽象类内部定义抽象方法。