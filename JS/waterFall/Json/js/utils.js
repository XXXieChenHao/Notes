
// 防抖  每一次进入都判断时间是否满足 不满足则刷新定时器，重新等待
// 执行一次 delay时间内不再执行 或最后一次触发的 delay 时间后再执行一次
function debounce(callback, delay, triggle) {
  var t = null;
  var debounced = function () {
    var _self = this,
      args = arguments;
    console.log(args)
    // 清空定时器 阻断执行
    if (t) {
      // 清空定时器 t 不为空, t 存储定时器的 id
      clearTimeout(t);
    }
    // 首次执行
    if (triggle) {
      var exec = !t;

      // 为 t 添加定时，防止 delay 时间内再次触发
      t = setTimeout(function () {
        t = null;
      }, delay)

      // 如果 t 不存在, 则执行
      if (exec) {
        callback.apply(_self, args)
      }
    } else {
      t = setTimeout(function () {
        callback.apply(_self, args)
      }, delay)
    }
  }

  debounced.remove = function () {
    clearTimeout(t);
    t = null;
  }

  return debounced
}

// 节流
// delay 时间内只执行一次

function throttle(callback, delay) {
  var t = null,
    begin = new Date().getTime();

  return function () {
    var _self = this,
      args = arguments,
      cur = new Date().getTime();

    // 阻断执行
    clearTimeout(t);

    // 已超过 delay 时间
    if (begin - cur >= delay) {
      callback.apply(_self, args);
      begin = cur;
    } else {
      t = setTimeout(function () {
        callback.apply(_self, args);
      }, delay)
    }

  }
}

function getScrollTop(){
  　　var scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0;
  　　if(document.body){
  　　　　bodyScrollTop = document.body.scrollTop;
  　　}
  　　if(document.documentElement){
  　　　　documentScrollTop = document.documentElement.scrollTop;
  　　}
  　　scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
  　　return scrollTop;
  }

  function getScrollHeight(){
  　　 var scrollHeight = 0, bodyScrollHeight = 0, documentScrollHeight = 0;
  　　 if(document.body){
  　　　　bodyScrollHeight = document.body.scrollHeight;
  　　 }
  　　 if(document.documentElement){
  　　　　documentScrollHeight = document.documentElement.scrollHeight;
  　　 }
  　　 scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
  　　 return scrollHeight;
  }

  function getWindowHeight(){
  　　 var windowHeight = 0;
  　　 if(document.compatMode == "CSS1Compat"){
  　　　　windowHeight = document.documentElement.clientHeight;
  　　 }else{
  　　　　windowHeight = document.body.clientHeight;
  　　 }
  　　 return windowHeight;
  }