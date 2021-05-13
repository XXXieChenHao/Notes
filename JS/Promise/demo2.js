// 获取 User.json 中的 id ，通过 id 到 UserCourse.json 中找到对应的 course 数据，然后再从 Course.json 中获取相应的数据存储到以用户名为文件名的 json 中

const fs = require('fs');

let uid = 1;

fs.readFile('./data/user.json', 'utf8', function (err, data) {
  const userData = JSON.parse(data),
          userInfo = userData.filter(item => item.id === uid)[0];
          // 取出了用户信息
  fs.readFile('./data/userCourse.json', 'utf8', function(err, data) {
    const userCourseData = JSON.parse(data),
          userId = userInfo.id,
          userCourse = userCourseData.filter(item => item.uid = userId)[0]
          // 取出了课程信息
    fs.readFile('./data/Course.json','utf8', function(err, data) {
      const courseData = JSON.parse(data),
            userCourses = userCourse.courses;
            // 获取到了 课程数据，与用户数据，取出对应的中文
      let _arr = []
      userCourses.map(id => {
        courseData.map(item => {
          if(id === item.id) {
            _arr.push(item.name)
          }
        })
      })
      
      const userCourseInfo = {
        username: userInfo.username,
        courses: _arr
      }

      fs.writeFileSync(`./data/${userInfo.username}.json`, JSON.stringify(userCourseInfo))

    })  
  })
})