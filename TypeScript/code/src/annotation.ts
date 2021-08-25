// 类型注解
// 布尔
let isDone: boolean = false;
// 数字
let decLiteral: number = 6;
let floatLiteral: number = 2.56;
let minusLiteral: number = -3;
let hexLiteral: number = 0xf00d;
let binaryLiteral: number = 0b1010;
let octalLiteral: number = 0o744;
// 字符串
let myName: string = 'Admin';
myName = 'Xichao';
let age = 23;
let sentence: string = `Hello, myName is ${myName}. I'll be ${age + 1} years old next month.`;
// any
let notSure: any = 4;
notSure = false;
notSure = 'Maybe a string';
notSure.ifitExists();
notSure.toFixed(2);
// Void
// function noReturn ():void {
//   console.log('no return')
//   return undefined
//   // return 3;
// }

// null && undefined
// let nullValue: null = null
// let undefinedValue: undefined = undefined

// let undefinedNumber: number = undefined;
// undefinedNumber = 3;

// Object

function printCoord(pt: { x: number; y: number }): void {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}
printCoord({ x: 3, y: 7 });

declare function  create(o: object| null): void;

create({prop: 0})
// create(1)

let infer = 3;


// 联合类型
// function test(a: number|string){
//   return a.split('');
// }
// test(1)
function test(a: number|string){
  if(typeof a === 'number') {
    return a.toFixed(1)
  } else {
    return a.split(''); // Property 'split' does not exist on type 'number'
  }
}
test(1)


// interface

// interface Person{
//   name: string;
//   age: number;
// }
// let person: Person = {
//   name: 'zhangsan',
//   age: 23
// }

// interface Person {
//   name: string;
//   age: number;
//   [propName: string]: any;
// }
// let person: Person = {
//   name: 'Xichao',
//   age: 23,
//   sex: 'male'
// }

// interface Person {
//   readonly id: number;
//   name: string;
//   age: number;
//   [propName: string]: any;
// }
// let person: Person = {
//   id: 1,
//   name: 'Xichao',
//   age: 23,
//   sex: 'male'
// }

// person.id = 2;

// 数组
// let list1: (number|string)[] = [1, 2, 3, '4']
// let list2: Array<number> = [1, 2, 3]
// interface NumberArr {
//   [index: number]: number|string;
// }

// let list3: NumberArr = [1, 2, 3, 4, '5']

// function test2() {
//   let args: IArguments = arguments
// }
// test2(1, '2')

// 函数
// function testFun1(a: number, b: number): number {
//   return a + b;
// }

// let testFun:(a: number, b: number) => number = function(a, b) {
//   return a + b;
// }

// function bullName(firstName: string, secondName?: string): string {
//   return firstName + secondName
// }

// bullName('Xi')
// bullName('Xi', 'Chao')


// function bullName(firstName: string, secondName: string = 'HaHaHa'): string {
//   return firstName + secondName
// }

// bullName('Xi')
// bullName('Xi', 'Chao')

// function bullName(firstName: string, secondName: string = 'HaHaHa', ...restOfName: string[]): string {
//   return firstName + secondName + restOfName
// }

// bullName('Xi')
// bullName('Xi', 'Chao', '哈哈哈', '诶呀诶呀')

// function test3({ first, second }: { first: number, second: number } = { first: 1, second: 2 }) {
  
// }

// function test4 ({first: first}: {first: number} = {first : 1}) {
//   return first
// }

let deck = {
  suits: ["hearts", "spades", "clubs", "diamonds"],
  cards: Array(52),
  createCardPicker: function() {
      return function() {
          let pickedCard = Math.floor(Math.random() * 52);
          let pickedSuit = Math.floor(pickedCard / 13);

          return {suit: this.suits[pickedSuit], card: pickedCard % 13};
      }
  }
}

let cardPicker = deck.createCardPicker();
let pickedCard = cardPicker();

alert("card: " + pickedCard.card + " of " + pickedCard.suit);