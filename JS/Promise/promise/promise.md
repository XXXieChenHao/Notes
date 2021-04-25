# Promise 学习

> 异步是各干各的不相干，同步时按顺序工作

## Promise 简介

**基本概念**
- Promise 是什么
  - Promise 是一种异步编程解决方案
- Promise 的特点
  - 对象的状态不受外界影响
  - 一旦状态改变就不会再变
- Promise 的意义
  - 异步问题同步化解决方案，与promise无关的任何程序保持异步关系。

**关键字**

| 关键字  |   译文   |
| :-----: | :------: |
| promise |   承诺   |
| pending |   等待   |
| resolve | 实现承诺 |
| reject  | 拒绝承诺 |



## Promise 使用

>  promise 本身不是异步，知识一种解决异步流程化的一种手段 

### 参数

- excutor 执行器 （new Promise 时调用）
  - resolve (函数)
  - reject (函数)

### 返回值

Promise 是一个构造函数，需要 new 使用, 在 new Promise 时会返回一个Promise 对象

```javascript
let promise = new Promise((resolve, reject) => {})
```

promise 对象具有状态属性 `PromiseState` 也就是 pending、fulfilled、rejected

### executor执行器 同步执行

```javascript
let promise = new Promise((resolve, reject) => {
    console.log(1);
})
console.log(2);
```

1. 上述代码先输出 1  后输出 2

2. new Promise 时执行 executor



### 语法

```js
let promise = new Promise((resolve, reject) => {
    resolve('fulfilled');
    // reject('reject');
})

promise.then((res) => {
  console.log(res)
}, (err) => {
  console.log(err)
})

console.log('1')
```

Promise中 的 executor是同步执行的，但实例化对象 promise 的 then 方法则是异步的

then 方法的执行需要等待 excutor 中执行resolve 或 reject 方法调用。

promise对象的默认状态是 pending 等待，无论是 resolve 或是 reject 都是将pending 的状态由pending 改变成为另一种，

- pending --> resolved

- pending --> rejected

  状态无法从 resolved 或是 rejected 重新回到 pedning 状态

- resolved 与 rejected 之间也无法