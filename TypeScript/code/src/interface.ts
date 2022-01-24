// 接口初探
// function printLabel(labelledObj: { label: string }) {
//   console.log(labelledObj.label);
// }

// let myObj = { size: 10, label: "Size 10 Object" };
// printLabel(myObj);


// interface labelledObj {
//   label: string;
// }

// function printLabel(labelledObj: labelledObj) {
//     console.log(labelledObj.label);
//   }
  
// let myObj = { size: 10, label: "Size 10 Object" };
// printLabel(myObj);
  

// 可选属性
// interface SquareConfig {
//   color?: string;
//   width?: number;
// }

// function createSquare(config: SquareConfig): {color: string; area: number} {
//   let newSquare = {color: "white", area: 100};
//   if (config.color) {
//     newSquare.color = config.color;
//   }
//   if (config.width) {
//     newSquare.area = config.width * config.width;
//   }
//   return newSquare;
// }

// let mySquare = createSquare({color: "black"});

// 只读属性

// interface Point {
//   readonly x: number;
//   readonly y: number;
// }

// let p1: Point = {x: 1, y: 10};
// console.log(p1.x)
// // p1.x = 2;
// // console.log(p1.x)

// 任意属性
// interface SquareConfig {
//   color: string;
//   width: number;
//   [propName: string]: any;
// }
// let config: SquareConfig = {
//   color: '#fc3704',
//   width: 300,
//   position: 'top',
//   float: true
// }

// 函数类型
// interface SearchFunc {
//   (source: string, subString: string): boolean;
// }

// let mySearch: SearchFunc;
// mySearch = function(source: string, subString: string): boolean {
//   let result = source.search(subString);
//   return result > -1;
// }

// interface SearchFunc {
//   (source: string, subString: string): boolean;
// }

// let mySearch: SearchFunc;
// mySearch = function(src: string, sub: string): boolean {
//   let result = src.search(sub);
//   return result > -1;
// }

// 索引类型
// interface StringArray {
//   [index: number]: string;
// }
// let myArray: StringArray = {
//   0: 'hhh',
//   10: 'index is 10'
// }
// console.log(myArray[0]) // 'hhh'
// console.log(myArray[10]) // 'index is 10'
// console.log(myArray[1]) // undefined



// 类类型
// interface ClockInterface {
//   currentTime: Date
// }

// class Clock implements ClockInterface {
//   currentTime: Date;
//   setTime(d: Date) {
//     this.currentTime = d;
//   }
//   constructor(h: number, m: number) { }
// }

// interface ClockConstructor {
//   new (hour: number, minute: number);
// }

// class Clock implements ClockConstructor {
//   currentTime: Date;
//   constructor(h: number, m: number) { }
// }