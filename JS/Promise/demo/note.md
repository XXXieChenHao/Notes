# Promise A+规范与源码实现

## Terminology （术语）
1. 'promise' is an object or function with a then method whose behavior conforms to this specification.
   - promise 是一个带有一个遵守规范的 then 方法的对象或者函数。
2. 'thenable' is an object or function that defines a then method.
   - thenable 是一个定义了 then 方法的对象或者函数。
3. 'value' is any legal JavaScript value (including undefined, a thenable, or a promise).
   - value 是一个合理的 JS 值 (包含 undefined，thenable 或者一个 promise)
4. 'exception' is a value that is thrown using the throw statement.
   - exception 是使用 throw 语句抛出的值。
5. 'reason' is a value that indicates why a promise was rejected.
   - reason 是一个指示一个承诺为什么被拒绝的值

## Requirements 所需要的条件
<br />

### 1. new Promise 
需要实例化，所以这里采用 ES6 Class,
executor 在 new Promise 的时候立即执行，所以在 constructor 里调用并且传入两个函数
```javascript
class MyPromise {
  constructor(executor) {
    // ...
    executor(resolve, reject);
  }
}
```

### 2. Promise Status
2.1 A promise must be in one of three states: pending, fulfilled, or rejected
- 一个 promise 一定处于三个状态中的一个 pending, fulfilled, or rejected
所以声明三个常量保存 promise 的状态
```javascript
// 位于 class 外定义常量，或者也可以在 class 内部定义静态变量都可
const PENDING = 'pending',
      FULFILLED = 'fulfilled',
      REJECTED = 'rejected';
```
2.2 Promise pending state may transition to either the fulfilled or rejected state, both fulfilled and rejected must not transition to any other state
- promise 的 pending 状态可能转变为 fulfilled 或者 rejected 状态， fulfilled 和 rejected 都不能转变为其他状态。
所以在实例化时，应当先初始化状态为 pending
```javascript
class MyPromise() {
  constructor(executor) {
    this.status = PENDING;    // 初始化处于 pending 状态
    this.value = undefined;   // 定义 fulfilled 状态的 value
    this.reason = undefined;  // 定义 rejected 状态的 reason

    executor(resolve, reject);
  }
}
```

2.3 When fulfilled, a promise must have a value, which must not change, When rejected, a promise must have a reason, which must not change
- 当 fulfilled 状态时 promise 一定有一个不可改变的 value 
- 当 rejected 状态时 promise 一定有一个不可改变的 reason

在构造其中定义函数 `resolve` 与 `reject`, 从而保证每一个实例化的 promise 都会声明这两个函数

```javascript
class MyPromise {
  constructor(executor) {
    this.status = PENDING;    // 初始化处于 pending 状态
    this.value = undefined;   // 定义 fulfilled 状态的 value
    this.reason = undefined;  // 定义 rejected 状态的 reason

    const resolve = (value) => {
      this.status = FULFILLED;
      this.value = value;
    }

    const reject = (reason) =>{
      this.status = REJECTED;
      this.reason = reason;
    }

    executor(resolve, reject);
  }
}
```
promise 的状态只能由 pending 转变为另外两种，而另外两种不能再改变，为防止如下操作
```javascript
new Promise((resolve, reject) => { 
  resolve(); 
  reject(); 
})
```
所以需要对 resolve 与 reject 函数中状态改变时进行判断，只有当状态为 pending 时才能执行状态改变。
```javascript
const resolve = (value) => {
  if (this.status === PENDING) {
    this.status = FULFILLED;
    this.value = value;
  }
}

const reject = (reason) => {
  if (this.status === PENDING) {
    this.status = REJECTED;
    this.reason = reason;
  }
}
```

## 3. The `then` Method
> then 方法

4.3.1 A promise must provide a then method to access its current or eventual value or reason. A promise's `then` method accepts thoe arguments:
一个 promise 一定提供一个 then 方法去访问它当前或最终的 value 或者 reason，一个 promise 的 then 方法接受两个参数 `promise.then(onFulfilled, onRejected)`

声明实例方法  then 

```javascript
class MyPromise {
  constructor(executor) {
    // ... 暂时省略
  }
  // 声明实例方法 可以由实例化对象 new Promise() 继承使用
  then(onFulfilled, onRejected) {
    // ...
  }
}

```
3.1.1 Both `onFulfilled` and `onRejected` are optional arguments: 
  - if `onFulfilled` is not a function, it must be ignored.
  - if `onRejected` is not a function, it must be ignored.
onFulfilled 和 onRejected 都是可选参数，如果onFulfilled 或是 onRejected 不是 function 则被忽略, 直接将传入的参数返回

```javascript
then(onFulfilled, onRejected) {
  onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value
  onRejected = typeof onRejected === 'function' ? onRejected : reason => reason
}
```

3.1.2 if `onFulfilled` is a function
  - it must be called after `promise` is fulfilled, with `promise`'s value as its first argument.
  - it must not be called before promise is fulfilled.
  - it must not be called more than once.
如果 `onFulfilled` 是一个函数时，它必须在 promise 完成时被调用，并且 promise 的值作为第一个参数。一定不会再完成之前被调用。一定不会被调用超过一次。

3.1.3 if `onRejected` is ad function
  - it must be called after `promise` is rejected, with `promise`’s reason as its first argument.
  - it must not be called before promise is fulfilled.
  - it must not be called more than once.
