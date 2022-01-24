
// class Gretter {
//   gretting: string;
//   constructor (message: string) {
//     this.gretting = message
//   }
//   greet() {
//     return 'Hello,' + this.gretting;
//   }
// }

// let greet = new Gretter('Xichao');
// console.log(greet.greet())

// class Animal {
//   move(distanceInMeters: number = 0) {
//     console.log(`Animal moved ${distanceInMeters}`);
//   }
// }

// class Dog extends Animal {
//   bark() {
//     console.log('汪汪')
//   }
// }
// const dog = new Dog();
// dog.bark();
// dog.move();
// dog.move(10);

// class Animal {
//   name: string;
//   constructor(theName: string) {
//     this.name = theName;
//   }
//   move(distanceInMeters: number = 0) {
//     console.log(`${this.name} moved ${distanceInMeters}m.`);
//   }
// }

// class Snake extends Animal {
//   constructor(name: string) {
//     super(name);
//   }
//   move(distanceInMeters = 5) {
//     console.log('snake is moving');
//     super.move(distanceInMeters);
//   }
// }

// class Horse extends Animal {
//   constructor(name: string) {
//     super(name);
//   }
//   move(distanceInMeters = 45) {
//     console.log('horse is moving');
//     super.move(distanceInMeters)
//   }
// }

// let snake = new Snake('first');
// let horse = new Horse('second');
// snake.move(10);
// horse.move(20);

// 公共修饰符
// class Animal {
//   public name: string;
//   public constructor (theName: string) { this.name = theName; }
//   public move (distanceInMeters: number) {
//     console.log(`${this.name} moved ${distanceInMeters}m.`)
//   }
// }

// let cat = new Animal('cat');
// cat.move(20)

// class Animal {
//   private name: string;
//   constructor(theName: string) { this.name = theName; }
// }

// let cat = new Animal('cat');
// cat.name;


// 私有修饰符
// class Animal {
//   private name: string;
//   constructor(theName: string) {this.name = theName; }
// }

// class Rhino extends Animal {
//   constructor(theName: string) { super(theName); }
// }

// class Employee {
//   private name: string;
//   constructor(theName: string) {this.name = theName; }
// }

// let animal = new Animal("animal");
// let rhino = new Rhino('rhino');
// let employee = new Employee("employee");

// animal = rhino;
// animal = employee;

// class Animal {
//   private name: string;
//   constructor(theName: string) { this.name = theName; }
//   private moved(distanceInMeters: string) {
//     console.log(`${this.name} moved ${distanceInMeters}m.`)
//   } 
// }



// class Cat extends Animal {
//   constructor(theName: string) { super(theName)}
//   public catMove(distanceInMeters: string) {
//     super.moved(distanceInMeters)
//   }
// }

// let cat = new Cat('cat')
// cat.name
// cat.moved()


// 受保护修饰符
// class Animal {
//   protected name: string;
//   constructor(theName: string) { this.name = theName }
// }

// class Employee extends Animal {
//   constructor(name: string) {
//     super(name)
//   }

//   public getElevatorPitch() {
//     return `${this.name}`
//   }
// }

// let demo = new Employee('demo')
// console.log(demo.getElevatorPitch());
// demo.name; // Property 'name' is protected and only accessible within class 'Animal' and its subclasses.

// class Person {
//   readonly name: string;
//   readonly age: Number;
//   readonly numberOfLegs: number = 8;
//   constructor(theAge: Number) {
//     this.age = theAge;
//   }
// }

// let dad = new Person(18);
// console.log(dad.age)
// dad.name = 'xch';
// dad.age = 18;

// class Person {
//   constructor(readonly name: string, public age: number) {
//   }
// }

// let xichao = new Person('Xichao', 24)
// console.log(xichao.name)
// console.log(xichao.age)

// 存取器
// class Employee {
//   private _fullName: string;
//   private passcod: any = 'nicexichao'
//   private password: any;
//   get fullName() {
//     return this._fullName
//   }

//   set fullName(newName: string) {
//     if (this.password && this.password == this.passcod) {
//       this._fullName = newName
//       console.log('修改成功！')
//     } else {
//       console.log('密码错误，没有权限修改用户名')
//     }
//   }

//   public login(password: any) {
//     this.password = password;
//   }
// }

// let employee = new Employee();
// employee.login('123456');
// employee.fullName = '登录失败后';
// console.log(employee.fullName);
// employee.login('nicexichao');
// employee.fullName = '登录成功后';
// console.log(employee.fullName);

// 静态属性
// interface Point {
//   x: number;
//   y: number;
// }
// class Grid {
//   static origin: Point = {x: 0, y: 0};
//   calculateDistanceFromOrigin(point: Point) {
//     let xDist = (point.x - Grid.origin.x);
//     let yDist = (point.y - Grid.origin.y);
//     return Math.sqrt(xDist * xDist + yDist * yDist) / this.scale
//   }

//   constructor(private scale: number) {}
// }

// let grid1 = new Grid(1);
// let grid2 = new Grid(0.5);
// console.log(grid1.calculateDistanceFromOrigin({x: 10, y: 20}));
// console.log(grid2.calculateDistanceFromOrigin({x: 10, y: 20}));

// abstract class Department {
//   constructor (public name: string) {}

//   printName(): void {
//     console.log('Department name: ' + this.name);
//   }

//   abstract printMeeting(): void
// }

// class AccountingDepartment extends Department {
//   constructor() {
//     super('xiChao');
//   }

//   printMeeting(): void {
//     console.log('Nice to meet you')
//   }

//   generateReports(): void {
//     console.log('Generating accounting reports...');
//   }
// }

// let department: Department = new AccountingDepartment();
// department.printName()
// department.printMeeting()