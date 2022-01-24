
// 函数
// 为函数定义类型
// function add(x: number, y: number): number {
//   return x + y;
// }

// let myAdd = function add(x: number, y: number): number {
//   return x + y;
// }

// 书写完整函数类型
// let myAdd: (x: number, y: number) => number = function (x: number, y: number): number {
//     return x + y;
// };

// myAdd has the full function type
// let myAdd = function(x: number, y: number): number { return x + y; };

// // The parameters `x` and `y` have the type number
// let myAdd: (baseValue: number, increment: number) => number =
//     function(x, y) { return x + y; };

// 可选参数
// function buildName(firstName: string, lastName?: string) {
//   return firstName + " " + lastName;
// }


// buildName('Xi', 'Chao')
// buildName('Xi')

// 默认参数
// function buildName(firstName: string, lastName = "Smith") {
//   return firstName + " " + lastName;
// }

// buildName('xi')
// buildName('xi', 'Chao')
// buildName('xi', 'Chao', 'nice')

// 剩余参数
// function buildName(firstName: string, ...restOfName: string[]) {
//   return firstName + " " + restOfName.join(" ");
// }

// let employeeName = buildName("ZhangSan", "LiSi", "WangEr", "XiChao");


// This
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

// let cardPicker = deck.createCardPicker();
// let pickedCard = cardPicker();

// alert("card: " + pickedCard.card + " of " + pickedCard.suit);