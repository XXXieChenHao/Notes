function getData(isSetError) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if(isSetError) {
        reject('失败')
      }
      resolve('成功')
    }, 1000);
  })
}


async function logData() {
  const data = await getData()
  // const data = await getData(true)
  console.log(data)
}
logData()
// console.log('Global')