# Axios 文档阅读 （中英文对照版）

## 写在前面
本篇是作者在读取英文文档时进行的学习过程，翻译过程可能会存在不准确的情况，实属作者英文能力不精还不死心。另外本文会在读文档的过程中对原文中的一些点所产生的想法进行描述。
Axios 作为一个使用广泛的库常常应用于各种场景。所以抽出了时间专门的阅读一遍文档。
http://www.axios-js.com/docs/#axios

Promise based HTTP client for the browser and node.js
基于 Promise (期约) 的客服端和 NodeJs 的 HTTP 请求

## Features （特性）
- Make XMLHttpRequests from the browser
  - 从浏览器中生成 XMLHttpRequests 对象
- Make http requests from node.js
  - 从 node.js 中生成 http 请求
- Supports the Promise API
  - 支持 Promise 接口
- Intercept request and response
  - 拦截请求和响应
- Transform request and response data
  - 转换请求和响应的数据
- Cancel requests
  - 取消请求
- Automatic transforms for JSON data
  - 自动转换 JSON 格式数据
- Client side supports for protecting against XSRF
  - 客户端对 XSRF 保护的支持

## Browser Support (浏览器支持情况)
Chrome 支持
Firefox  支持
Safari   支持
Opera 支持
Edge  支持
IE11  支持

## axios API
Requests can be made by passing the relevant config to axios.
可以通过相关的设置传递给 axios 发送请求

### axios(config)
`axios(url[,config])` aixos 语法，如果第一个参数为字符串，则默认发送 GET 请求，如果为对象则根据相关设置再发送请求

```javascript
// Send a Get request   发送默认 get 请求
axios('url/getApi);

// Send a POST request 发送 post 请求
axios({
  method: 'post',
  url: '/url/postApi',
  data: {
    userName: 'xichao',
    age: 24
  }
})
// GET request for remote image 远程图片接收
axios({
  method:'get,
  url: '/url/imageApi',
  responseType: 'stream
}).then(res => {
  res.data.pipe(fs.createWriteStream('pic.jpg'))
})
```

### Request method aliases (请求方法别名)
For convenience aliases have been provided for all supported request methods.
为了方便使用，已经为所有支持的请求方法提供了别名
- axios.request(config)
- axios.get(url[, config])
- axios.delete(url[, config])
- axios.head(url[, config])
- axios.options(url[, config])
- axios.post(url[, data[, config]])
- axios.put(url[, data[, config]])
- axios.patch(url[, data[, config]])

注意
When using the alias methods `url`, `method`, and `data` properties don't need to be specified in config.
注意再使用别名方法时不需要在 config 中特别指定 url、mtehod、data 属性

### Concurrency
Helper functions for dealing with concurrent requests.
处理高并发请求的帮助者函数
axios.all(iterable)
axios.spread(callback)

有时可能会同时调用多个后台接口，从而产生高并发问题
```javascript
function fun1() {
  return axios.get(url);
}

function fun2() {
  return axios.post(url);
}

axios.all([fun1(), fun2()])
.then(axios.spread(function(res1, res2) {
  console.log(res1) // fun1 请求的返回值
  console.log(res2) // fun2 请求的返回值
})).catch(err => {
  // err 只会捕捉到一个
})
```
使用 axios.all 的方式可以同时发送多个请求，并且将全部请求的返回值进行包装。其实这个与 Promise.all 相同，无论是传入的参数还是进行的处理都相同，可以推断 axios.all 底层使用的也是 Promise.all 的方式，这样就不难理解高并发接口的调用了。在浏览器中预览时返回的数据也是在一起返还回的一种数组形式，所以 axios 又增加了一个 axios.spread() 方法方便我们按顺序取出对应的返回数据。另外需要注意如果其中一个出现了问题，则就会去执行 catch 方法进行对错误的捕获。

### create an instance （创建一个实例）
You can create a new instance of axios with a custom config.
你能使用自定义配置创建一个新的 axios 实例。

在我们使用 axios 的时候，axios本身存在一个实例，一般情况下这个实例已经够用了，但是有的项目中需要进行一些特殊的操作，比如： 特殊的拦截器、特殊的配置等等，如果使用共同的 axios 则会使维护起来比较麻烦，因此我们可以重新创建一个实例，根据需求进行一些特殊的差异性设置，实例与实例之间不受影响。

