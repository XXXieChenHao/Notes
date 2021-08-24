// const x = "hello" as number;
// let x = "hello" as number;

// const a = ('hello' as any) as number;
// const b = ('hello' as unknown) as number;

// let changingString:string = "Hello World";
// changingString = "Olá Mundo";
// // // Because `changingString` can represent any possible string, that is how TypeScript describes it in the type system
// changingString;
      
// // let changingString: string
 
// const constantString = "Hello World";
// // // Because `constantString` can only represent 1 possible string, it has a literal type representation
// constantString;

// let x: "hello" = "hello";
// // OK
// x = "hello";
// // ...
// x = "howdy";
// // Type '"howdy"' is not assignable to type '"hello"'.

// function printText(s: string, alignment: "left" | "right" | "center") {
//   // ...
// }
// printText("Hello, world", "left");
// printText("G'day, mate", "centre");

// function compare(a: number, b: number): 1 | 0 | -1 {
//   return a === b ? 0 : a > b ? 1 : -1;
// }

// interface Options {
//   width: number;
// }
// function configure(x: Options | "auto") {
//   // ...
// }
// configure({width: 100})
// configure("auto")
// configure("atuo")
// // Argument of type '"atuo"' is not assignable to parameter of type 'Options | "auto"'.

// const req = { url: "https://example.com", method: "GET"};
// handleRequest(req.url, req.method as "GET");

// function handleRequest(url: string, method: "GET"|"POST") {

// }

function doSomething(x) {
  // if (x === null) {
  //   // do nothing
  // } else {
  //   console.log("Hello, " + x.toUpperCase());
  // }
    console.log("Hello, " + x.toUpperCase());
}

var x = null
doSomething(x)