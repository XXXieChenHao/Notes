var person = {
  name: 'Xichao',
  hello: function (thing) {
    console.log(this.name + " says hello " + thing);
  }
}

var bind = function (func, thisValue) {
  return function () {
    return func.apply(thisValue, arguments);
  }
}

var boundHello = bind(person.hello, person);
boundHello("world") // "Xichao says hello world"