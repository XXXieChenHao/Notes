// 函数声明
// function test() {
//   // ...
// }
// // 函数调用
// test();
// 函数表达式
// var test2 = function() {
//   // ...
// }

// test2();

// 函数参数
// function add(a, b) {
//   return a + b;
// }

// function munis(a, b) {
//   return a - b;
// }

// function compute(a, b, fn) {
//   console.log(fn(a, b))
// }

// compute(5, 6, add);

// 函数返回  函数也可以作为返回值
// function fun(a, b, fn){
//   return fn(a, b)
// }
// fun(1, 2, function(a, b) {
//   return a + b
// })

// 构造函数
// function Compute (a, b) {
//   this.a = a;
//   this.b = b;

//   this.add = function() {
//     return this.a + this.b;
//   }
// }

// var compute = new Compute(7, 13);
// console.log(compute.add())

// 立即执行函数
// var test = (function() {
//   function Compute (a, b) {
//     this.a = a;
//     this.b = b;

//     this.add = function() {
//       return this.a + this.b;
//     }
//   }

//   return new Compute(7, 13);
// })();
// console.log(test.add())


// function toUpperCase(str) {
//   return str.toUpperCase();
// }

// function exclaim(str) {
//   return str + '!';
// }

// function split(str) {
//   return str.split('');
// }

// function reverse(str) {
//   return str.reverse();
// }

// function join(str) {
//   return str.join('-')
// }

// function compose() {
//   var args = Array.prototype.slice.call(arguments);	 // 将伪数组具备数组的方法
//   return function(x) {
//     // return args.reduceRight(function(prev, item) { 
//     // 将 item 改为 callback, prev 改为 res 比较形象 没有任何影响
//     return args.reduceRight(function(res, callback) { 
//         return callback(res);
//     }, x);
//   }
// }
// var fun1 = compose(exclaim, join, reverse, split, toUpperCase);
// var fun2 = compose(compose(exclaim, join, reverse), split, toUpperCase);
// var fun3 = compose(exclaim, join, compose(reverse, split, toUpperCase));
// console.log(fun1('xichao'))
// console.log(fun1('xichao'))
// console.log(fun1('xichao'))

// function test(a, b, fn) {
//   return fn(a) + fn(b);
// }

// function square(x) {
//   return Math.pow(x, 2)
// }

// console.log(test(3, 5, square));
// var arr = [1, 2, 3, 4, 5];

// function addOne(item) {
//     return item + 1;
// }

// var newArr = arr.map(addOne)
// console.log(newArr)