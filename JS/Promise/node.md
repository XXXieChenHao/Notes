# Promise
> promise 从显示角度出发 promise 释义为承诺
承诺共包含三种状态
- 承诺实现        resolve       解决问题
- 承诺失信        reject        拒绝考虑
- 等待承诺        pending       苦苦等待
promise 目的是为了解决异步流程化的一种手段 promise本身不是异步

Promise 是一个构造函数，需要 new
Promise 有且只有一个参数 excutor(执行器)
excutor 有两个参数且都是函数 resolve  reject 
excutor 在 Promise 实例化时调用

excutor 是同步执行的
```javascript
let promise = new Promise((resolve, reject) => {
  console.log(1);
})
console.log(2);

// 先打印 1, 后打印2
```

