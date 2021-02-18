/**
 * @param 
 *  fn 回调
 *  time 延时时间
 *  triggleNow  true 首次执行 false 首次不执行
 */
function debounce(fn, time, triggleNow) {
  var t = null;
  var debounced =  function () {
    var _self = this,
        args = arguments;
    if (t) {
      clearTimeout(t);
    }

    if(triggleNow) {
      // 首次进入 t 为 null
      var exec = !t;

      // 在 time 时间内无法再次触发
      t = setTimeout(function() {
        // 时间过后 清空 t
        t = null;
      }, time);

      // 第一次不延迟
      if (exec) {
        fn.apply(_self, args);
      }
    } else {
      t = setTimeout(function() {
        fn.apply(_self, args)
      }, time)
    }
  }

  debounced.remove = function() {
    clearTimeout(t);
    t= null;
  }

  return debounced
}