// 1. 获取原型 [[GetPrototypeOf]]
var proto = Object.getPrototypeOf(obj) //
console.log(proto)  // 底层方法获取
console.log(obj.__proto__)  // 原型对象获取
console.log(Object.prototype)

// 2. 设置原型 [[SetPrototypeOf]]
// Object.setPrototypeOf(obj, { c: 3, d: 4 })
// obj.__proto__ = { e: 5, f: 6 }
// Object.prototype.g = 7
// console.log(obj)

// 3. 获取对象可扩展性 [[IsExtensible]]
// var extensible = Object.isExtensible(obj)
// // 是否可增加、修改、删除
// console.log(extensible) // true   可扩展
// Object.freeze(obj) // 冻结
// var extensible2 = Object.isExtensible(obj)
// console.log(extensible2) // false   不可扩展

// Object.seal(obj) // 封闭对象  可重写,不可修改,不可删除，可枚举
// obj.c = 3  // 不可修改
// console.log(obj)

// delete obj.a // 不可删除
// console.log(obj)

// obj.b = 3 // 可重写
// console.log(obj)
// for (var key in obj) {
//   console.log(obj[key])
// }


// Object.freeze(obj) // 封闭对象  不可重写,不可修改,不可删除,可枚举
// obj.c = 3  // 不可修改
// console.log(obj)

// delete obj.a // 不可删除
// console.log(obj)

// obj.b = 3 // 不可重写
// console.log(obj)
// for (var key in obj) {
//   console.log(obj[key])
// }

// 4. 获取自有属性 [[GetOwnProperty]]
// Object.setPrototypeOf(obj, { c: 3, d: 4 })
// console.log(Object.getOwnPropertyNames(obj)) // 获取自有属性 不会返回原型上的属性

// 5. 禁止扩展对象 [[PreventExtensions]]
// Object.preventExtensions(obj)
// obj.c = 3     // 禁止增加属性
// console.log(obj)

// obj.a = 10    // 可以修改属性
// console.log(obj)

// delete obj.b  // 可以删除属性
// console.log(obj)

// 6. 拦截对象操作 [[DefineOwnProperty]]
// Object.defineProperty(obj, prop, descriptor)

// 7. 判断是否是自身属性 [[HasProperty]]
// 只判断自身 不判断原型
// console.log(obj.hasOwnProperty('a')) // 返回布尔值

// 8. 获取[[GET]]
// console.log('a' in obj)
// console.log('c' in obj)
// console.log(obj.a)

// 9. 设置 [[SET]]
// obj.a = 3
// obj['b'] = 4
// console.log(obj)

// 10. 删除 [[Delete]]
// delete obj.a
// console.log(obj)

// 11. 枚举 [[Enumerate]]
// for (var key in obj) {
//   console.log(obj[key])
// }

// 12. 获取键集合 [[OwnPropertyKeys]] 
// 获取自有键
// console.log(Object.keys(obj))

// 13. 方法调用
// function test () { } test()
// obj.test = function () { }
// obj.test()
// test().call/apply

// 14 .
// function Test () { }
// new Test()