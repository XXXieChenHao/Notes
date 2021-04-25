const fs = require('fs');

let uid = 1;

fs.readFile('./data/b.json', 'utf8', function (err, data) {
  const userData = JSON.parse(data),
        userInfo = userData.filter(item => item.uid === uid)[0];

  fs.readFile('./data/c.json', 'utf8', function (err, data) {
    const userCourseData = JSON.parse(data),
          userId = userInfo.uid,
          userCourse = userCourseData.filter(item => item.uid === userId)[0];

    fs.readFile('./data/a.json', 'utf8', function (err, data) {
      const courseData = JSON.parse(data);
            userCourses = userCourse.course;
      let _arr = [];

      userCourses.map(id => {
        courseData.map(item => {
          if(item.id === id) {
            _arr.push(item)
          }
        })
      })
      const userCourseInfo = {
        username: userInfo.username,
        course: _arr
      }

      console.log(userCourseInfo)
      fs.writeFileSync(`./data/${userInfo.username}.json`, JSON.stringify(userCourseInfo));

    })

  })
})