var now = new Date().getTime();
var obj = {};
for(var i = 0; i < 10000; i++) {
  obj[i] = i;
  console.log(obj[i])
}
var curr = new Date().getTime();

console.log(curr - now)