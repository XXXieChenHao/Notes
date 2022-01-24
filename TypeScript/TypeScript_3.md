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
```tsx
interface ClockInterface {
  currentTime: Date
}

class Clock implements ClockInterface {
  currentTime: Date;
  setTime(d: Date) {
    this.currentTime = d;
  }
  constructor(h: number, m: number) { }
}
```
接口描述了类的公共部分，而不是公共和私有两部分。 它不会帮你检查类是否具有某些私有成员

### 类静态部分与实例部分的区别
当你操作类和接口的时候，你要知道类是具有两个类型的：静态部分的类型和实例的类型。 你会注意到，当你用构造器签名去定义一个接口并试图定义一个类去实现这个接口时会得到一个错误

## 类

```tsx
class Gretter {
  gretting: string;
  constructor (message: string) {
    this.gretting = message
  }
  greet() {
    return 'Hello,' + this.gretting;
  }
}

let greet = new Gretter('Xichao');
console.log(greet.greet())
```
在类重使用 this，表示我们访问的是类的成员。
使用 new 构造了 Greeter 类的一个实例。 它会调用之前定义的构造函数，创建一个 Greeter 类型的新对象，并执行构造函数初始化它。

### 继承
基于类的程序设计中一种最基本的模式是允许使用继承来扩展现有的类。

```tsx
class Animal {
  move(distanceInMeters: number = 0) {
    console.log(`Animal moved ${distanceInMeters}`);
  }
}

class Dog extends Animal {
  bark() {
    console.log('汪汪')
  }
}
const dog = new Dog();
dog.bark();
dog.move();
dog.move(10);
```
被继承的类如 Animal 被称为基类，也可以叫做父类或者超类，Dog 被称为派生类或是子类。通过 extends 继承基类的方法和属性。因为派生类继承了基类属性和方法，所以派生里实例化对象不仅可以调用自身，也可以调用基类的属性和方法。

**构造函数**
```tsx
class Animal {
  name: string;
  constructor(theName: string) {
    this.name = theName;
  }
  move(distanceInMeters: number = 0) {
    console.log(`${this.name} moved ${distanceInMeters}m.`);
  }
}

class Snake extends Animal {
  constructor(name: string) {
    super(name);
  }
  move(distanceInMeters = 5) {
    console.log('snake is moving');
    super.move(distanceInMeters);
  }
}

class Horse extends Animal {
  constructor(name: string) {
    super(name);
  }
  move(distanceInMeters = 45) {
    console.log('horse is moving');
    super.move(distanceInMeters)
  }
}

let snake = new Snake('first');
let horse = new Horse('second');
snake.move(10);
horse.move(20);
```
派生类包含了一个构造函数,它必须调用 super()，它会执行基类的构造函数。而且，在构造函数里访问 this 的属性之前，我们 一定要调用 super()。 这个是 TypeScript 强制执行的一条重要规则。
Snake类和 Horse类都创建了 move 方法，它们重写了从 Animal 继承来的 move方法，使得 move 方法根据不同的类而具有不同的功能。在派生类中调用基类的方法需要使用 super.基类方法()

### 修饰符
**公共**
public 公共修饰符，同时也会类中默认的修饰符。表示可以自由的访问类中的成员

```tsx
class Animal {
  public name: string;
  public constructor (theName: string) { this.name = theName; }
  public move (distanceInMeters: number) {
    console.log(`${this.name} moved ${distanceInMeters}m.`)
  }
}

let cat = new Animal('cat');
cat.move(20)
```

**私有**
private 私有的，使用私有修饰符后，类中的成员无法在外部被使用。
```tsx
class Animal {
  private name: string;
  constructor(theName: string) { this.name = theName; }
  private moved(distanceInMeters: string) {
    console.log(`${this.name} moved ${distanceInMeters}m.`)
  } 
}

let cat = new Animal('cat')
cat.name; // Property 'name' is private and only accessible within class 'Animal'.
cat.moved(); // Property 'moved' is private and only accessible within class 'Animal'.

class Horse extends Animal {
  constructor(theName: string) { super(theName)}
  public moved(distanceInMeters: string) {
    super.moved(distanceInMeters); // Property 'moved' is private and only accessible within class 'Animal'
  }
}
```
TypeScript使用的是结构性类型系统。 当我们比较两种不同的类型时，并不在乎它们从何处而来，如果所有成员的类型都是兼容的，我们就认为它们的类型是兼容的。当我们比较带有 private 或 protected 成员的类型的时候，情况就不同了。 如果其中一个类型里包含一个 private 成员，那么只有当另外一个类型中也存在这样一个 private 成员， 并且它们都是来自同一处声明时，我们才认为这两个类型是兼容的。 也就是说，即使两个类中包含一摸一样的成员，但不是来自于同一处定义时，两者也是不兼容的。

