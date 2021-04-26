# 函数式编程
> JavaScript 中的 “一等公民” --> 函数

前端开发体系
- 函数式编程
- 面向对象开发
- 设计模式

### 在 JavaScript 中的函数

第一级函数  First class Function
- 函数声明
  ```javascript
  function test() {
    // ...
  }
  ```
- 调用
  ```javascript
  test();
  ```
- 赋值
  ```javascript
  var test2 = function() {
    // ...
  }
  ```
- 传参
  ```javascript
  function add(a, b) {
    return a + b;
  }

  function munis(a, b) {
    return a - b;
  }

  function compute(a, b, fn) {
    console.log(fn(a, b))
  }

  compute(5, 6, add);
  ```
- 返回
  ```javascript
  function fun(a, b, fn){
    return fn(a, b)
  }
  fun(1, 2, function(a, b) {
    return a + b
  })
  ```
- 构造函数
  ```javascript
  function Compute (a, b) {
    this.a = a;
    this.b = b;

    this.add = function() {
      return this.a + this.b;
    }
  }

  var compute = new Compute(7, 13);
  console.log(compute.add());
  ```
- 立即执行
  ```javascript
    var test = (function() {
    function Compute (a, b) {
      this.a = a;
      this.b = b;

      this.add = function() {
        return this.a + this.b;
      }
    }

    return new Compute(7, 13);
  })();
  console.log(test.add())
  ```

### JavaScript 编程特点
- 灵活性：函数式编程和面向对象的混编语言
- 可扩展性：弱类型语言，变量的声明不以数据类型为基础，任何的声明都是类型不确定的

优点： 编程灵活
缺点： 不可控  
函数式编程在有限的能力下进行可控的编程

### 面向对象
1. 复杂的 this 指向， call/apply/bind
2. 对象访问本身属性带来的性能问题
3. 高度的程序体复用的情况下使用



### 函数式编程简介

#### 优点
  易读、易维护
#### 概念
  函数式第一类对象，不依赖其它对象独立存在
```javascript
// 并不是函数式编程
  var obj = {
    add: function() {
      // ...
    }
  }
```



## 一、友好的纯函数

#### 纯函数特点

  相同的输入得到相同的输出，不依赖且不影响外部环境，也不产生任何副作用。
  输出完全取决于输入

```javascript
var a = 1;
function test() {
  console.log(a);
}
test();
```
上述代码依赖外部环境且没有输入，所以并不是纯函数
```javascript
  function test(a) {
    console.log(a);
  }
  test(1);
```
这才是纯函数，有输入并且得到相同的答案，并不一定输出 a，而是一定的结果如
```javascript
  function test(a) {
    console.log(a + 1);
    console.log(a + '123');
  }
  test(1);
```
类似于数学中的 `y = f(x)`; 输入是什么就有一个相对应的输出。

**副作用**
只要与函数外部环境发生了交互就是副作用，只要有可能产生不好的结果或不确定的因素的任何行为都是副作用行为
例如： 
- 发送数据请求（依赖外界请求，且内部不确定）
- 改变外部作用域中的数据（外界被影响了）
- console.log()  （依赖外部控制台）
- DOM 操作 （依赖 DOM 节点）
- 数据存储 （localStorage、sessionStorage）

副作用并不一定产生问题，也许只是产生问题的可能性，或产生问题的诱因

```javascript
//  <input type="text" id="content">
//  <button id="btn"></button>
var conetnt = document.getElementById('content').value,
    oBtn = document.getElementById('btn');
oBtn.onclick = function() {
  var val = conetnt
  console.log(val) // 输出空  GO 时 content 为空
} 
```

函数提纯

```javascript
var a = 1;
function test() {
   return a - 1;
}
test();
//------------提纯-------------
function test(a) {
   return a - 1;
}
test(1);
```

splice 和 slice

```javascript
var arr1 = ['a', 'b', 'c', 'd', 'e'],
    arr2 = ['a', 'b', 'c', 'd', 'e'];

var spArr = arr1.splice(0, 3), // 副作用
    slArr = arr2.slice(0, 3); // 无副作用

console.log(arr1);	// ['d', 'e']
console.log(spArr);	// ['a', 'b', 'c']

console.log(arr2); 	// ['a', 'b', 'c', 'd', 'e'],
console.log(slArr); // ['a', 'b', 'c']
```

函数无法提纯也无所谓，能用纯函数尽量用纯函数。

```javascript
var obj = {
  a: 1,
  b: 2,
  c: 3
}

function test (obj) {
  obj.d = 4;
  return obj
}
console.log(test(obj));	
// 更改了原对象所以不纯  提纯的办法就是克隆
function deepClone(org, tar) {
  var tar = tar || {};
  var toStr = Object.prototype.toString;
  var arrType = '[object Arrat]';
  for (var key in org) {
     if (org.hasOwnProperty(key)) {
        if (typeof(org[key]) === 'object' && org[key] !== null) {
          tar[key] = toStr.call(org[key]) === arrType ? [] : {};
          deepClone(org[key], tar[key]);
        } else {
          tar[key] = org[key];
        }
     } 
  }
  return tar;
}

function test (obj) {
  var newObj = deepClone(obj, {});
  newObj.d = 4;
  return newObj
}

var obj = {
  a: 1,
  b: 2,
  c: 3
}

console.log(test(obj));	// {a: 1, b: 2, c: 3, d: 4}
console.log(obj);	// {a: 1, b: 2, c: 3}
```

