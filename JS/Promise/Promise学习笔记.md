# Promise 学习

<br />

## 异步流程化
**所谓异步流程化就是异步是各干各的互不相干的，但有时需要按照一定的顺序进行执行**
一个数字通过 getResult 方法**按顺序**进行加减乘除操作(假设都是异步函数)，打印每一步结果
每一步都需要依赖上一步执行后的数据，所以形成了一定的顺序

```javascript
function getResult(num) {              // 3
  add(num, function (data1) {          // 3 + 12
    console.log(data1);	               // 15
    sub(data1, function (data2) {      // 15 - 6
      console.log(data2);              // 9
      div(data2, function (data3) {    // 9 / 3
        console.log(data3);            // 3
        mul(data3, function (data4) {  // 3 * 10
          console.log(data4);          // 30
          // ... 操作足够多后形成回调地狱
        })
      })
    })
  })
}

function add(num, cb) {
  cb(num + 12);
}
function sub(num, cb) {
  cb(num - 6);
}

function div(num, cb) {
  cb(num / 3);
}

function mul(num, cb) {
  cb(num * 10);
}

getResult(3);
```

## promise 简介
Promise 是一种解决异步流程化的手段，这是 Promise 的意义，并不是为了解决回调地狱而存在的

**从英文角度分析清晰明了**

| 关键字  |   译文   |
| :-----: | :------: |
| Promise |  承诺| 
| resolve |  实现承诺 解决问题| 
| reject  |  拒绝承诺 承诺石沉大海| 
| pending |  苦苦等待 承诺等待结果中...| 


## Promise 构造函数
Promise 是一个构造函数, 需要 new

### 参数
- excutor 执行器 （new Promise 时调用） 
执行器有两个函数参数分别为
  - resolve 【函数】
  - reject  【函数

### 返回值
Promise 是一个构造函数，需要 new 使用, 在 new Promise 时会返回一个Promise 对象

### 语法
<br />

```javascript
let promise = new Promise((resolve, reject) => {})
promise.then(res => {
  // res 用来接收 Promise 中 resolve 执行的结果
}).catch(err => {
  // err 用来接收 Promise 中 reject 执行的结果
})
```


## Promise 方法
> Promise 基本使用

### executor 执行器
<br />
```javascript
let promise = new Promise((resolve, reject) => {
  console.log('1');
})
console.log('2');
```
代码中先输出 1， 然后输出 2，证明在 new Promise 时 executor 是同步执行的

### then方法
<br />

```javascript
let promise = new Promise((resolve, reject) => {
  resolve();
})

promise.then(res => {
  console.log('Then');
})

console.log('Global');
```
先输出 Global ，然后执行输出 Then，证明 then 方法是异步执行的，then 方法的执行需要等待 excutor 中执行resolve 或 reject 方法调用。

**穿透处理**
```javascript
let promise = new Promise((resolve, reject) => {
  reject('错误');
})
promise.then((res) => {
  console.log(1);
}).then(() => {

}).then(() => {

}, (err) => {
  console.log('then', err);
}).catch(err => {
  console.log('catch', err);
})
```
错误如果没有处理，就会一直向下穿透，直至被处理，如果 then 都没有处理，最终会被 catch 捕获

### Promise 状态
promise 对象的默认状态是 pending ，无论是 resolve 或是 reject 都是将promise的状态由pending 改变成为另一种，

- pending --> resolved
- pending --> rejected
  - 状态无法从 resolved 或是 rejected 重新回到 pedning 状态
- resolved 与 rejected 之间也无法
通俗的说法就是 一个承诺要么实现要么没有实现，不能从已经实现或是没有实现变为等待的过程，也不能实现，没实现之间反复切换。


## promise 解决回调地狱
> Node 环境

`./data/`下有三个文件 User.json、UserCouse.json、Course.json
```javascript
// User.json
[{
  "id": 1,
  "username": "xichao"
}, {
  "id": 2,
  "username": "zs"
}, {
  "id": 3,
  "username": "ls"
}, {
  "id": 4,
  "username": "ww"
}]

// Course.json
[{
  "id": 1,
  "name": "HTML"
}, {
  "id": 2,
  "name": "JavaScript"
}, {
  "id": 3,
  "name": "css"
}, {
  "id": 4,
  "name": "vue"
}, {
  "id": 5,
  "name": "react"
}]

// UserCourse.json
[{
  "uid": 1,
  "courses": [
    1,
    4,
    2,
    3,
    5
  ]
}, {
  "uid": 2,
  "courses": [
    1,
    3
  ]
}, {
  "uid": 3,
  "courses": [
    3,
    5
  ]
}]
```
获取 User.json 中的 id ，通过 id 到 UserCourse.json 中找到对应的 course 数据，然后再从 Course.json 中获取相应的数据存储到以用户名为文件名的 json 中
```javascript
const fs = require('fs');

let uid = 1;

fs.readFile('./data/user.json', 'utf8', function (err, data) {
  const userData = JSON.parse(data),
          userInfo = userData.filter(item => item.id === uid)[0];
          // 取出了用户信息
  fs.readFile('./data/userCourse.json', 'utf8', function(err, data) {
    const userCourseData = JSON.parse(data),
          userId = userInfo.id,
          userCourse = userCourseData.filter(item => item.uid = userId)[0];
          // 取出了课程信息
    fs.readFile('./data/Course.json','utf8', function(err, data) {
      const courseData = JSON.parse(data),
            userCourses = userCourse.courses;
            // 获取到了 课程数据，与用户数据，取出对应的中文
      let _arr = [];
      userCourses.map(id => {
        courseData.map(item => {
          if(id === item.id) {
            _arr.push(item.name);
          }
        })
      })
      
      const userCourseInfo = {
        username: userInfo.username,
        courses: _arr
      }
      // 写入文件
      fs.writeFileSync(`./data/${userInfo.username}.json`, JSON.stringify(userCourseInfo));
    })  
  })
})
```
使用回调函数不可避免地嵌套导致代码阅读困难，条例不够清晰。
使用 Promise 解决