**语法**
`axios.create([config])`
语法中的 config 是一个可选参数，所以在不传入 config 时会创建一个默认的 axios 实例。
```javascript
const defaultInstance = axios.reate();  // 默认实例

const configInstance = axios.create({   // 个性化实例
  baseUrl: 'http://some-domain.com/api/',
  timeout: 1000,
  headers: {'X-Custom-Header': 'foobar'}
})
```
### Instance methods （实例方法）
The available instance methods are listed below.The specified config will be merged with the instance config.
下面列举了一些可用的实例方法。指定的配置将会与默认配置合并。
也就是说传入的配置优先级会大于默认配置。
- axios#request(config)
- axios#get(url[, config])
- axios#delete(url[, config])
- axios#head(url[, config])
- axios#options(url[, config])
- axios#post(url[, data[, config]])
- axios#put(url[, data[, config]])
- axios#patch(url[, data[, config]])
- axios#getUri([config])

### Request Config  (请求配置)
There are the available config options for making requests. Only the `url` is required. Requests will default to `GET` if `method` is not specified.
这时一些发出请求的可配置参数。只有 `url` 是必要的，如果请求的 `method` 配置项没有特殊指定则默认使用 `GET` 请求。
```javascript
{
  // 'url' is the server URL that will be userd for the request
  // url 是服务器的地址将会被用于请求。
  url: 'url',
  
  // 'method' is the request method to be userd when making the request
  // methods 是请求发送时的请求方法
  method: 'get', // default 默认

  // 'baseURL' will be prepended to 'url' unless 'url' is absolute.It can be convenient to set 'baseURL' for an instance of axios to pass relative URLs to methods of that instance.
  // baseURL 将会被添加到 url 前面除非 url 是绝对的。它能设置 baseURL 方便的为 axios 实例传递相对的 url 到实例方法中去。
  baseUrl: 'https://some-domain.com/api/',

  // 'transformRequest' allows changes to the request data before it is sent to the server.
  // transformRequest 允许改变请求的参数在发送到服务器之前

  // This is only applicable for request methods 'PUT', 'POST'， and 'PATCH'
  // 它只可用于 PUT、POST 和 PATCH 请求方法

  // The last function in the array must return a string or an instance of Buffer, ArrayBuffer, FormData or Stream.
  // 数组中最后的函数必须返回一个字符串或 Buffer实例、ArrayBuffer、FormData 或者 Stream 流。
  
  // You may modify the headers object
  // 你可以修改请求头对象 headers
  transformRequest: [function(data, headers) {
    // DO whatever you want to transform the data
    // 做任何你想改变数据的操作
    return data;
  }],

  // 'transformResponse' allows changes to the response data to be made before it is passed to then/catch
  // transformResponse 允许改变响应数据在传递给 then/catch 方法之前
  transformResponse: [function(dat) {
    // Do wahtever you want to transform the data
    // 做任何你想改变数据的操作
    return data;
  }],

  // 'headers' are custom headers to be sent
  // headers 是自定义发送的请求头
  headers: { 'X-Requested-With': 'XMLHttpRequest' },

  // 'params' are the URL parameters to be sent with the request
  // params 是与请求一起发送的 URL参数

  // Must be a plain object or a URLSearchParams object
  // 必须是一个普通对象或者是一个 URl 参数对象
  params: { ID: 12345 },

  // 'paramsSerializer' is an optional function in charge of serializing 'params'
  // paramsSerializer 是一个可选的方法用于序列化请求参数 params
  paramsSerializer: function(params) {
    return QS.stringify(params, {arrayFormat: 'baracketes'})
  },

  // 'data' is the data to be sent as the request body
  // Only applicable for request methods 'PUT', 'POST', and 'PATCH
  // When no 'transformRequest' is set, must be of one of the following types: 
  // -string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams
  // -Browser only: FormData, file, Blob
  // -Node only: Stream, Buffer

  // data 是发送 body 请求的参数。只支持 PUT、POST 和 PATCH 请求
  // 当没有设置 transformRequest 时一定要遵守下方类型之一
  // -字符串、普通对象、ArrayBuffer、ArrayBufferView, URLSearchParams
  // -浏览器只支持: FormData, file, Blob
  // -Node 只支持: Stream, Buffer
  data: { firstName: 'xichao' },

  // 'timeout' specifies the number of milliseconds before the request times out.
  // timeout  指定请求超时的毫秒数
  // If the request takes longer than 'timeout', the request will be aborted.
  // 如果请求任务时间超过了 timeout 则请求会被终止
  timeout: 1000,  // default is '0' (no timeout) 默认没有超时时间

  // 'withCredentials' indicates whether or not cross-site Access-Control requests should be mae using credentials
  // withCredentials 指示是否使用跨域请求，设置为 ture 则浏览器不拦截跨域
  withCredentials: false, // default

  // 'auth' indicated that HTTP Basic auth should be userd, and supplies credentials.
  // auth 指示 HTTP 应使用基本认证，并且提供凭证

  // This will set an 'Authorization' hreader, overwriting any existing 'Authorization' custom headers you have set using 'headers'.
  // 这将设置一个 Authorization 头覆盖现有的任意使用 'hreaders' 设置的自定义 Authorization
  auth: {
    username: 'xichao',
    password: 's00pers3cret'
  },

  // 'responseType' indicated the type of data that the server will respond with options are 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
  // responseType 指定了服务器返回的响应数据的类型，配置项有：arraybuffer、blob、document、json、text、stream
  responseType: 'json',   // default

  // 'responseEncoding' indicates encoding to use for decoding responses
  // Note: Ignored for 'responseType' of stream or client-side requests
  // responseEncoding 指定用于解码响应数据的编码
  // 注意：忽略 responseType 的 stream 或客户端请求
  responseEncoding: 'utf8', // default

  // 'xsrfCookieName' is the name of the cookie to user as a value for xsrf token
  // xsrfCookieName 是一个用于作为 xsrf 令牌的值的 cookie 名称
  xsrfCookieName: 'XSRF_TOKEN', // default

  // 'xsrfHeaderName' is the name of the http header taht carries the xsrf token value
  // xsrfHeaderName 是携带 xsrf 令牌的请求头的名称
  xsrfHeaderName: 'X-XSRF-TOKEN',

  // 'onUploadProgress' allows handling of progress events for uploads
  // onUploadProgress 允许进行上传进程的操作
  onUploadProgress: function(progressEvent) {
    // Do whatever you want with the native progress event
    // 做任何你想处理的本地进程事件
  },

  // 'onDownloadProgress' allows handling of progress events for downloads
  // onDownloadProgress 允许进行下载进程的操作
  onDownloadProgress: function(progressEvent) {
    // Do whatever you want with the native progress event
    // 做任何你想处理的本地进程事件
  },

  // 'maxContentLength' defines the max size of the http response content in bytes allowd
  // maxContentLength 声明了请求响应内容的最大字节数
  maxContentLength: 2000,

  // 'validateStatus' defines whether to resolve or reject the promise for a given HTTP response status code. IF 'validateStatus' returns 'true' (or is set to 'null' or 'undefined'), the promise will be resolved; otherwise, the promise will be rejected.
  // valudateStatus 会根据请求响应状态码设置期约的状态是解决还是拒绝。如果 validataStatus 返回 true （或者设置为 null 或者 undefined），期约将会被解决，否则期约将会被拒绝
  validateStatus: function(status) {
    return status >= 200 && status < 300; // default
  },

  // 'maxRedirects' defines the maximum number of redirects to follow in node.js.
  // If set to 0, no redirects will be followed.
  // maxRedirects 定义了在 node.js 中重定向 follow 的最大定向的数量
  // 如果设置为 0 则不会 follow 任何重定向
  maxRedirects: 5, // default

  // 'socketPath' defined a UNIX Socket to be used in node.js.
  // socketPath 定义了在 node.js 中使用 UNIX Socket
  // e.g. '/var/run/docker.sock' to send requests to the docker daemon.
  // 举例： '/var/run/docker.sock' 发送请求给守护进程
  // Only either 'socketPath; or 'proxy' can be specified. If both are specified, 'socketPath' is used.
  // 只能指定 socketPath 或 proxy, 如果两者都指定则使用 socketPath
  socketPath: null, // default

  // 'httpAgent' and 'httpsAgent' define a custom agent to be used when performing http and https requests, respectively, in node.js. This allows options to be added like 'keepAlive' that are not enabled by default.
  // 在 node.js 中， httpAgent 和 httpsAgent 分别定义了 http 和 https 请求执行时使用的自定义代理。允许像这样添加添加 keepAlive 默认没有启用。
  httpAgent: new http.Agent({ keepAlive: true }),
  httpsAgent: new http.Agent({ keepAlive: true }),

  // 'proxy' defined the hostname and port of the proxy server.
  // proxy 定义了一个代理的地址和端口号

  // You can also define your proxy using the convertional 'http_proxy' and 'https_proxy' environment variables. If you are using environment variables for your proxy configuration, you can also define a 'no_proxy' environment variable as a comma-sparated list of domains that should not be proxied.
  // 你也能可以使用传统的 http_proxy 和 https_proxy 环境变量来定义你的代理。如果你能使用环境变量，你也可以使用一个 no_proxy 环境变量逗号分割不应该代理的地址。

  // Use 'false' to disable proxies, ignoring environment variables.
  // 使用 false 禁止代理，忽略环境变量

  // 'auth' indicates that HTTP Basic auth shoule be used to connect to the proxy, and supplies credentials.
  // auth 表示应该使用 HTTP 基本验证来链接代理并且提供凭证

  // This will set an 'Proxy-Authorization' header, overwriting any existing 'Proxy-Authorization' custom headers you have set using 'headers'.
  // 这样会设置一个 Proxy-Authorization 头，覆盖任何现有存在的在 headers 中设置使用的 Proxy-Authorization 自定义头

  proxy: {
    host: '127.0.0.1',
    port: 9000,
    auth: {
      username: 'xichao',
      password: 'rapunz3l'
    }
  },

  // 'cancelToken' specifies a cancel token that can be used to cancel the request (see Cancellation section below for details)
  // cancelToken 指定一个取消凭证能被用于取消请求上。 (详情查看下面的取消请求部分)
  cancelToken: new CancelToken(function(cancel) {})
}
```