#### 纯函数优点

##### 1. 可移植

```javascript
function compute(a, b, type) {
  if (typeof(a) === 'number' && typeof(b) === 'number') {
    switch(type) {
      case 'add':
        return a + b;
        break;
      case 'minus':
        return a - b;
        break;
      case 'mul':
        return a * b;
        break;
      case 'div':
        return a / b;
        break;
      default: 
        return a + b;
    }
  } else {
    return 'a 和 b 必须为数字'
  }
}
compute(1, 2, 'add');
// 无论移植到哪里都不受影响
```

##### 2. 可测试性

程序体的测试流程不需要多次测试，输出与输入一一对应

##### 3. 合理性

```javascript
function add() {
  var a = 1;
  	  b = 2;
  return a + b;
}
function minus(a, b) {
    return a - b;
}
minus(5, 3);
```

引用透明性，易读，一看就明白函数的意思。

##### 4. 并行执行

纯函数不依赖外部环境，理论上是可以同时运行。

竞争态现象，由于函数相互之间的执行顺序出现的矛盾

##### 5. 可缓存性

```javascript
function test(fn) {
  var cache = {};
  
  return function() {
      var args = JSON.stringify(arguments);
      cache[args] = cache[args] 
        ? cache[args] + '(来自缓存池水)'
    	: fn(arguments);
      return cache[args];
  }
}

var add = test(function(arguments) {
   var argLen = arguments.length,
       item,
       sum = 0;
  for (var i = 0; i < argLen; i++) {
    item = arguments[i];
    sum += item;
  }
  return sum;
});

console.log(add(1, 2));		// 3
console.log(add(1, 2));		// "3(来自缓存池水)"
console.log(add(1, 3));		// 4
console.log(add(1, 3));		// "4(来自缓存池水)"
```



**纯函数是在能够提纯的情况下使用，尽可能的写纯函数，但不能强求**



## 二、函数组合

> 饲养函数 compose

### 简单的函数组合使用

若干个纯函数、偏函数、科利华函数组合成一个新函数、形成数据传递，并实现一种有序执行的效果

#### 函数组合分析

```javascript
function toUpperCase(str) {
    return str.toUpperCase();
}

function exclaim(str) {
    return str + '!';
}
exclaim(toUpperCase('xichao'))

// ----------------------------
function toUpperCase(str) {
    return str.toUpperCase();
}

function exclaim(str) {
    return str + '!';
}

function compose(f, g) {		// 给 compose 函数传入两个函数作为参数
    return function(x) {		// 返回一个新的匿名函数并传入 x变量    
     	return f(g(x));			// compose 函数不直接执行 f函数 和 g函数   
    }							// 如果匿名函数不执行，则 内部 f(g(x)) 不执行
}
var fun = compose(exclaim, toUpperCase);	// fun 为返回的匿名函数 (并没有执行)
fun('xichao');		// 这里才执行 而且是按照左倾执行的 
```

上述代码的  f(g(x)) 叫做 左倾方式，自右向左执行 

- x ——> g(x) ——> f(g(x)的返回值)
- 一个函数内部传入一个参数，并且这个参数是函数执行，那么这个函数一定是左倾的

在 compose 传递参数时也是左倾，参数**从右至左**执行

函数组合像是一个从右向左的生产线，自右向左的数据流。结果数据的从右向左生产，按照顺序完成想要做的工作。



### 复杂一些的函数组合

#### 1. 多个函数如何组合

```javascript
function toUpperCase(str) {
    return str.toUpperCase();
}

function exclaim(str) {
    return str + '!';
}

function split(str) {
    return str.split('');
}

function reverse(str) {
    return str.reverse();
}

function join(str) {
    return str.join('-')
}

function compose() {
 // 使用 argumnets 伪数组
  var args = Array.prototype.slice.call(arguments),	 // 将伪数组具备数组的方法
      len = args.length - 1;	// 最后一项的索引值，想要找到第一个执行的函数
  return function(x) {
    // return f(g(x))
    // 最后一个参数代表的函数执行 将结果返回给 res 然后执行倒数第二个
    var res = args[len](x);	// 获取 g(x); 的结果
    
    while(len--) {  	// len === 0 时停止	先-- 后执行内部代码
     // 每减一都向前执行一个函数
      res = args[len](res); 	// 每一次保存结果并传入前一个方法中
    }
    
    return res;
  }
}

var fun = compose(exclaim, join, reverse, split, toUpperCase);
```

#### 2. 使用 reduce 优化

