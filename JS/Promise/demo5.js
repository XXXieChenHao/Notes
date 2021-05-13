const fs = require('fs');

function readFile (path, isSetError) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', function(err, data) {
      if (err || isSetError) {
        reject('失败了~')
      }

      const resData = JSON.parse(data);
      resolve(resData)
    }) 
  })
}

// 哪一项先完成就返回哪一项的 promise 结果，无论 fullfilled 还是 rejected
Promise.race([
  // readFile('./data/user.json'),
  readFile('./data/user.json', true),
  readFile('./data/course.json'),
  readFile('./data/userCourse.json')
]).then(res => {
  console.log(res);
}).catch(err => {
  console.log(err)
})