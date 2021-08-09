# TypeScript 学习
## TypeScript 起步
### 一、 ts介绍
1. ts 是微软开发的开源编程语言
2. typeScript 是 JavaScript 的超集
3. ts 是开发大型应用的基石
4. ts 提供了更丰富的语法提示
5. ts 在编译阶段能检查错误

### 二、 ts 环境安装
1. node 环境
安装 node，在 node 官网下载 LTS 版本，安装时傻瓜式下一步即可
2. 安装 typescript 环境
打开 cmd 或者在vscode中使用快捷键 `ctrl + shift + `/`
输入 `npm install typescript -g`
安装后会提供一个 tsc 工具，可以在终端中输入 tsc -v 查看是否安装成功

### 三、ts 代码编译
**如何编译?**
ts 代码在浏览器中展示需要先编译才能在浏览器中运行
在当前目录中使用 tsc 执行命令如 `tsc index.ts`
编译之后会生成 js 文件，直接使用这个 js 文件即可

**为什么编译?**
ts 在编译阶段就能检查代码错误，并且能够提供丰富的语法提示

### 四、 ts 静态类型
ts 是静态类型，js 是动态类型
当变量声明后可以动态的修改值的类型就是动态类型
在 ts 中类型是确定的，一旦赋值类型后就不能更改类型 否则报错 

#### ts 中的类型
在 js 中分为原始数据类型和引用数据类型
原始数据类型 boolean string number null undefined (symbol)
引用数据类型 object

原始数据类型在 TS 中叫做基础类型 boolean string number null undefined (symbol)
此外还新增了 any never
引用数据类型在 TS 中使用 object 表示，也就是除number，string，boolean，symbol，null或undefined 之外的类型

其他类型写法
1. 数组类型： 
- number[]  数字数组
- string[]  字符串数组
- boolean[] 布尔值数组
- Array<number> 泛型的写法
2. 函数注解 
- function(a: number, b: number): number {...}

## TS 使用 
### 配置学习目录
使用 `tsc --init` 自动创建 tsconfig.json 配置文件，在配置文件中修改 **rootDir** 与 **outDir**
```javascript
  "outDir": "./dist",
  "rootDir": "./src",   
```
在 src 文件夹下新建 index.ts
- 执行文件
在根目录下执行 `tsc` 即可自动寻找配置文件，通过配置项文成编译

*否则可能会因为环境原因 ts 报错，显示由同名声明*


### 一、原始数据的注解
**1. 布尔值**
```javascript
let isDone: boolean = false;
// 注意 boolean 而不是 Boolean， 后者是一个 interface，
```

**2. 数字**
与 JS 一样，TS 里所有的数字都是浮点数，TS 除了支持十进制与十六进制字面量还引入二进制和八进制
```javascript
let decLiteral: number = 6;
let hexLiteral: number = 0xf00d;  // 16 进制
let binaryLiteral: number = 0b1010; // 2 进制
let octalLiteral: number = 0o744;   // 8 进制

// 编译后的结果 
// var decLiteral = 6;
// var hexLiteral = 0xf00d;
// var binaryLiteral = 10;
// var octalLiteral = 484;
```
由编译后的结果可见，编译时将js 不能识别的*二进制*与*八进制*转变为 十进制

**3. 字符串**
```javascript
let myName: string = "xichao";
```
字符串拼接 以及 模板字符串
```javascript
// 字符串拼接
let sentence: string = 'hello, my name is ' + myName + ', I’ll be ' + (decLiteral + 1) + ' years old next week.';
// 模板字符串
let templateSentence: string = `hello, my name is ${ myName }, I'll be ${ decLiteral + 1 } years old next week.` ;
```

**4. Any**
在 TS 中数据类型是确定的，但有时候在编程阶段并不清楚变量类型，这些值可能来自于动态的内容，那么可以使用 any 类型来标记这些变量
any 数据类型表示任意数据类型
1. 如果是不确定的变量的话，可以是任意的数据类型
```javascript
let notSure: any = 4;
notSure = 'maybe a string instead';
notSure = false; // okay, definitely a boolean
console.log(notSure);
```
2. 如果是 编写阶段 any 允许调用任意方法，且不会报错, 但没有语法提示
```javascript
let notSure: any = 4;
notSure.ifItExists(); // okay, ifItExists might exist at runtime
notSure.toFixed(); // okay, toFixed exists (but the compiler doesn't check)
```
3. 未给初始值的变量类型为 any
```javascript
let anyVal;
anyVal = '123';
anyVal = 1
```

**5. void**
void类型像是与any类型相反，它表示没有任何类型，使用场景非常有限，当一个函数没有返回值时，，其返回值类型 void
```javascript
function voidFn(): void {
  console.log("no return value");
  // return undefined  并不会报错，但是没有必要
  // return 3;  // 报错  Type 'number' is not assignable to type 'void'
}
```

**6. null && undefined**
在 TS 中，undefined 和 null 各自有自己的类型
```javascript
let u: undefined = undefined;
let n: null = null;
```

默认情况下，null 和 undefined 是所有类型的子类型
*运行此代码需要在 tsconfing.json 中 strictNullChecks 为 false*
```javascript
let a: number = 1;
a = null;
let b: number = undefined
a = 2
```
官网不建议关闭检查，避免很多常见问题，推荐使用联合类型
```javascript
let num: number | undefined | null = undefined
num = 1;
num = null;
```

**7. Nerver**
never类型表示的是那些永不存在的值的类型。 例如， never类型是那些总是会抛出异常或根本就不会有返回值的函数表达式或箭头函数表达式的返回值类型； 变量也可能是 never类型，当它们被永不为真的类型保护所约束时。
never类型是任何类型的子类型，也可以赋值给任何类型；然而，没有类型是never的子类型或可以赋值给never类型（除了never本身之外）。 即使 any也不可以赋值给never。
```javascript
// 返回never的函数必须存在无法达到的终点
function error(message: string): never {
    throw new Error(message);
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

**8. Object**
object表示非原始类型，也就是除number，string，boolean，symbol，null 或 undefined之外的类型。