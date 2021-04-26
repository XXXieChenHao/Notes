// 深拷贝
function deepClone(origin, target) {
  var tar = target || {};
  var toStr = Object.prototype.toString;
  var arrType = '[object Array]';   // 维护变量

  for (var key in origin) {
    // 判断是否为对象且不为 null
    if (typeof origin[key] === 'object' && origin[key] !== null) {
      // 判断数组或对象
      // 调用对象原型上的 toString 方法

      // 1. Object.prototype.toString.call(origin[key])
      tar[key] = toStr.call(origin[key]) === arrType ? [] : {};
      // 2. 使用 constructor 判断 构造函数是否为 Array 区分 对象和数组
      // tar[key] = origin[key].constructor === Array ? [] : {};

      deepClone(origin[key], tar[key]);
    } else {
      tar[key] = origin[key];
    }
  }

  return tar;
}


// forEach 源码
Array.prototype.myForEach = function (callback) {
  var arg = arguments[1] || window;
  var _arr = this;
  var len = _arr.length;

  for (var i = 0; i < len; i++) {
    callback.call(arg, _arr[i], i, _arr);
  }
}
// map 源码
// var new_arr = arr.map(function(item, index, _arr) {
//   return item
// }, obj)


// Array.prototype.myMap = function (callback, thisArg) {
//   var arg = thisArg || window;
//   var _arr = this;
//   var len = _arr.length;
//   var _newArr = [];
//   var _item;

//   for (var i = 0; i < len; i++) 
//   {
//     _item = deepClone(_arr[i]);
//     _newArr.push(callback.call(arg, _item, i, _arr));
//   }

//   return _newArr;
// }


// filter
// var res = arr.filter(function(item, index, _arr) {
//   console.log(this)
//   return item.age > 25
// }, obj)

Array.prototype.myFilter = function (callback) {
  var arg = arguments[1] || window;  // 可选指针
  var _arr = this;
  var len = _arr.length;
  var _newArr = [];
  var _item;

  for (var i = 0; i < len; i++) {
    // bind call apply   
    // call (thisArg, c1, c2, c3)
    // apply (thisArg, [c1, c2, c3])
    // bind (thisArg, [c1, c2, c3])
    // 深拷贝
    _item = deepClone(_arr[i]);

    // if (callback.apply(arg, [_item, i, _arr])) {
    //   _newArr.push(_item);
    // }
    
    // 三元运算符
    callback.apply(arg, [_item, i, _arr]) ?  _newArr.push(_item) : '';
  }

  return _newArr;
}

// every
// var res = arr.every(function(item, index, array) {
//   return item.age > 22;
// }, obj)

Array.prototype.myEvery = function(callback, thisArg) {
  var _arr = this;
  var _len = _arr.length;
  var _arg = thisArg || window;
  var flag = true;

  for (var i = 0; i < _len; i++) 
  {
    if (!callback.call(_arg, _arr[i], i, _arr)) {
      // 执行结果为 false
      flag = false;
      break;
    }
  }
  return flag;
}


// some
// var res = arr.some(function(item, index, array) {
//   return item.age > 10;
// }, obj)

Array.prototype.mySome = function(callback) {
  var _arg = arguments[1] || window;
  var _arr = this;
  var _len = _arr.length;
  var flag = false;

  for (var i = 0; i < _len; i++)
  {
    if(callback.call(_arg, _arr[i], i, _arr)) {
      flag = true;
      break;
    }
  }
  return flag;
}

// reduce
// var res = arr.reduce(function(accumulator, item, index, array) {
//   return item
// }, obj)
// console.log(res)

Array.prototype.myReduce = function(callback, initialValue) {
  var _arr = this;
  var _len = _arr.length;
  var _arg = initialValue ||  _arr[0];

  for (var i = 0; i < _len; i++) 
  {
    _arg = callback(_arg, _arr[i], i, _arr);
  }
  return _arg;
}

// reduceRight
// var res = arr.reduceRight(function(accumulator, item, index, array) {
//   return item
// }, obj)
// console.log(res)

Array.prototype.myReduceRight = function(callback, initialValue) {
  var _arr = this;
  var _len = _arr.length;
  var _arg = initialValue ||  _arr[0];

  for (var i = _len - 1; i >= 0; i--) 
  {
    _arg = callback(_arg, _arr[i], i, _arr);
  }
  return _arg;
}

// call
// xc.say.myCall()

Function.prototype.myCall = function(thisArg) {
  // function  自己的属性   原型链上的属性
  // thisArg 不传为 window   基本类型 包装成对象
  // Object 和 new Object() 的区别 ???
  thisArg = thisArg ? Object(thisArg) : window;
  thisArg.fun = this;

  var _arr = [];

  for (var i = 1; i < arguments.length; i++) 
  {
    _arr.push('arguments[' + i + ']')
  }
  var result = eval('thisArg.fun('+ _arr +')');
  // eval('thisArg.fun(arguments[1],arguments[2],arguments[3],arguments[4],arguments[5])');
  delete thisArg.fun;

  return result;
}


Function.prototype.myApply = function(thisArg, args) {
  thisArg = thisArg ? Object(thisArg) : window;
  thisArg.fun = this;
  var result = args ? eval('thisArg.fun('+ args +')') : thisArg.fun()  ;
  
  delete thisArg.fun;
  return result;

  // var result;
  // if (!args) {
  //   result = thisArg.fun();
  // } else {
  //   result = eval('thisArg.fun('+ args +')');
  //   // eval('thisArg.fun(1,2,3,4,5)')   -> thisArg.fun(1,2,3,4,5)
  // }
  // return result;
}

Function.prototype.myBind = function(thisArg) {
  thisArg = thisArg ? Object(thisArg) : window;
  thisArg.fun = this;

  return function() {
     thisArg.fun();
  }
}
