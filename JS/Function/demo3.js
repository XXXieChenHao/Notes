// function add(a, b, c) {
//   return a + b + c;
// }
// // add(1)(2)(3,4,5)(6)
// function curry(fn) {
//   // arguments 不确定长度
//   var arg_1 = [].slice.call(arguments, 1); // add 过滤掉了
//   return function() {
//     var args_2 = arg_1.concat([].slice.call(arguments));
//     // arguments 不确定长度
//     return fn.apply(this, args_2);
//   }
// }

// var add2 = curry(add, 1);
// var add3 = curry(add2(2))
// var add4 = curry(add3(3))


function curry(fn) {
  // 首先要知道形参有多长
  var _len = fn.length;

  // 如果参数没有传齐则每一次返回都必须是函数
  return function() {
    
  }
}

