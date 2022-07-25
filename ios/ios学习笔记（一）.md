# 类
<br />

## 类的创建与使用
- 关键字
  - 声明类
    - @interface  声明类的关键字
    - @end  结尾

  - 实现类
    - @implementation
    - @end
  
**声明一个 Shape 类，并且实现方法获取面积**
项目中 .h 文件用于声明各种成员变量、方法
```Objective-c
@interface CreateClass : NSObject
@property (nonatomic, assign) NSString *className;
@property (nonatomic, assign) int classCount;
// 无参数方法
- (void) begin;
- (void) logInfo;
// 有参数方法
- (void)changeClassName:(NSString *)className AndClassProp:(int)classCount;

@end
```

.m 文件用于实现 .h 中声明的方法
```Objective-c
#import "CreateClass.h"

@implementation CreateClass
- (void) begin {
    self.className = @"默认类名";
    self.classCount = 0;
}

- (void) changeClassName:(NSString *)className AndClassProp:(int)classCount {
    self.className = className;
    self.classCount = classCount;
}

- (void) logInfo {
    NSLog(@"className是：%@, classCount是：%d", self.className, self.classCount);
}

@end
```

调用该类，需要先引入头文件
```Objective-c
#import "../Day01/CreateClass.h"

@implementation ViewController

- (void)viewDidLoad {
    CreateClass *cc = [[CreateClass alloc] init];
    [cc begin];
    [cc logInfo];   // className是：默认类名, classCount是：1
    [cc changeClassName: @"我是类名" AndClassProp:(20)];
    [cc logInfo];   // className是：我是类名, classCount是：20
}


-(void)viewWillAppear:(BOOL)animated {
    [super viewWillAppear:animated];
}

@end
```
<br />
<br />
<br />

### 构造方法
在 ios 中系统提供了默认的 init 方法，可以通过 `[[类名 alloc] init]` 的方式初始化，但是在某些时候需要在初始化时做些什么

Constructor.h 文件中声明了两个变量 string 和 length，同时定义两个方法 init 和 initArgumentsAndLength
```Objective-c
@interface Constructor : NSObject

@property (nonatomic, assign) NSString *string;
@property (nonatomic, assign) int length;

//初始化方法（无参）
- (instancetype)init;

//初始化方法（有参）
- (instancetype)initArguments:(NSString *) str AndLength:(int) len;

- (void) logInfo;
@end
```
Constructor.m 文件中分别实现两种初始化方法，第一种是在初始化时为变量赋默认值，另外一种则是将参数作为默认值。
```Objective-c
@implementation Constructor
- (instancetype)init {
    if (self = [super init]) {
        self.string = @"默认参数";
        self.length = 4;
    }
    return self;
}

- (instancetype)initArguments:(NSString *)str AndLength:(int)len {
    if (self = [super init]) {
        self.string = str;
        self.length = len;
    }
    return self;
}

- (void)logInfo {
    NSLog(@"参数为: %@, 参数长度：%d", self.string, self.length);
}
@end
```

调用
```Objective-c
Constructor *cs = [[Constructor alloc] init];
[cs logInfo]; // 参数为: 默认参数, 参数长度：4

Constructor *cs2 = [[Constructor alloc] initArguments:(@"我是传入的参数") AndLength:(7)];
[cs2 logInfo];  //  参数为: 我是传入的参数, 参数长度：7
```
------------
## 类方法

<br />

### 什么是类方法
类方法是相对于对象方法说的
对象方法： - 方法，是实例化对象调用的方法
类方法： + 方法，是 类 调用的方法
> 类方法就像 JavaScript 中的静态方法，属于类但不属于对象，通过 类名.方法名 进行调用

注意：类方法不能访问成员变量

```Objective-c
// 声明
@interface StaticFunction : NSObject

@property (nonatomic, assign) NSString *argument;

// 对象方法
- (void)objFunction;

// 类方法
+ (void) classFunction;

@end


// 实现
@implementation StaticFunction
- (instancetype) init {
    if (self = [super init]) {
        self.argument = @"对象的成员变量";
    }
    return self;
}

- (void)objFunction {
    NSLog(@"我是对象方法，我可以访问成员变量, %@", self.argument);
}

+ (void)classFunction {
    NSLog(@"我是类方法，我通过类名调用，无法访问成员变量");
}
@end

// 调用
StaticFunction *sf = [[StaticFunction alloc] init];
[sf objFunction];   //  我是对象方法，我可以访问成员变量, 对象的成员变量
[StaticFunction classFunction]; // 我是类方法，我通过类名调用，无法访问成员变量
```

<br />

<br />

<br />


### 类方法使用场景
- 用来创建对象 （简化创建对象代码）
- 用来作为工具类（一般只有方法）
- 创建单例对象（无论创建多少次，都只是同一个对象）

#### 1. 类方法创建对象
类方法创建对象主要是为了简化创建对象过程中的代码 `[[类名 alloc] init];`

