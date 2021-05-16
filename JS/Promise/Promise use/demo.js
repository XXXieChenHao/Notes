// function getResult(num) {             // 3
//   add(num, function (data1) {         // 3 + 12
//     console.log(data1)                // 15
//     sub(data1, function (data2) {     // 15 - 6
//       console.log(data2)              // 9
//       div(data2, function (data3) {   // 9 / 3
//         console.log(data3)            // 3
//         mul(data3, function (data4) { // 3 * 10
//           console.log(data4)          // 30
//         })
//       })
//     })
//   })
// }

// function add(num, cb) {
//   cb(num + 12)
// }
// function sub(num, cb) {
//   cb(num - 6)
// }

// function div(num, cb) {
//   cb(num / 3)
// }

// function mul(num, cb) {
//   cb(num * 10)
// }

// getResult(3)

// -----------------------------------
// executor 同步
// let promise = new Promise((resolve, reject) => {
//   console.log('1');
// })
// console.log('2'); 

// -----------------------------------
// then 方法异步
// let promise = new Promise((resolve, reject) => {
//   resolve()
// })

// promise.then(res => {
//   console.log('Then')
// })

// console.log('Global')

// -----------------------------------
// let promise = new Promise((resolve, reject) => {
//   reject('错误')
// })
// promise.then((res) => {
//   console.log(1)
// }).then(() => {

// }).then(() => {

// }, (err) => {
//   console.log('then', err)
// }).catch(err => {
//   console.log('catch', err)
// })
// -----------------------------------