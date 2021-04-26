# Web Worker

## 了解 Web Workers

### 什么是 Web Workers
Web Workers 使应用程序可以独立于主线程的后台线程中，运行一个脚本操作，这样可以在独立线程中执行其他任务处理，从而主线程不会因此被阻塞/放慢。

Web Workers 使用构造函数创建一个 worker 对象，构造函数接收一个 JavaScript文件URL，这一文件就是 worker线程中运行的代码。

主线程与 worker线程相互之间可以发送消息以及接收消息，数据的交互方式为传递副本而不是直接共享数据，

worker 可以生成新的 worker ，这些 worker 与它们父页面的宿主相同，worker中可以发送请求。

web workers 包含很多种类的 worker
- worker 专用worker
- Shared Workers 可被不同的船体的多个脚本执行，如iFrames等，只要处于同一主域
- Service Workers 一般作为web应用程序、浏览器和网络（如果可用）之间的代理服务
- Chrome Workers 是一种仅适用于firefox的worker。
- 音频 Workers可以在网络worker上下文中直接完成脚本化音频处理.

## AbstractWorker
AbstractWorker 接口是一个定义适用于所有类型 worker 的属性和方法的抽象类，不可以直接使用。AbstractWorker
- 不继承任何属性
- 不会实现和继承任何方法
- 拥有 onerror

例如 Worker 或 ShareWorker等哦都继承了 AbstractWorker 的属性

### AbstractWorker.onerror 属性
此属性为 AbstractWorker 接口的一个事件处理函数，当 Worker的 error 事件并冒泡时执行

**语法**
设置 onerror 回调函数
```javascript
var myWorker = new Worker('worker.js')

myWorker.onerror = function() {
  console.log('这是 worker 中的一个 error')
}
```

## 构造函数 Worker()

<br / >

### 介绍
构造函数 Worker 创建一个 Worker 对象，该对象执行指定的 URL 脚本，这个脚本必须同源，否则将会抛出异常的 SECURITY_ERR

### Worker
一个可以由脚本创建的后台任务，任务执行中可以向床架这发送消息，创建一个`Worker`需要调用Worker构造函数，并且传入脚本 URL 地址。

### 语法
```javascript
  var myWorker = new Worker(url, options);
```
**参数**
- url 一个同源的被 worker 将执行的脚本文件地址，
- options(可选) 用于创建对象时设置选项属性的对象
  - type  指定 worker 类型的值 classic/module  默认classic
  - credentials  用于指定worker 凭证， omit/same-origin/include  未指定或type为classic 将使用默认值omit(不要求凭证)
  - name 用来表示 worker的scope的值，主要用于调试
**返回值**
  创建的 worker 实例化对象

### 属性
**Worker.onmessage**
此属性为 Worker 接口的一个事件处理函数，当消息事件发生时被调用，当子线程返回一条数据时执行

在主线程中需要似乎用 Worker.onmessage 监听，而在子线程中只需要定义 onmessage即可

**Worker.onmessageerror**
当 Worker 对象接收到一条无法被反序列化的消息时，messageerror 事件将被触发
同样在主线程中需要使用 Worker.onmessageerror 而在子线程中直接定义即可

**注意** 无论是 onmessage 还是 onmessageerror 都可以使用 addEventListener 添加监听
```javascript
   var myWorker = new Worker('url')
   myWorker.onmessage = function(e) {
     console.log('接收子线程传进来的参数')
   }
   myWorker.onmessageerror = function(e) {
     console.log('无法反序列化消息)
   }
  // -------------------------------------
  myWorker.addEventListener('message',function(e) {
    console.log('接收子线程传进来的参数')
  }
  myWorker.addEventListener('messageerror',function(e) {
    console.log('无法反序列化消息)
  }
```

### 方法
**postMessage**
Worker 接口的 postMessage 方法向 worker 的内部做哟关于发送一个消息，接受单个参数

1. 语法
```javascript
  myWorker.postMessage(message, transferList);
```

2. 参数
- message 发送的消息，如果想传递多个值可以使用数组
- transferList (可选) 一个可选的Transferable 对象得数据，用于传递所有权。

主线程
```javascript
  var myWorker = new Worker('url');
  myWorker.postMessage('我是主线程发送的数据);
  myWorker.onmessage = function(e) {
    console.log('主线程接收数据：'e.data);  // 打印子线程返回的消息
  }
```
子线程
```javascript
  var onmessage = function(e) {
    console.log('子线程接受数据:' + e.data);
    postMessage('子线程正在发送')
  }
```
运行结果:
子线程接受数据: 我是主线程发送的数据
主线程接收数据：子线程正在发送

**terminate**
Worker 接口的 terminate 方法用于立即终止 Worker 的行为，本方法并不会等待worker去完成它的剩余操作，worker 会被立刻停止

1. 语法
```javascript
  myWorker.postMessage(message, transferList);
```

2. 参数
- message 发送的消息，如果想传递多个值可以使用数组
- transferList (可选) 一个可选的Transferable 对象得数据，用于传递所有权。

主线程
```javascript
    var myWorker = new Worker('./index.js')
    myWorker.postMessage('发送数据');
    console.log('发送数据中')
    setTimeout(() => {
      myWorker.terminate();
    }, 1000);
```
子线程
```javascript
  var onmessage = function (e) {
    console.log(`接受到了数据：${e.data}`)
    setTimeout(() => {
      console.log('异步执行')
    }, 2000)
  }
```
运行结果:
  发送数据中
  接受到了数据：发送数据
如果注释 myWorker.terminate(); 则执行结果为
  发送数据中
  接受到了数据：发送数据
  异步执行

## 构造函数 SharedWorker()
SharedWorker 接口是一种特定类型的 worker，能够被多个浏览上下文（传够、iframes、workers）访问，它们具有不同的全局作用域

### 语法
```javascript
  var myWorker = new SharedWorker('url);
```