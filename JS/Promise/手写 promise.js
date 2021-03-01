class PROMISE {
  // promise 中的值是固定的 所以定义成静态属性
  static PENDING = 'pending'
  static FULFILLED = 'fulfilled'
  static REJECTED = 'rejected'

  // 构造函数
  constructor(executor) {
    console.log('进入构造器')
    this.status = PROMISE.PENDING
    console.log('设置状态为等待' + this.status)
    this.value = null
    console.log('设置数据为空' + this.value)
    this.callbacks = []
    console.log('设置方法为空数组' + this.callbacks)
    try {
      console.log('执行传入的方法')
      executor(this.resolve.bind(this), this.reject.bind(this))
    } catch (error) {
      this.reject(error)
    }
  }

  resolve (value) {
    console.log('对象中的resolve')
    console.log('判断promise状态是否为等待')
    if (this.status === PROMISE.PENDING) {
      this.status = PROMISE.FULFILLED   // 修改promise状态
      this.value = value  // 修改此时promise的结果
      console.log(this.callbacks)
      this.callbacks.map(callback => {   // 第一次没有 为什么？？？？？？  留一个问号
        setTimeout(() => {
          callback.onFulfilled(this.value)
        })
      })
      console.log('结束')
    }
  }

  reject (reason) {
    // 与上述resolve一样
    if (this.status === PROMISE.PENDING) {
      this.status = PROMISE.REJECTED
      this.value = reason
      console.log(this.callbacks)
      this.callbacks.map(callback => {
        setTimeout(() => {
          callback.onRejected(this.value)
        })
      })
    }
  }

  /**
   *  在调用时使用了  ** new Promise(()=>) **
   *  星号中间实际是一个实例化对象
   *  所以 new Promise(()=>).then
   *  相当于 对象.方法名  所以执行下面的代码
   */
  then (onFulfilled, onRejected) {
    console.log('我进入了then之中')

    if (typeof onFulfilled !== 'function') {
      // 判断是否传入  避免报错  自行生成一个 function
      onFulfilled = () => this.value  // then的穿透 避免没有传入函数时下面的then继续执行
    }
    if (typeof onRejected !== 'function') {
      onRejected = () => this.value
    }

    return new PROMISE((resolve, reject) => {
      // 对正常操作的处理
      // 对异常情况的处理
      console.log('我是return的promise')
      if (this.status === PROMISE.PENDING) {
        console.log(this.status)
        this.callbacks.push({
          // 对象属性
          onFulfilled: value => {
            // 函数
            try {k
              let result = onFulfilled(value)
              resolve(result)
            } catch (error) {
              reject(error)
            }
          },
          onRejected: value => {
            try {
              let result = onRejected(value)
              resolve(result)
            } catch (error) {
              reject(error)
            }
          },
        })
      }

      if (this.status === PROMISE.FULFILLED) {
        setTimeout(() => {
          try {
            let result = onFulfilled(this.value)
            if (result instanceof PROMISE) {
              result.then(value => {
                resolve(value)
              }, reason => {
                console.error(reason)
              })
            } else {
              resolve(result)
            }
          } catch (error) {
            reject(error)
          }
        })
      }
      if (this.status === PROMISE.REJECTED) {
        setTimeout(() => {
          try {
            let result = onRejected(this.value)
            resolve(result)
          } catch (error) {
            reject(error)
          }
        })
      }
    })
  }
}
//  用法
// new Promise((resolve, reject) => {
//  resolve('解决')
//  reject('拒绝)
// })