const fs = require('fs');

function readFile(path, prevData) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', function(err, data) {
      if (err) {
        reject(err);
      }
      const resData = JSON.parse(data);
      resolve({
        prevData,
        resData
      })
    })
  })
}

let uid = 2;

readFile('./data/User.json')
.then(res => {
  const { resData } = res,
        userInfo = resData.filter(item => item.id === uid)[0]
        // 拿到用户信息
  return readFile('./data/UserCourse.json', userInfo)
    // 调用会 return 一个 promise ，return 返回的 promise，后面就又可以使用 .then 接收
}).then(res => {
  const { prevData, resData } = res,
        userId = prevData.id,   // prevData 是上一步返回的userInfo
        userCourse = resData.filter(item => item.uid === userId)[0];
        // 拿到课程信息
  return readFile('./data/course.json', {
    username: prevData.username,
    userCourse
  })      // 将后续使用的数据保存到 prevData 中
}).then(res => {
  const { prevData, resData } = res,
        userCourses = prevData.userCourse.courses;
        // 拿到用户课程信息
  let _arr = [];
  userCourses.map(id => {
    resData.map(item => {
      if(item.id === id) {
        _arr.push(item);
      }
    })
  })

  const userCourseInfo = {
    userInfo: prevData.username,
    courses: _arr
  }

  fs.writeFileSync(`./data/${prevData.username}.json`, JSON.stringify(userCourseInfo))      
}).catch(err => {
  console.log(err)
})