如果 `onRejected` 是一个函数时，它必须在 promise 失败时被调用，并且 promise 的值作为第一个参数。一定不会再失败之前被调用。一定不会被调用超过一次。
```javascript
  then(onFulfilled, onRejected) {
    // ...

    if (this.status === FULFILLED) {
      onFulfilled(this.value)
    }

    if (this.status === REJECTED) {
      onRejected(this.value)
    }
  }
```

3.1.4 `onFulfilled` or `onRejected` must not be called until the execution context stack contains only platorm code.
`onFulfilled` 或 `onRejected` 只有当执行环境堆栈仅包含平台代码时才可被调用。所谓平台代码指的是引擎、环境或 promise 实现代码。这一要求确保了在事件循环之后执行.
```javascript
then(onFulfilled, onRejected) {
  // ...
  if (this.status === FULFILLED) {
    setTimeout(() => {
      onFulfilled(this.value)
    }, 0)
  }

  if (this.status === REJECTED) {
    setTimeout(() => {
      onRejected(this.value)
    }, 0)
  }
}
```

3.1.5 `then` may be called multiple timer on the same promise.
  - if/when `promise` is fulfilled, all respective `onFulfilled` callbacks must execute in the order of ther originating calls to `then`.
如果/当 promise 成功时，所有的 onFulfilled 函数都按照最初调用到then的顺序进行各自回调。
  - if/when `promise` is rejected, all respective `onRejected` callbacks must execute in the order of their origination calls to `then`.
如果/当 promise 失败时，所有的 onRejected 函数都按照最初调用到then的顺序进行各自回调。
调用代码
```javascript
let p = new Promise((resolve, rejcet) => {
  // resolve() or reject() 
}) 
p.then((value) => {}, (reason) => {})
p.then((value) => {}, (reason) => {})
p.then((value) => {}, (reason) => {})
```
上述代码当 executor 中 resolve 或是 reject 时则会按照调用then 的顺序(从上到下)依次调用then 中的回调，具体调用哪个回调需要根据 resolve 或是 reject，并且**顺序调用时状态应都保持一致**，要么p.then 都执行 onFulfilled 要么都执行 onRejected，因为状态只能改变一次。

**订阅-发布模式**
收集所有成功和失败的回调，在 constructor 中声明两个容器 onFulfilledCallbacks、onRejectCallbacks
这一个过程就是订阅的过程，发布过程，也就是函数调用，则应该在 resolve 或 reject 执行时状态发生改变，然后发布。

executor 和 then 方法的调用是同步的，但 then 的回调函数只有状态为 fulfilled 或 rejected 才执行，如果 executor 中是同步代码则then 方法在调用时 status 一定不为 pending，所以当 status === pending 时，将每一次调用 then 时的回调都push 到回到中，当 resolve 或 reject 改变
```javascript
class MyPromise {
  constructor (executor) { 
    // ... 
    this.onFulfilledCallbacks = [];
    this.onRejectCallbacks = [];

    const resolve = (value) => {
      if (this.status === PENDING) {
        this.status = FULFILLED;
        this.value = value;
        // 发布（函数调用）
        // 遍历所有成功态 then 方法的 onFulfilled 函数
        this.onFulfilledCallbacks.forEach(fn => fn());
      }
    }

    const reject = (reason) => {
      if (this.status === PENDING) {
        this.status = REJECTED;
        this.reason = reason;
        // 遍历所有失败态 then 方法的 onRejected 函数
        this.onRejectCallbacks.forEach(fn => fn());
      }
    }
  }

  then(onFulfilled, onRejected) {
    
    if (this.status === PENDING) {
      // 订阅（函数收集）
      this.onFulfilledCallbacks.push(() => {
        onFulfilled(this.value);
      });

      this.onRejectCallbacks.push(() => {
        onRejected(this.reason);
      });

    }
  }
}
```
至此在使用时
```javascript
let p = new MyPromise((resolve, rejcet) => {
  setTimeout(() => {
    resolve('2s 后调用所有 then 方法中的 onFulfilled')
  }, 2000)
})

p.then(() => { console.log('2s 后我第一个被调用'); }, () => {})
p.then(() => { console.log('2s 后我第二个被调用'); }, () => {})
p.then(() => { console.log('2s 后我第三个被调用'); }, () => {})
```

3.1.6 Exception  catch 异常捕获
- if either `onFulfilled` or `onRejected` throws an exception e, promise must be rejected with e as the reason
- if executor throws an exception e, promise must be rejected with e as the reason
`executor` 或 `onFulfilled` 或 `onRejected` 抛出异常 e 时，promise 都应当将以 e 作为 reason 传入到 rejected 中

```javascript
class MyPromise {
  constructor (executor) {
    // ...
    try {
      executor(resolve, reject);
    } catch (e) {
      reject(e)
    }
  }

  then(onFulfilled, onRejected) {
    // ...
    if (this.status === FULFILLED) {
      setTimeout(() => {
        try {
          onFulfilled(this.value);
        } catch (e) {
          reject(e);
        }
      }, 0);
    }

    if (this.status === REJECTED) {
      setTimeout(() => {
        try {
          onRejected(this.value);
        } catch (e) {
          reject(e);
        }
      }, 0);
    }

    if (this.status === PENDING) {
      this.onFulfilledCallbacks.push(() => {
        try {
          onFulfilled(this.value);
        } catch (e) {
          reject(e);
        }
      });
      this.onRejectCallbacks.push(() => {
        try {
          onRejected(this.reason);
        } catch (e) {
          reject(e);
        }
      });
    }
    // ...
  }
}
```
