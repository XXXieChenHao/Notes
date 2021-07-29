function People(name, height, weight) {
  // 成员属性 name height weight
  this.name = name;
  this.height = height;
  this.weight = weight;
  // 这个 this 就是类构造实例时的对象本身
}

People.prototype.intro = function() {
  console.log(
    'I am' + this.name + '. ' + this.height + 'tall. And' + this.weight + ' kilos'
  );
}

People.prototype.eat = function() {
  console.log('I am eat.')
}
People.prototype.sleep = function() {
  console.log('I will go to sleep')
}
People.prototype.drink = function() {
  console.log('I am drinking water');
}
var xch = new People('汐潮', 190, 80)
xch.intro()
xch.eat()
xch.sleep()

var zs = new People('张三', 160, 20)
zs.intro()
zs.eat()
zs.sleep()