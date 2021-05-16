Promise A+规范与源码重写

## Promise A+规范
### Terminology （术语）
1. 'promise' is an object or function with a `then` method whose behavior conforms to this specification.
  - promise 是一个带有一个遵守规范的 `then` 方法的对象或者函数。
2. 'thenable' is an object or function that defines a `then` method.
  - thenable 是一个定义了 `then` 方法的对象或者函数。
3. 'value' is any legal JavaScript value (including undefined, a thenable, or a promise).
  - value 是一个合理的 JS 值 (包含 undefined，thenable 或者一个 promise)
4. 'exception' is a value that is thrown using the `throw` statement.
  - exception 是使用 `throw` 语句抛出的值。
5. 'reason' is a value that indicates why a promise was rejected.
  - reason 是一个指示一个承诺为什么被拒绝的值
### Requirements （要求）

**一、Promise States**
> 一个promise 必须处于三个状态中的一个: pending、fulfilled 或者 rejected

1. pending 时
  - 可能会转变为 fulfilled 或者 rejected 状态

2. fulfilled 时
  - 不能再转变为其他状态
  - 必须拥有一个不能改变的值
3. rejected
  - 不能再转变为其他状态
  - 必须拥有一个不能改变的原因

**注意：** 不能改变的值意味着(===),但不代表着深度的不可变（引用值的内部是可以变化的）

**二、The `then` Method**
一个 promise 必须提供一个 `then` 方法，可以去访问到 promise 当前或最终的值或者原因
一个 promise 的 `then` 方法接收两个参数
```javascript
promise.then(onFulfilled, onRejected)
```
1. `onFulfilled` 和 `onRejected` 都是可选的参数
  - 如果 `onFulfilled` 或 `onRejected` 不是函数，则会被忽略
2. 当 `onFulfilled` 是一个方法
  - 它一定被调用在 `promise` 的 fulfilled 状态时，并且 `promise` 的值作为它第一个参数，
  - 它一定不会在 `promise` 是 fulfilled 状态之前被调用
  - 它一定不会被调用超过一次
3. 当 `onRejected` 是一个方法
  - 它一定被调用在 `promise` 是 rejected 状态时，并且 `promise` 的原因作为它的第一个参数
  - 它一定不会在 `promise` 是 rejected 状态之前被调用
  - 它一定不会被调用超过一次
4. `onFulfiled` 或者 `onRejected` 只在执行环境堆栈仅包含平台代码时才可被调用
> onFulfilled or onRejected must not be called until the execution context stack contains only platform code
  - 也就是说实践中要确保 onFulfilled和 onRejected方法异步执行，且应该在 then方法被调用的那一轮 event loop 之后的新执行栈中执行
5. `onFulfilled` and `onRejected` 一定被调用作为一个没有 this 的函数，意味着不能被实例化
6. `then` 可以被多次调用，但要遵守以下规则
  - `promise` 是 fulfilled 状态，所有的各自的 `onFulfilled` 回调必须按照原来的调用顺序去执行 `then` 方法
    - `rejected` 也一样