```javascript
arr.reduce(function(prev, item, index, arr){
  // prev 上一次执行结果，如果是第一是如果有 initcalValue 则为 initcalValue 否则为数组第一项
}, initicalValue)
```

- reduceRight 与 reduce 功能相同但 reduceRight 是逆向遍历
- 如果想要使用 reduce 实现则可以在传参是按照从左向右执行顺序传参
- 一般使用 reduceRight 是因为函数组合常用规范都是从右向左

```javascript
function toUpperCase(str) {
  return str.toUpperCase();
}

function exclaim(str) {
  return str + '!';
}

function split(str) {
  return str.split('');
}

function reverse(str) {
  return str.reverse();
}

function join(str) {
  return str.join('-')
}

function compose() {
  var args = Array.prototype.slice.call(arguments);	 // 将伪数组具备数组的方法
  return function(x) {
    // return args.reduceRight(function(prev, item) { 
    // 将 item 改为 callback, prev 改为 res 比较形象 没有任何影响
    return args.reduceRight(function(res, callback) { 
        return callback(res);
    }, x);
  }
}
var fun = compose(exclaim, join, reverse, split, toUpperCase);
```



### 函数组合结合律 （Associativity）

借用上述代码

```javascript
var fun1 = compose(exclaim, join, reverse, split, toUpperCase);
var fun2 = compose(compose(exclaim, join, reverse), split, toUpperCase);
var fun3 = compose(exclaim, join, compose(reverse, split, toUpperCase));

console.log(fun1('xichao'));
console.log(fun1('xichao'));
console.log(fun1('xichao'));
// 输出结果一摸一样   O-A-H-C-I-X!
```

**定义 **

在组合函数的参数中再进行函数的分组组合，都不会影响最后的结果，与原来的函数结果一摸一样



## 高阶函数



### 什么是高阶函数

```javascript
function add(a, b, fn) {
  return fn(a) + fn(b);
}

function square(x) {
  return Math.pow(x, 2)
}

console.log( add(3, 5, square) );
```

JavaScript 函数实际上是指向一个变量

- 无论是**函数声明**还是**函数表达式**实际上都指向一个变量

```javascript
function fun2(){}	 // 函数声明
var fun = function() {}  // 函数表达式
```

- 函数参数一定接收变量（形参）

一个函数 就可以接收另一个函数作为变量



#### 高阶函数的定义

一个函数接收另一个函数作为参数变量，作为参数的这个函数就是高阶函数

如上述代码中的 `square`函数



#### 高阶函数举例

1. 匿名函数作为参数

```javascript
setTimeout(function() {
  // ...
}, timeout);
// 将匿名函数作为参数传入 setTimeout 中 
```

2. 函数声明作为参数

```javascript
var arr = [1, 2, 3, 4, 5];
function addOne(item) {
    return item + 1;
}
var newArr = arr.map(addOne)	
```

数据处理函数 如    map...

归纳函数如   reduce...

回调函数 一个方法完成后的回调程序



#### 并不一定高阶就好

**注意** 当一个函数仅仅作为调用使用时，是没有意义的，在函数式编程中避免此类现象

不能为了高阶函数使用高阶函数，为了归类而归类。

```javascript
var test1 = function(a, b) {
  return test2(a, b);
}
function test2(a, b) {
  return a + b;
}
var res = test1(1, 2);
// --------------------------
var test1 = function(a, b, fn) {
  return fn(a, b);
}
function test2(a, b) {
  return a + b;
}
var res = test1(1, 2, test2);
// --------------------------
function test2(a, b) {
  return a + b;
}
var res = test2(1, 2);
```

避免高阶函数影响了本来简单的正常开发

```javascript
var test = function(fn) {
  return doSth(function(data) {
    return fn(data);
  })
}

function doSth(fn) {
  // ...
  fn();
}

// 实际上与下方代码效果一致
var test = function(fn) {
   // ...
   fn(data);
}
```



### 柯里化

> 柯里化是一种函数式编程的思想

#### 什么是柯里化

在计算机科学中，柯里化把接受多个参数的函数变换成接受一个单一参数（最初函数的第一个参数）的函数，并且返回接受余下的参数而且返回结果的新函数的技术

*当你的参数没有传够之前，通过柯里化技术再返回新的函数再执行，直到参数传完*

#### 柯里化的优点

1. 简化代码

   将很多逻辑处理封装起来，只需要传参

2. 提高维护性

   柯里化总是在返回新的函数，都在一个函数体里产生，逻辑性更强

3. 功能单一化

4. 延迟执行



- 功能内聚

- 降低耦合

- 降低冗余


- 提高代码适应性



柯里化 Currying      柯里函数 Currying Function

### 柯里化的实现

一个函数有固定的参数，比如 3个

```javascript
function add(a, b, c) {
  return a + b + c;
}
test(1, 2, 3);
// --------------柯里化
var add2 = curry(add, 1);
var res = curry(add2(2, 3))

```





  



