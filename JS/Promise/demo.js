// function doSth (t, cb) {
//   return function() {
//     if(--t === 0) {
//       cb();
//     }
//   }
// }

// let fn = doSth(4, logSth.bind(null, logSth2.bind(null, logSth3)));

// function logSth (cb) {
//   console.log('logSth');
//   cb();
// }

// function logSth2(cb) {
//   console.log('logSth2');
//   cb();
// }

// function logSth3() {
//   console.log('logSth3')
// }


// function doSth(t) {
//   return function() {
//     if(--t === 0) {
//       logSth(function () {
//         logSth2(function() {
//           logSth3();
//         })
//       })
//     }
//   }
// }


// let fn = doSth(4)

// fn();
// fn();
// fn();
// fn();




// $.ajax({
//   success (data1) {
//     $.ajax({
//       data: {
//         d: data1
//       },
//       success(data2) {
//         $.ajax({
//           data: {
//             d: data2ky
//           },
//           success(data3) {
//             $.ajax({
//               data: {
//                 d: data3
//               },
//               success (data) {
//                 // do something ...
//               }
//             })
//           }
//         })
//       }
//     })
//   }
// })

let promise = new Promise((resolve, reject) => {
  resolve('承诺实现')
  // reject('承诺失信')
})

// then 是异步调用
promise.then((res) => {
  console.log(res);
}, (err) => {
  console.log(err)
})

console.log('Global')