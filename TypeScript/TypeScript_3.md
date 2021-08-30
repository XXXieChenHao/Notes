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
