const http = require('http');
const qs = require('querystring');
var express = require('express')
var app = express()
var cors = require('cors')
app.use(cors())

const server = http.createServer((req, res) => {
  const result1 = [
    { img: 'img/1.jpg', width: "640", height: '771' },
    { img: 'img/2.jpg', width: "640", height: '275' },
    { img: 'img/3.jpg', width: "4000", height: '6000' },
    { img: 'img/4.jpg', width: "5258", height: '3740' },
    { img: 'img/5.jpg', width: "828", height: '466' },
    { img: 'img/6.jpg', width: "1920", height: '1080' },
    { img: 'img/7.jpg', width: "260", height: '195' },
    { img: 'img/8.jpg', width: "590", height: '629' },
    { img: 'img/9.jpg', width: "700", height: '577' },
    { img: 'img/10.jpg', width: "2150", height: '872' },
    { img: 'img/11.jpg', width: "650", height: '406' },
    { img: 'img/12.jpg', width: "1024", height: '768' },
    { img: 'img/13.jpg', width: "670", height: '446' },
    { img: 'img/14.jpg', width: "2560", height: '1600' },
    { img: 'img/15.jpg', width: "1152", height: '720' },
    { img: 'img/16.jpg', width: "400", height: '299' },
    { img: 'img/17.jpg', width: "850", height: '478' },
    { img: 'img/18.jpg', width: "1920", height: '1200' },
    { img: 'img/19.jpg', width: "150", height: '300' },
    { img: 'img/20.jpg', width: "640", height: '1138' },
  ]
  console.log('111')

  const result2 = [
    { img: 'img/21.jpg', width: "1080", height: '1920' },
    { img: 'img/22.jpg', width: "1024", height: '683' },
    { img: 'img/23.jpg', width: "800", height: '600' },
    { img: 'img/24.jpg', width: "330", height: '220' },
    { img: 'img/25.jpg', width: "1080", height: '786' },
    { img: 'img/26.jpg', width: "1000", height: '771' },
    { img: 'img/27.jpg', width: "500", height: '371' },
    { img: 'img/28.jpg', width: "940", height: '548' },
    { img: 'img/29.jpg', width: "1080", height: '719' },
    { img: 'img/30.jpg', width: "500", height: '370' },
    { img: 'img/31.jpg', width: "670", height: '471' },
    { img: 'img/32.jpg', width: "640", height: '394' },
    { img: 'img/33.jpg', width: "500", height: '389' },
    { img: 'img/34.jpg', width: "1000", height: '1000' },
    { img: 'img/35.jpg', width: "640", height: '565' },
    { img: 'img/36.jpg', width: "1632", height: '1224' },
    { img: 'img/37.jpg', width: "240", height: '320' },
    { img: 'img/38.jpg', width: "500", height: '368' },
    { img: 'img/39.jpg', width: "700", height: '500' },
    { img: 'img/40.jpg', width: "400", height: '300' }
  ]
  const url = req.url;
  let query = qs.parse(url.split('?')[1])
  if (query.pageNum <= 2) {
    res.end(JSON.stringify({
      code: 10001,
      data: query.pageNum == 1 ? result1 : result2,
      msg: 'success'
    }))
  } else {
    res.end(JSON.stringify({
      code: 10000,
      data: 'No Data',
      msg: 'success'
    }))
  }

})

server.listen(8888, () => {
  console.log('server is running at port 8888')
})