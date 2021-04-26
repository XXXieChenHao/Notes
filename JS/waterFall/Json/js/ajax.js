; (function(win) {
  var xhr = new Object();
  xhr.ajax = function (options) {
    var type = options.type || 'get';
    var url = options.url;

    var data = options.data ? getUrlencoded(options.data) : null;
    var success = options.success;      // 传入回调函数WWWW
    var xml = new XMLHttpRequest();     // 实例化对象

    xml.open(type, type === 'get' ? url + '?' + data : url);

    if (type === 'get') {
      xml.send();
    } else {
      xml.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      xml.send(data);
    }

    xml.onreadystatechange = function () {
      if (xml.readyState === 4) {
        success && success(xml.responseText);
      }
    };
  };

  // 参数处理程序
  function getUrlencoded(data) {
    var arr = [];
    for (var k in data) {
      arr.push(k + '=' + data[k]);
    }
    var result = arr.join('&');
    return result;
  }

  win.xhr = xhr;
})(window);