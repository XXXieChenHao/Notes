// 布尔类型
// let isDone: boolean = false;
// console.log(isDone);

// 数字类型
// let decLiteral: number = 6;
// let hexLiteral: number = 0xf00d;
// let binaryLiteral: number = 0b1010;
// let octalLiteral: number = 0o744;

// console.log(decLiteral, hexLiteral, binaryLiteral, octalLiteral);

// 字符串
// let myName: string = "xichao";
// console.log(myName);

// let sentence: string = 'hello, my name is ' + myName + ', I’ll be ' + (decLiteral + 1) + ' years old next week.';
// let templateSentence: string = `hello, my name is ${ myName }, I'll be ${ decLiteral + 1 } years old next week.` ;
// console.log(sentence);
// console.log(templateSentence);

// Any
// let notSure: any = 4;
// notSure = 'maybe a string instead';
// notSure = false; // okay, definitely a boolean
// console.log(notSure);

// let notSure: any = 4;
// notSure.ifItExists(); // okay, ifItExists might exist at runtime
// notSure.toFixed(); // okay, toFixed exists (but the compiler doesn't check)
// console.log(notSure)

// void
// function voidFn(): void {
//   console.log("no return value");
//   // return undefined
// }

// null && undefined
// let u: undefined = undefined;
// let n: null = null;

// let num: number = 1;
// num = null;
// num = undefined;

// 联合类型
// let num: number | undefined | null = undefined
// num = null
// num = 1

// Never
// function error(message: string): never {
//   throw new Error(message);
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

declare function create(o: object | null): void;