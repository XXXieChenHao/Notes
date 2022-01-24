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


// 枚举
// enum Direction {Up = 1, Down, Left, Right};
// let up: Direction = Direction.Up;
// let down: Direction = Direction.Down;
// console.log(up, down);  // 0, 1


// enum Direction {Up, Down=3, Left, Right};
// let up: Direction = Direction.Up;
// let down: Direction = Direction.Down;
// let left: Direction = Direction.Left;
// let right: Direction = Direction.Right;
// console.log(up, down, left, right); // 0, 3, 4, 5


// enum Direction {Up = 1, Down=3, Left=12, Right=5};
// let up: Direction = Direction.Up;
// let down: Direction = Direction.Down;
// let left: Direction = Direction.Left;
// let right: Direction = Direction.Right;
// console.log(up, down, left, right); // 1, 3, 12, 5

// enum Direction {Up = 1, Down, Left, Right};
// let DirectionName: string = Direction[3];
// console.log(DirectionName); // left

// Any
// let notSure: any = 4;
// notSure = "maybe a string instead";
// notSure = false;

// let notSure: any = 4;
// notSure.ifItExists();
// notSure.toFixed();

// Void
// function warnUser(): void {
//   console.log("This is my warning message");
// }
// warnUser()

// Null && Undefined
// let nullValue: null = null;
// let undefinedValue: undefined = undefined;

// let nullString: string = null;
// nullString = 'nullString';
// let undefinedNumber: number = undefined;
// undefinedNumber = 3;

// function doSomething(x: string | null) {
//   if (x === null) {
//     // do nothing
//   } else {
//     console.log("Hello, " + x.toUpperCase());
//   }
// }

// Never
// function error(message: string): never {
//   throw new Error(message)
// }

// // 推断的返回值类型为never
// function fail() {
//   return error("Something failed");
// }

// // 返回never的函数必须存在无法达到的终点
// function infiniteLoop(): never {
//   while (true) {
//   }
// }

// Object
// function createObj(obj: {a: number, b: string, c: boolean}): void {
//   console.log(obj)
// }

// createObj({
//   a: 1,
//   b: '123',
//   c: true
// })

// function createObj(obj: object): void {
//   console.log(obj)
// }


// createObj({a: 1, b: '123'}) // OK
// createObj(1); // Argument of type 'number' is not assignable to parameter of type 'object'.
// createObj('123'); // Argument of type 'string' is not assignable to parameter of type 'object'.


// 类型断言
// const myCanvas = document.getElementById("main_canvas") as HTMLCanvasElement;
// const myCanvas = <HTMLCanvasElement>document.getElementById("main_canvas");

function keepWholeObject({a: args1 = '1', b : args2= 2}: {a: string, b: number}) {
  
}