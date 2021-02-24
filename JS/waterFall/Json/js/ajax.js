; (function (win) {
  var xhr = new Object();
  xhr.ajax = function (options) {
    // 如果传入请求类型就按照请求类型，否则默认 get
    var type = options.type || 'get';

    // 传入请求地址 url
    var url = options.url;

    //数据是否存在如果存在调用 dataFormat 函数,
    var data = options.data ? getUrlencoded(options.data) : null;

    var success = options.success;      // 传入回调函数

    var xml = new XMLHttpRequest();     // 实例化对象

    // 使用三元，如果请求类型为 GET 则拼接参数
    xml.open(type, type === 'get' ? url + '?' + data : url);

    if (type === 'get') {
      xml.send();
    } else {
      // 如果请求参数不是 GET 则需要设置请求头，未考虑 FormDate 情况
      xml.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      xml.send(data);
    }

    xml.onreadystatechange = function () {
      if (xml.readyState === 4) {
        // 将 xml.responseText 作为实参传到 success 中函数
        success && success(xml.responseText);
        // 如果 success 存在 执行 success()
      }
    };

  };

  // 参数处理程序
  function getUrlencoded(data) {
    var arr = [];
    for (var k in data) {
      // 将参数拼接成 [参数1=值1，参数2=值2，...的数组]
      arr.push(k + '=' + data[k]);
    }
    // 调用数组 join 方法将数组拼接成  参数1=值1&参数2=值2...的字符串
    var result = arr.join('&');
    return result;
  }

  win.xhr = xhr
})(window);