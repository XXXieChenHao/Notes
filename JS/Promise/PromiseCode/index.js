// Promise 是一个构造函数
// 构造函数的参数就是一个执行器，执行器的来给你个参数都是函数
// let promise = new Promise((resolve, reject) => {  // executor
//   // resolve('success');;
//   // reject('error')
//   // throw new Error('Exception error');
// });

// //  the then method 接收两个参数 onFulfilled 和 onRejected
// promise.then((value) => {
//   // resolve 是打印 value
//   console.log(value)
// }, (reason) => {
//   // reject 或者是 throw 时打印 reason
//   console.log(reason)
// })

// const MyPromise  = require('./MyPromise');
// let promise = new MyPromise((resolve, reject) => {  // executor
//   // resolve('success');
//   // reject('error')
//   // throw new Error('Exception error');

//   setTimeout(() => {
//     resolve('Success');
//   }, 2000);
// });

// promise.then((value) => {
//   // resolve 是打印 value
//   console.log('FulFilled1: ' +value)
// }, (reason) => {
//   // reject 或者是 throw 时打印 reason
//   console.log('Rejected1: ' + reason)
// })

// promise.then((value) => {
//   // resolve 是打印 value
//   console.log('FulFilled2: ' +value)
// }, (reason) => {
//   // reject 或者是 throw 时打印 reason
//   console.log('Rejected2: ' + reason)
// })


// Promise 链式调用特性
// let promise = new Promise((resolve, reject) => {
//   resolve('First resolve');
// });

// 通过 return 传递结果, 将结果传递到下一个 then 
// promise.then((value) => {
//   return value; // 传递普通值
// })
// .then((value) => {
//   console.log(value); // First resolve
// })

// 通过新的 promise resolve 结果
// promise.then((value)) => {
//   return new Promise((resolve, reject) => {
//     // resolve(value)

//     setTimeout(() => {
//       resolve(value)
//     }, 2000);
//   })
// })
// .then((value) => {
//   console.log(value); // First resolve
// })

// 通过新的 promise reject 原因
// promise.then((value) => {
//   return new Promise((resolve, reject) => {
//     // reject('Error')

//     setTimeout(() => {
//       reject('Error')
//     }, 2000);
//   })
// })
// .then((value) => {
//   console.log(value);
// }, (reason) => {
//   console.log('Rejected: ' + reason)  // Rejected: Error
// })

// then 失败的回调函数后 再 then 的结果
// promise.then((value) => {
//   return new Promise((resolve, reject) => {
//     // reject('Error')

//     setTimeout(() => {
//       reject('Error')
//     }, 2000);
//   })
// })
// .then((value) => {
//   console.log(value);
// }, (reason) => {
//   console.log('Rejected: ' + reason)    // Rejected: Error
//   // 没有 reutrn 则默认 return undefined
// })
// .then((value) => {
//   console.log('Fulfilled: ' + value)    // Fulfilled: undefined
// }, (reason) => {
//   console.log('Rejected: ' + reason)
// })

// then 中使用 throw new Error
// promise.then((value) => {
//   return new Promise((resolve, reject) => {
//     // reject('Error')

//     setTimeout(() => {
//       reject('Error')
//     }, 2000);
//   })
// })
// .then((value) => {
//   console.log(value);
// }, (reason) => {
//   console.log('Rejected: ' + reason)    // Rejected: Error
// })
// .then((value) => {
//   throw new Error('Throw Error');       // throw new Error 一定会走到下一个 then 的失败中
// })
// .then((value) => {
//   console.log(value)
// }, (reason) => {
//   console.log('Expection: ' + reason)   // Expection: Error: Throw Error
// })

// 通过 catch 捕获异常
// promise.then((value) => {
//   return new Promise((resolve, reject) => {
//     // reject('Error')

//     setTimeout(() => {
//       reject('Error')
//     }, 2000);
//   })
// })
// .then((value) => {
//   console.log(value);
// }, (reason) => {
//   console.log('Rejected: ' + reason)    // Rejected: Error
// })
// .then((value) => {
//   throw new Error('Throw Error');       // throw new Error 一定会走到下一个 then 的失败中
// })
// .then((value) => {
//   console.log(value)
// },
// // (reason) => {                        // promise 会找最近的失败的回调函数，如果存在则后续的捕获无效
// //   console.log('Then: ' + reason);
// // }
// )
// .catch((err) => {
//   console.log('catch: ' + err);         // catch: Error: Throw Error
//   return 'Catch Error';
// })
// .then((value) => {
//   console.log('Then: ' + value);        // Then: Catch Error
// })

// catch 在 Promise 的源码层面就是一个 then， Catch 也是遵循 then 的运行原则的

// 成功的条件
// then return 普通的 JavaScript value 
// then return 一个新的 promise 成功态的结果 value

// 失败的条件
// then return 一个新的 promise 失败态的原因 reason
// then 抛出异常 throw new Error

// promise 链式调用 
// 不像 jQuery 链式调用原理在函数内部返回 this，因为 then 本身不包含 this
// promise 链式调用实际上是 return new Promise
/**
 * promise.then((value) =>{
 * }) // return new Promise().then
 * .then((value) => { 
 * })
 */

// 
// let promise2 = promise.then((value) => {
//   return value;  // return 第一次返回的新的 Promise 结果
// }).then((value) => {
//   return value;   // return 第二次返回的新的 Promise 结果
// })

// let promise2 = promise.then((value) => {
//   return value;  // return 第一个返回的新的 Promise 结果
// })
// promise2 仍然是第一次 then 返回的新的 Promise 的结果
// promise2.then((value) => {
//   return value;
// })


// let promise1 = new Promise((resolve, reject) => {  // executor
//   resolve('Promise1');
//   // reject('error')
//   // throw new Error('Exception error');
//   // setTimeout(() => {
//   //   resolve('success')
//   // }, 1000);
// });

// let promise2 = promise1.then(res => {
//   return 1
// }, (reason) => {
//   return reason
// })

// promise2.then((value) => {
//   console.log(value)
// }, (reason) => {
//   console.log(reason)
// })


// const MyPromise  = require('./MyPromise');
// let promise1 = new MyPromise((resolve, reject) => {  // executor
//   resolve('Promise1');
// });


// let promise2 = promise1.then((value) => {
//   console.log(value)
//   return new MyPromise((resolve, reject) => {
//     resolve('new Promise resolve');
//   });
// }, (reason) => {
//   console.log(reason)
// })

// promise2.then(value => {
//   console.log(value)
// })

const MyPromise  = require('./MyPromise');
let promise1 = new MyPromise((resolve, reject) => {  // executor
  resolve('Promise1');
});


let promise2 = promise1.then((value) => {
  return new MyPromise((resolve, reject) => {
    setTimeout(() => {
      resolve(new MyPromise((resolve, reject) => {
        resolve(new MyPromise((resolve, reject) => {
          resolve('new Promise resolve');
        }));
      }));
    }, 1000);
  });
}, (reason) => {
  console.log(reason)
})

promise2.then().then().then().then().then(value => {
  throw Error('Error')
}, (reason) => {
  console.log(reason);
}).catch(e => {
  console.log(e)
})