```Objective-c
  // 声明
  @interface ClassFunctionCreateObject : NSObject

  @property (nonatomic, assign) NSString *name;

  //初始化方法
  - (instancetype)initWithName:(NSString *)name;
  //无参 类方法创建对象
  + (ClassFunctionCreateObject *) obj;
  //有参 类方法创建对象
  + (ClassFunctionCreateObject *) objWidthName: (NSString *)name;

  @end


  // 实现
  @implementation ClassFunctionCreateObject
  - (instancetype)initWithName:(NSString *)name {
      if (self = [super init]) {
          self.name = name;
      }
      return self;
  }

  + (ClassFunctionCreateObject *)obj {
      return [[ClassFunctionCreateObject alloc] init];
  }

  + (ClassFunctionCreateObject *)objWidthName:(NSString *)name {
      return [[ClassFunctionCreateObject alloc] initWithName: name];
  }

  // 调用
  ClassFunctionCreateObject *obj = [[ClassFunctionCreateObject alloc] init];
  ClassFunctionCreateObject *obj2 = [ClassFunctionCreateObject obj];
  ClassFunctionCreateObject *obj3 = [ClassFunctionCreateObject objWidthName: @"传参"];
  NSLog(@"obj2的名字为: %@, obj3的名字为: %@", obj2.name, obj3.name); // obj2的名字为: (null), obj3的名字为: 传参
```




#### 2. 工具类
在 ios 中都是面向对象开发，所以在引入工具方法时就必须要引入类，但是又不必将类实例化成对象再调用方法，所以使用类方法可以很好的减少代码的同时复用工具函数。

```Objective-c
@interface Library : NSObject
// 声明
//加、减、乘、除
@interface Library : NSObject
+ (int)plusFirst:(int)first AndSecond:(int)second;
+ (int)subFirst:(int)first AndSecond:(int)second;
+ (int)mulFirst:(int)first AndSecond:(int)second;
+ (int)divFirst:(int)first AndSecond:(int)second;
@end

// 实现
@implementation Library

+ (int)plusFirst:(int)first AndSecond:(int)second {
    return first + second;
}
+ (int)subFirst:(int)first AndSecond:(int)second {
    return first - second;
}
+ (int)mulFirst:(int)first AndSecond:(int)second {
    return first * second;
}
+ (int)divFirst:(int)first AndSecond:(int)second {
    return first / second;
}

@end

// 调用
NSLog(@"%d", [Library plusFirst:1 AndSecond:2]); // 3
NSLog(@"%d", [Library subFirst:3 AndSecond:1]); // 2
NSLog(@"%d", [Library mulFirst:7 AndSecond:9]); // 63
NSLog(@"%d", [Library divFirst:8 AndSecond:2]); // 4
```

#### 3. 单例
**static**
在学习单例之前首先要学习 ios 中的 static 关键字。
- 当static关键字修饰局部变量时，改变生命期，只会初始化一次。
- 当static关键字修饰局部变量时，不可以改变其作用域

```Objective-c
// 声明
@interface StaticKeyWord : NSObject
- (void)runFun;
- (void)logNum;
@end

// 实现
#import "StaticKeyWord.h"
void func(void) {
    static int num = 0;
    num++;
    NSLog(@"%d", num);
}

@implementation StaticKeyWord

- (void)runFun {
    for (int i = 0; i < 5; i++)
    {
        func();
    }
}
- (void)logNum {
    func();
}
@end

// 调用
StaticKeyWord *sKey = [[StaticKeyWord alloc] init];
[sKey runFun];  // 1, 2, 3, 4, 5
[sKey logNum];  // 6
```
可见上面的代码中，每一次调用 func 时并不会重新执行 `int num = 0`，如果将 static 去掉则会打印 6 次 1。

**单例**
保证一个类仅有一个实例，并提供一个访问它的全局访问点。
1. 单例类只能有一个实例。
2. 单例类必须自己创建自己的唯一实例
3. 单例类必须给所有其他对象提供这一实例

```Objective-c
// 声明
@interface Singleton : NSObject
// 创建单例对象
//单例对象命名规则：以default，或者standard开头，后面加上当前类名
+ (Singleton *)defaultSingleton;
@end

// 实现
@implementation Singleton

+ (Singleton *)defaultSingleton {
    // static 修饰 singleton 默认为 nil
    static Singleton *singleton = nil;
    // 如果 singleton 为 nil，则表示第一次调用
    if (singleton == nil) {
        singleton = [[Singleton alloc] init];
    }
    return singleton;
}
@end

// 调用
Singleton *singleton1 = [Singleton defaultSingleton];
Singleton *singleton2 = [Singleton defaultSingleton];
// 打印地址
NSLog(@"\n%p\n%p",singleton1, singleton2);  // 0x600003a7c420, 0x600003a7c420
```