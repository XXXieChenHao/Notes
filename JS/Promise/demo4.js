
// 合并三个文件内部的内容唯一个数组，并且按照顺序排列，如果任何一个读取失败，则返回 rejected
const fs = require('fs');

function readFile(path, isSetError) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', function(err, data) {
      if (err || isSetError) {
        reject('promise失败')
      }

      resolve(JSON.parse(data));
    })
  })
}

// readFile('./data/user.json').then(res => {
//   console.log(res)
// })

// readFile('./data/course.json').then(res => {
//   console.log(res)
// })

// readFile('./data/userCourse.json').then(res => {
//   console.log(res)
// })

// 构造函数上的一个方法，
// 接受一个 interable类型的数据 -> 可迭代的对象（Array Set Map)
Promise.all([
  readFile('./data/user.json'),
  readFile('./data/course.json', true),
  readFile('./data/userCourse.json')
]).then(res => {
  console.log(res)
}).catch(err => {
  console.log(err)
})

// 用于多个异步任务并发运行，他的结果创建承诺之后使用，便于等待所有任务结果的完成