## Promise 源码实现
```javascript
// 定义状态变量
const PENDING = 'PENDING',
      FULFILLED = 'FULFILLED',
      REJECTED = 'REJECTED';

// resolvePromise 对返回值进行判断进行处理
function resolvePromise(promise2, x, resolve, reject) {
  // 如果 promise2 与 x 引用是同一个对象，则抛出 TypeError 异常 Chaining cycle detected for promise #<Promise>
  if (promise2 === x) {
    return reject(new TypeError('Chaining cycle detected for promise #<MyPromise>'));
  }

  let called = false; // 是否调用标识

  // 如果 x 是一个 object 或是 function
  if ((typeof x === 'object' && x !== null) || (typeof x === 'function')) {
    // 防止数据劫持 x.then 时报错 Object.defineProperty(x, then, {
    //   get() {
    //     throw new Error
    //   }
    // })
    // 所以使用 try...catch.. 捕获异常则 reject
    try {
      // 判断 x.then 是不是一个函数,  Promise 一定包含一个 then 方法
      let then = x.then;

      if (typeof then === 'function') {  // Promise 
        then.call(x, (y) => {
          // 避免重复调用成功或是失败
          if (called) return;
          called = true;
          resolvePromise(promise2, y, resolve, reject);
        }, (r) => {
          if (called) return;
          called = true;
          reject(y);
        })
      } else {
        resolve(x); // 不是 Promise
      }
    } catch (e) {
      if (called) return;
      called = true;
      reject(e);
    } 
  } else {
    resolve(x)
  }
}
　
class MyPromise {
  constructor (executor) {
    // promise 中第一个状态一定是 pending，同时参数在 pending 状态是不明确的
    this.status = PENDING;
    this.value = undefined;
    this.reason = undefined;

    // 声明两个容器收集所有成功或者失败的函数
    this.onFulfilledCallbacks = [];
    this.onRejectCallbacks = [];

    // resolve 与 reject 为什么在这里声明？
    // 如果在 constructor 外声明，实际上定义在 prototype 上，从而使每一个实例化都继承的是同一个 resolve，但每一个 promise 的执行器里都应该有自己的 resolve 和 reject ，所以每次实例化都会声明这两个函数

    const resolve = (value) => {
      // 只有当状态为 pending 时 状态才会改变
      if (this.status === PENDING) {
        this.status = FULFILLED;
        this.value = value;

        // 发布  依次执行 promise.then
        this.onFulfilledCallbacks.forEach(fn => fn());
      }

    }

    const reject = (reason) => {
      // 只有当状态为 pending 时 状态才会改变
      if (this.status === PENDING) {
        this.status = REJECTED;
        this.reason = reason;

        this.onRejectCallbacks.forEach(fn => fn());
      }
    }

    // promise 的异常捕获实在 executor 时，所以封装时就捕获此阶段异常并且使用 reject 抛出，就可以在 then 的第二个方法中获取到
    try {
      // excutor 在 new 的时候立即执行，所以在 constructor 里调用并且传入两个函数
      executor(resolve, reject);
    } catch (e) {
      reject(e)
    }
  }

  // 声明 prototype 上的 then 方法
  // onFulfilled 或 onRejected 可能会返回一个 x 普通值或 promise 值,保存 x 是为了单独处理 x
  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value; 
    onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason};

    // then must return a prmise 
    // promise2 = promise1.then(onFulfilled, onRejected);
    let promise2 = new MyPromise((resolve, reject) => { 
      if (this.status === FULFILLED) {
        setTimeout(() => {
          try {
            let x = onFulfilled(this.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        }, 0); // 0 也是大于等于 4ms 的
      }
  
      if (this.status === REJECTED) {
        setTimeout(() => {
          try {
            let x = onRejected(this.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        }, 0);
      }
  
      // executor 同步执行，如果其中包含异步代码，则在 executor 执行完毕后状态仍然是 pending 状态，所以需要判断此时状态，进行异步代码处理
      if (this.status === PENDING) {
        // 订阅-发布模式 其实就是 函数定义和执行
        // 收集所有成功和失败的回调，在 constructor 中声明两个容器 onFulfilledCallbacks、onRejectCallbacks
        // 这一个过程就是订阅的过程，发布则应该在 resolve 或 reject 执行时发布
        // push 了一个箭头函数，当调用时直接调用箭头函数即可
        this.onFulfilledCallbacks.push(() => {
          try {
            let x = onFulfilled(this.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        });
        this.onRejectCallbacks.push(() => {
          try {
            let x = ponRejected(this.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        });
      }  
    });

    return promise2;
  }

  
  catch(errCallback) {
    return this.then(null, errCallback)
  }

}

module.exports = MyPromise;\]