```tsx
class Animal {
  private name: string;
  constructor(theName: string) {this.name = theName; }
}

class Rhino extends Animal {
  constructor(theName: string) { super(theName); }
}

class Employee {
  private name: string;
  constructor(theName: string) {this.name = theName; }
}

let animal = new Animal("animal");
let rhino = new Rhino('rhino');
let employee = new Employee("employee");

animal = rhino;
animal = employee; //类型 Employee 无法为 Animal 赋值，类型有单独的私有属性 name 
```
Rhino 从过年 Animal 中继承，所以 Rhino 与 Animal 是兼容的，尽管 Employee 中有一个私有成员 name ， 但是并不是 Animal 中的那个，所以两者不兼容。

**受保护的**
protected 修饰符与 private 修饰符的行为很相似，但有一点不同， protected 成员在派生类中仍然可以访问

```tsx
class Animal {
  protected name: string;
  constructor(theName: string) { this.name = theName }
}

class Employee extends Animal {
  constructor(name: string) {
    super(name)
  }

  public getElevatorPitch() {
    return `${this.name}`
  }
}

let demo = new Employee('demo')
console.log(demo.getElevatorPitch());
demo.name; // Property 'name' is protected and only accessible within class 'Animal' and its subclasses.
```
**只读**
readonly 只读修饰符声明只读属性，只读属性必须在声明时或构造函数里被初始化。
```tsx
class Person {
  readonly name: string;
  readonly age: Number;
  readonly numberOfLegs: number = 8;
  constructor(theAge: Number) {
    this.age = theAge;
  }
}

let dad = new Person(18);
console.log(dad.age)
dad.name = 'xch'; // Cannot assign to 'name' because it is a read-only property
```

**参数属性**
参数属性可以方便地让我们在一个地方  *定义*  并  *初始化*  一个成员。

```tsx
class Person {
  constructor(readonly name: string, public age: number) {
  }
}

let xichao = new Person('Xichao', 24)
console.log(xichao.name)
console.log(xichao.age)
```

参数属性通过给构造函数参数前面添加一个访问限定符来声明。 

### 存取器
Ts 支持通过 getters/setters 来截取对对象的访问。
```tsx
class Employee {
  private _fullName: string;
  private passcod: any = 'nicexichao'
  private password: any;
  get fullName() {
    return this._fullName
  }

  set fullName(newName: string) {
    if (this.password && this.password == this.passcod) {
      this._fullName = newName
      console.log('修改成功！')
    } else {
      console.log('密码错误，没有权限修改用户名')
    }
  }

  public login(password: any) {
    this.password = password;
  }
}

let employee = new Employee();
employee.login('123456');
employee.fullName = '登录失败后';
console.log(employee.fullName);
employee.login('nicexichao');
employee.fullName = '登录成功后';
console.log(employee.fullName);
```

### 静态属性
当类被实力话时才会初始化的属性叫做实例成员，也叫实例属性。而存在于类本身上面而不是类上面的实例叫做静态属性。
访问静态属性时，需要加上 类名. 才能访问

```tsx
interface Point {
  x: number;
  y: number;
}
class Grid {
  static origin: Point = {x: 0, y: 0};
  calculateDistanceFromOrigin(point: Point) {
    let xDist = (point.x - Grid.origin.x);
    let yDist = (point.y - Grid.origin.y);
    return Math.sqrt(xDist * xDist + yDist * yDist) / this.scale
  }

  constructor(private scale: number) {}
}

let grid1 = new Grid(1);
let grid2 = new Grid(0.5);
console.log(grid1.calculateDistanceFromOrigin({x: 10, y: 20}));
console.log(grid2.calculateDistanceFromOrigin({x: 10, y: 20}));
```


### 抽象类
抽象类做为其它派生类的基类使用。 它们一般不会直接被实例化。 不同于接口，抽象类可以包含成员的实现细节。 abstract关键字是用于定义抽象类和在抽象类内部定义抽象方法。
抽象类中的抽象方法不包含具体实现并且必须在派生类中实现。 抽象方法的语法与接口方法相似。 两者都是定义方法签名但不包含方法体。 然而，抽象方法必须包含 abstract关键字并且可以包含访问修饰符。

```tsx
abstract class Department {
  constructor (public name: string) {}

  printName(): void {
    console.log('Department name: ' + this.name);
  }

  abstract printMeeting(): void
}

class AccountingDepartment extends Department {
  constructor() {
    super('xiChao');
  }

  printMeeting(): void {
    console.log('Nice to meet you')
  }

  generateReports(): void {
    console.log('Generating accounting reports...');
  }
}

let department: Department = new AccountingDepartment();
department.printName()
department.printMeeting()
```


## 函数
Ts 可以创建有函数名的函数和匿名函数。

