
class MyPromise {
  static PENDING = 'pending';
  static FULFILLED = 'fulfilled';
  static REJECTED = 'rejected';
  constructor(executor) {
    this.status = MyPromise.PENDING;
    this.value = undefined;
    this.callbacks = [];

    executor(this.resolve.bind(this), this.reject.bind(this));
  }

  resolve(value) {
    if (this.status === MyPromise.PENDING) {
      this.status = MyPromise.FULFILLED;
      this.value = value;

      setTimeout(() => {
        this.callbacks.map(callback => {
          callback.onFulfilled(this.value)
        })
      }, 0);
    }
  }

  reject(reason) {
    if (this.status === MyPromise.PENDING) {
      this.status = MyPromise.REJECTED;
      this.value = reason;
      setTimeout(() => {
        this.callbacks.map(callback => {
          callback.onRejected(this.value)
        })
      }, 0);
    }
  }

  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
    onRejected = typeof onRejected === 'function' ? onRejected : value => value;
    
    return new MyPromise((resolve, reject) => {
      if (this.status === MyPromise.FULFILLED) {
        setTimeout(() => {
          try {
            let result = onFulfilled(this.value)
            resolve(result)
          } catch (error) {
            reject('(in myPromise onFulfilled) ' + error);
          }
        }, 0);
      }

      if (this.status === MyPromise.REJECTED) {
        setTimeout(() => {
          try {
            let result = onRejected(this.value);
            resolve(result)
          } catch (error) {
            console.log(this.status)
            reject('(in myPromise onFulfilled1111) ' + error);
          }
        }, 0);
      }

      if (this.status === MyPromise.PENDING) {
        this.callbacks.push({
          onFulfilled: (value) => {
            try {
              let result = onFulfilled(value);
              resolve(result)
            } catch (error) {
              reject('(in myPromise) ' + error);
            }
          },
          onRejected: (reason) => {
            try {
              let result = onRejected(reason);
              resolve(result)
            } catch (error) {
              reject(error);
            }
          }
        })
      }
    })
  }
}