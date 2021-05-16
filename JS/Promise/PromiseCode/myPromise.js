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
            let x = onRejected(this.reason);
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

module.exports = MyPromise;