### 函数类型
函数的类型体现在参数与返回值上。
**为函数定义类型**
在参数后加参数的类型
在函数体前加返回值类型
```tsx
function add(x: number, y: number): number {
  return x + y;
}

let myAdd = function (x: number, y: number): number {
  return x + y;
}
```
我们可以给每个参数添加类型之后再为函数本身添加返回值类型。 TypeScript能够根据返回语句自动推断出返回值类型，因此我们通常省略它。

**书写完整函数类型**

```tsx
let myAdd: (x: number, y: number) => number = function (x: number, y: number): number {
    return x + y;
};
```
函数类型包含两部分：参数类型和返回值类型。 当写出完整函数类型的时候，这两部分都是需要的。 我们以参数列表的形式写出参数类型，为每个参数指定一个名字和类型。 这个名字只是为了增加可读性。

```tsx
let myAdd: (baseValue: number, increment: number) => number = function (x: number, y: number): number {
    return x + y;
};
```
只要参数类型是匹配的，那么就认为它是有效的函数类型，而不在乎参数名是否正确。
对于返回值，我们在函数和返回值类型之前使用( =>)符号，使之清晰明了。 如之前提到的，返回值类型是函数类型的必要部分，如果函数没有返回任何值，你也必须指定返回值类型为 void而不能留空。
函数的类型只是由参数类型和返回值组成的。 函数中使用的捕获变量不会体现在类型里。 实际上，这些变量是函数的隐藏状态并不是组成API的一部分。

**推断类型**
Ts 会根据上下文进行推断, 如果你在赋值语句的一边指定了类型但是另一边没有类型的话，TypeScript编译器会自动识别出类型：
```tsx
let myAdd: (baseValue: number, increment: number) => number =
    function(x, y) { return x + y; };
```

### 函数参数

**可选参数**
Ts 中会对参数的个数进行校验，同时会假设只有这些参数，所以过多或过少都会出现问题。 简短地说，传递给一个函数的参数个数必须与函数期望的参数个数一致。
```tsx
function buildName(firstName: string, lastName: string) {
  return firstName + " " + lastName;
}

buildName('Xi', 'Chao');
buildName('Xi'); // Expected 2 arguments, but got 1. 期待两个参数，但只有一个
buildName('Xi', 'Chao', 'nice'); // Expected 2 arguments, but got 3. 期待两个参数，但有三个
```
JavaScript里，每个参数都是可选的，可传可不传。 没传参的时候，它的值就是undefined。 在TypeScript里我们可以在参数名旁使用 ?实现可选参数的功能。 比如，我们想让last name是可选的：
```tsx
function buildName(firstName: string, lastName?: string) {
  if (lastName)
        return firstName + " " + lastName;
    else
        return firstName;
}

buildName('Xi', 'Chao')
buildName('Xi')
```

可选参数必须跟在必须参数后面。 如果上例我们想让first name是可选的，那么就必须调整它们的位置，把first name放在后面。

**默认参数**
在TypeScript里，我们也可以为参数提供一个默认值当用户没有传递这个参数或传递的值是undefined时。 它们叫做有默认初始化值的参数。
```tsx
function buildName(firstName: string, lastName = "Smith") {
  return firstName + " " + lastName;
}

buildName('xi');
buildName('xi', 'Chao');
buildName('xi', 'Chao', 'nice'); // Expected 1-2 arguments, but got 3. 期待 1-2 个参数，但有 3 个。
```
带默认值的参数不需要必须放在参数最后，与普通可选参数不同。可以将默认值设置为 undefined，即可让可选参数放在前面。

**剩余参数**
必要参数，默认参数和可选参数有个共同点，都表示某一个参数，不确定有多少参数传递进来。 在 Js 里，你可以使用 arguments 来访问所有传入的参数。而在TypeScript里，你可以把所有参数收集到一个变量里。

```tsx
function buildName(firstName: string, ...restOfName: string[]) {
  return firstName + " " + restOfName.join(" ");
}

let employeeName = buildName("ZhangSan", "LiSi", "WangEr", "XiChao");
```
剩余参数会被当做个数不限的可选参数。 可以一个都没有，同样也可以有任意个。 编译器创建参数数组，名字是你在省略号（ ...）后面给定的名字，你可以在函数体内使用这个数组


### This
在 Js 中 This 在函数被调用时才会指用。
**This 和箭头函数**
createCardPicker 方法返回了一个匿名函数，
```tsx
let deck = {
  suits: ["hearts", "spades", "clubs", "diamonds"],
  cards: Array(52),
  createCardPicker: function() {
      return function() {
          let pickedCard = Math.floor(Math.random() * 52);
          let pickedSuit = Math.floor(pickedCard / 13);

          return {suit: this.suits[pickedSuit], card: pickedCard % 13};
      }
  }
}

let cardPicker = deck.createCardPicker();
let pickedCard = cardPicker();

```