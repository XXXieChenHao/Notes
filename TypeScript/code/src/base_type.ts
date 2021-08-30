// 布尔值
// let isDone: boolean = true;
// isDone = false;
// console.log(isDone);

// 数字
// let decLiteral: number = 6;
// let floatLiteral: number = 2.56;
// let minusLiteral: number = -3;
// let hexLiteral: number = 0xf00d;
// let binaryLiteral: number = 0b1010;
// let octalLiteral: number = 0o744;

// 字符串
// let myName: string = 'Xichao';
// myName = 'Hello, Xichao';
// console.log(myName);

// let myName: string = 'Xichao';
// let age = 23;
// let sentence: string = `Hello, myName is ${myName}. I'll be ${age + 1} years old next month.`;

// 数组
// let list0: number[] = [1 , 2, 3, 4, 5, -1];

// let list1: string[] = ['1', 'hhh', '好啊'];

// let list2: Array<number> = [1 , 2, 3, 4, 5, -1];

// console.log(list0, list1, list2);

// 元祖
// let x: [number, string];
// x = [10, 'hello']; 

// x[2];

// x = [10, 'hello', 2]
// x = ['hello', 2];

// console.log(x[0].substr(1)); // OK
// console.log(x[1].substr(1)); 

enum Direction {
  Up = 1,
  Down = 4,
  Left,
  Right,
}

console.log(Direction[4])