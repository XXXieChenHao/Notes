// let obj: any = { x: 0 };
// // None of the following lines of code will throw compiler errors.
// // Using `any` disables all further type checking, and it is assumed 
// // you know the environment better than TypeScript.
// obj.foo();
// obj();
// obj.bar = 100;
// obj = "hello";
// const n: number = obj;

// No type annotation needed -- 'myName' inferred as type 'string'
// let myName = "Alice";


// function printCoord (pt: { x: number; y: number }): number {
//   console.log("The coordinate's x value is " + pt.x);
//   console.log("The coordinate's y value is " + pt.y);
//   return pt.x + pt.y
// }
// printCoord({ x: 3, y: 7 });

// type Point = {
//   x: number;
//   y: number;
// }

// function printCoord(pt:Point): number {
//   return pt.x + pt.y
// }

// let a:number = printCoord({x: 2, y: 5})

interface Window {
  title: string
}

interface Window {
  ts: TypeScriptAPI
}

type TypeScriptAPI =  {
  transpileModule: (a: string, b: {}) => {
    
  }
}

const src = 'const a = "Hello World"';
window.ts.transpileModule(src, {});
window.title = src

// type Window = {
//   title: string
// }

// type Window = {
//   ts: TypeScriptAPI
// }
