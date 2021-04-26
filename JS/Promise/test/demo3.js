// promise all 的用法
const fs = require('fs');

function read(path, isError) {
  return new Promise((resolve, reject) => {
    // readFile 异步  readFileSync 同步
    fs.readFile(path, 'utf8', function(err, data) {
      if (err || isError) {
        reject('失败');
      }
      const resData = JSON.parse(data);

      resolve(resData);
    })
  })
}

// read('./data/a.json').then(res => {
//     console.log(res)
// })
// read('./data/b.json').then(res => {
//     console.log(res)
// })
// read('./data/c.json').then(res => {
//     console.log(res)
// })

// 合并三个文件 按照顺序合并为一个数组
// 如果一个读取失败，让这个数据结合返回 rejected

// 构造函数上的方法  接受一个 interable（可迭代对象） 类型的数据
Promise.all([
  read('./data/b.json'),
  read('./data/c.json'),
  read('./data/a.json'),
]).then(res => {
  console.log(res)
})
// promise all 用于多个异步任务并发执行，他的结果创建于承诺之后，等待所有任务结果的完成