```javascript
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
        userInfo = resData.filter(item => item.id === uid)[0];
        // 拿到用户信息
  return readFile('./data/UserCourse.json', userInfo);
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

  fs.writeFileSync(`./data/${prevData.username}.json`, JSON.stringify(userCourseInfo));
}).catch(err => {
  console.log(err);
})
```

## Promise 语法糖
return Promise.resolve() 或 return Promise.reject()
相当于 return Promise((resolve, reject) => { resolve()})
```javascript
const fs = require('fs');

function readFile(path, isSetError) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', function(err, data) {
      if (err || isSetError) {
        reject('promise失败');
      }
      resolve(JSON.parse(data));
    })
  })
}

readFile('./data/user.json').then(res => {
  return Promise.resolve('成功')
  // return Promise.reject('失败')
}).then(res => {
  console.log(res); // 可以获取 '成功'
}).catch(err => {
  console.log(err);  // 得到 '失败'
})
```

## Promise All
用于多个异步任务并发运行，他的结果创建承诺之后使用，便于等待所有任务结果的完成
Promise.all 是 Promise 构造函数上的静态方法
### 参数
  - interable 类型的数据（可迭代的数据） Array Set Map
    - interable 内部元素传递的是 promise 对象集合，如果不是 promise 对象，直接 Promise.resolve(该数据)
    - 如果 interable 内部没有元素，则返回空数组
如果又一个 promise 是 rejected，整个实例的回调就是 rejected, 多个失败只返回第一个失败的结果
合并三个文件内部的内容唯一个数组，并且按照顺序排列，如果任何一个读取失败，则返回 rejected

```javascript
const fs = require('fs');

function readFile(path, isSetError) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', function(err, data) {
      if (err || isSetError) {
        reject('promise失败');
      }

      resolve(JSON.parse(data));
    })
  })
}

Promise.all([
  readFile('./data/user.json'),
  // readFile('./data/course.json'),
  readFile('./data/course.json', true),
  readFile('./data/userCourse.json')
]).then(res => {
  console.log(res);
}).catch(err => {
  console.log(err);
})

```

## Promise Race
哪一项先完成就返回哪一项的 promise 结果，无论 fullfilled 还是 rejected
常用于资源或接口的响应速度
### 参数
  - interable 类型的数据（可迭代的数据） Array Set Map
    - interable 内部元素传递的是 promise 对象集合，如果不是 promise 对象，直接 Promise.resolve(该数据)
    - 如果 interable 内部没有元素，则永远都是 pending 状态
```javascript
Promise.race([
  // readFile('./data/user.json'),
  readFile('./data/user.json', true),
  readFile('./data/course.json'),
  readFile('./data/userCourse.json')
]).then(res => {
  console.log(res);
}).catch(err => {
  console.log(err);
})
```
可以用于图片请求超时、测试多个接口速度等用途

## async/await
- async 是一个异步函数
- await 是 async 中的一个操作符（官方说法）

await 是一个操作符，等待一个 Promise 对象产出结果的操作手段，无论失败还是成功
await 的功能是暂停 async 函数的执行，等待 Promise 处理后的结果

```javascript
function getData(isSetError) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if(isSetError) {
        reject('失败');
      }
      resolve('成功');
    }, 1000);
  })
}


async function logData() {
  const data = await getData();
  // const data = await getData(true);
  console.log(data); // 成功
}
logData()
```
假如 Promise 处理结果是 rejected 则直接抛出异常，如果需要捕获，需要使用 try...catch
async 函数是通过一个隐式的 Promise 返回 pending 状态


**async 是当前这个异步函数与同一作用域下的程序是异步关系**
先输出 Global 后输出 logData中的输出
```javascript
logData();
console.log('Global);
```

await 的好处就是结果上清晰，逻辑上更优美，使异步函数像同步函数一样处理
如下，await 处理结果时是比 Promise then 好得多
```javascript
async function test() {
  const data1 = getData(1);
  const data2 = getData(data1);
  const data3 = getData(data2);
  const data4 = getData(data3);
  const data5 = getData(data4);
  return data5;
}
```

async/await 并没有代替 Promise，只是分工只能不同，在处理结果上 promise then也可以处理，但是没有 async/await 做的好，但是 async/await 是没有办法返回成 Promise 状态，只能等待 Promise 状态。
