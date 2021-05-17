const MyPromise = require('./self.js');

let p = new MyPromise((resolve, reject) => {
  resolve('成功')
})