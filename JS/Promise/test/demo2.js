const fs = require('fs');

function read(path, preData) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', function(err, data) {
      if (err) {
        reject(err);
      }

      const resData = JSON.parse(data);

      resolve({
        preData,
        resData
      })
    })
  })
}

let uid = 2;

read('./data/b.json')
  .then(res => {
    const { resData } = res,
    userInfo = resData.filter(item => item.uid === uid)[0];

    return read('./data/c.json', userInfo);
  }).then(res => {
    const {preData, resData} = res,
          userId = preData.uid,
          userCourse = resData.filter(item => {return item.uid === userId})[0];
    return read('./data/a.json', {
      username: preData.username,
      userCourse: userCourse
    })
  }).then(res => {
    const {preData, resData} = res,
          userCourses = preData.userCourse.course;
    let _arr = [];
    userCourses.map(id => {
      resData.map(item => {
        if (item.id === id) {
          _arr.push(item)
        }
      })
    })

    const userCourseInfo = {
      username: preData.username,
      courses: _arr
    }

    fs.writeFileSync(`./data/${preData.username}.json`, JSON.stringify(userCourseInfo))
  }).catch(err => {
    console.log(err)
  })