### Response Schema (响应模式)
The response for a request contains the following information.
请求的响应包含以下信息。
```javascript
{
  // 'data' is the response that was provieded by the server
  // data 是服务器提供的响应数据
  data: {},

  // 'status' is the HTTP status code from the server response
  // status 是服务器响应的 HTTP 状态码
  status: 200,

  // 'statusText' is the HTTP status message from the server response
  // statusText 是服务响应的 HTTP 状态信息
  statusText: 'OK',

  // 'headers' the headers that the server responded with All header names are lower cased.
  // headers 是服务器相应的所有报头的小写名称
  headers: {},

  // 'config' is the config that was provided to 'axios' for the request
  // config 是提供给 axios 的所有请求的配置项
  config: {},

  // 'request' is the request that generated this response
  // It is the last ClientRequest instance in node.js (in redirects) and an XMLHttpRequest instance the browser
  // request 是引发此响应的请求
  // 这是 node.js 中最后一个 ClientRequest 实例，（在重定向里） 和浏览器中的一个 XMLHttoRequest 实例
  request: {}
}
```
When using `then`, you will receive the response as follows:
当使用 then 时你可以接收到相应的数据如下
```javascript
axios.get('/user/12345')
  .then(function(response) {
    console.log(response.data);
    console.log(response.status);
    console.log(response.statusText);
    console.log(response.headers);
    console.log(response.config);
  })
```
When using `catch`, or passing a `rejection callback` as second parameter of `then`, the response will be available through the `error` object as explained in the `Handling Errors` section.
当使用 catch 或者调用 then 方法的第二个参数 rejection callback ，响应将得到一个错误对象像 Handling Errors 解释的那样。

