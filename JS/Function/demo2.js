// var test1 = function(a, b) {
//   return test2(a, b);
// }
// function test2(a, b) {
//   return a + b;
// }
// var res = test1(1, 2);
// console.log(res)


// var test1 = function(a, b, fn) {
//   return fn(a, b);
// }
// function test2(a, b) {
//   return a + b;
// }
// var res = test1(1, 2, test2);
// console.log(res)

var test = function(fn) {
  return doSth(function(data) {
    return fn(data);
  })
}

function doSth(fn) {
  // ...
  fn();
}

fn(data) === function (data) {return fn(data)}()

var test = function(fn) {
    // ...
    fn(data);
}