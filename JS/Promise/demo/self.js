
const PENDING = 'pending',
  FULFILLED = 'fulfilled',
  REJECTED = 'rejected';

class MyPromise {
  constructor(executor) {
    this.status = PENDING;    // 初始化处于 pending 状态
    this.value = undefined;   // 定义 fulfilled 状态的 value
    this.reason = undefined;  // 定义 rejected 状态的 reason

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

    executor(resolve, reject);
  }

  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
    onRejected = typeof onRejected === 'function' ? onRejected : reason => reason;

    // 只有当完成时调用
    if (this.status === FULFILLED) {
      onFulfilled(this.value)
    }
    // 只有当失败时调用
    if (this.status === REJECTED) {
      onRejected(this.value)
    }
  }
}

module.exports = MyPromise