### Config Defaults （配置默认值）
you can specify config defaults that will be applied to every request.
你能指定默认配置应用于所有请求

**Global axios defaults (全局的 axios 默认值)**

```javascript
axios.defaults.baseURL = 'https://api.example.com'; // 配置所有请求默认地址
axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;  // 设置验证标识符
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';  // 设置 post 请求的内容类型
```
**Custom instance defaults (自定义默认实例)**

```javascript
// Set config defaults when creating the instance
// 当创建是实例时设置默认配置
const instance = aixos.create({
  baseUrl: 'https://api.example.com'
});

// Alter defaults after instance has been created
// 创建实例后更改默认值
instance.defaults.headers.common['Authorization'] = AUTH_TOKEN;
```

**Config order of precedence (配置顺序优先级)**
Config will be merged with an order of precedence. The order is library defaults found in `lib/defaults.js`, then `defaults` property of the instance, and finally `config` argument for the request. The latter will take precedence over the former. Here's an example.
配置将会按照优先级顺序进行合并。优先级顺序从低到高是来自于 lib/defaults.js 中的配置，然厚实实例的默认配置，最后是请求是的配置参数。这里有一个例子
其实优先级的顺序可以认为是越精准优先级越高。
```javascript
// Create an instance using the config defaults provided by the library
// 创建一个使用库中提供默认值的实例
// At this point the timeout config value is '0' as is the default for the library
// 在这里超时时间是来自于库中的默认值 0
const instance = aixos.create();

// Override timeout default for the library
// 推翻库中默认超时时间
// Now all requests using this instance will wait 2.5 seconds before timing out
// 现在所有使用实例的请求豆浆等待 2.5s 在超时之前。
instance.defaults.timeout = 2500;

// Override timeout for this request as it's known to take a long time
// 重写此请求的超时时间，因为知道这个接口会花费很长时间。
instance.get('/longRequest', {
  timeout: 5000
});
```

2021年5月18日 未完待续