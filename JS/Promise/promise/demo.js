let promise = new Promise((resolve, reject) => {
    // resolve('fulfilled');
    reject('reject');
})

promise.then((res) => {
  console.log(res)
}, (err) => {
  console.log('then', err)
}).catch(err => {
  console.log('catch', err)
})

console.log('1')