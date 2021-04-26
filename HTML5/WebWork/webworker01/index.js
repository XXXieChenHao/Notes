var onmessage = function (e) {
  console.log(`接受到了数据：${e.data}`)
  setTimeout(() => {
    console.log('异步执行')
  }, 2000)
}