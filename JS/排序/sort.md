# 排序算法
<br />
> 陆续填充各种排序算法思路和代码

## 快速排序
基本思路：快速排序是将一个未排序列按照基准值，通过一次排序将要排序的数据分割成独立的两部分，其中一部分的所有数据都比基准值小，也就是比另外一部分的所有数据都要小。
### 步骤
1. 从该序列中去一个基准值，将小于基准值的放在左边，大于基准值的放在右边
2. 以基准值为中间，将左右两边分别再次执行 1 操作
注意： 如果当前值与基准值相同，放在左右都不影响排序结果

### 代码
<br />

```js
// 快速排序
const quickSort = arr => {
  // 如果数组长度小于2 则不需要排序，这也作为递归的终点
  if (arr.length < 2) return arr

  // 取第一个元素作为基准值
  const key = arr.shift()
  const left = [], right = []
  for (let i = 0; i < arr.length; i++) {
    // 与基准值比较，放到左或右数组中
    if (arr[i] < key) {
      left.push(arr[i])
    } else {
      right.push(arr[i])
    }
  }
  // 将左右递归，并且按照 左 - 基准值- 右拼接
  return quickSort(left).concat([key], quickSort(right))
  // 下方写法也可以，不过经过测试要比上边的慢
  // return [...quickSort(left), [key], ...quickSort(right)]
}

const arr = [1, 4, 2, 6, 8, 2, 43, 7, 2, 1, 56, 2, 3, 9]
console.log(quickSort(arr)) // [ 1,  1, 2, 2, 2, 2, 3,  4, 6, 7, 8, 9, 43, 56 ]
```

### 过程
将未排序的 `[3, 4, 2, 1, 6, 3]` 进行快速排序

- 第一次快排
基准值: <span style="color: #383ffb">3</span>
左侧: [2, 1]
右侧: [4, 6, 3]
当前：quickSort([2, 1]), <span style="color: #383ffb">3</span>, quickSort([4, 6, 3])
未结束: 因为左右两侧数组长度大于或等于 2, 所以继续两侧各自执行快排
- 第二次快排
  - 将左侧快排 [2, 1]
    基准值: <span style="color: #383ffb">2</span>
    左侧: [1]
    右侧: []
    当前: quickSort([1]), <span style="color: #383ffb">2</span>, quickSort([])
    结束: 因为 length < 2，停止，所以左侧到此停止，拼接后将 [1, <span style="color: #383ffb">2</span>] 返回给上一层 
  - 将右侧快排  [4, 6, 3]
    基准值: <span style="color: #383ffb">4</span>
    左侧: [3]
    右侧: [6]
    当前: quickSort([3]), <span style="color: #383ffb">2</span>, quickSort([])
    结束: 因为 length < 2 所以左侧到此停止，拼接后将 [3, <span style="color: #383ffb">4</span>, 6] 返回给上一层 
- 结束，返回结果为 [1, <span style="color: #383ffb">2</span>, <span style="color: #383ffb">3</span>, 3, <span style="color: #383ffb">4</span>, 6] 特殊颜色字体为循环中各阶段的基准值

### 优化
减少循环次数,通过细化分区，减少与基准值相同时的递归次数, 如果数据中相同值很多时将会减少循环次数
```js
const quickSort = arr => {
  // 如果数组长度小于1 则不需要排序，这也作为递归的终点
  if (arr.length < 2) return arr

  // 取第一个元素作为基准值
  const key = arr.shift()
  const left = [], right = [], center = [key]
  for (let i = 0; i < arr.length; i++) {
    // 与基准值比较，放到左或右数组中
    if (arr[i] < key) {
      left.push(arr[i])
    } else if(arr[i] === key) {
      center.push(arr[i])
    } else {
      right.push(arr[i])
    }
  }
  // 将左右递归，并且按照 左 - 中- 右拼接
  return quickSort(left).concat(center, quickSort(right))
```

------------


## 冒泡排序
基本思路：重复的访问要排序的元素列，一次比较相邻的两个元素，如果他们的顺序不符合预期就相互交换 直到没有相邻的元素需要交换为止

### 步骤
1. 比较一对相邻的元素
2. 如果不满足预期则交换这两个数，如果满足则判断下一组数据
3. 按照要求重复 1 和 2，直至将满足需求（大，或小）的数移动到末尾
4. 将末尾 -1，重复上述步骤，直至末尾为 1

### 代码
<br />

```js
const bubbleSort = arr => {
  // 最后一对的索引是 length - 2 和 length - 1
  for (let i = 0; i < arr.length - 1; i++) {
    // 每次都会将一个符合排序需求的数归位，所以每次都减少一次循环, 当前次减少 i 次
    for (let j = 0; j < arr.length - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
      }
    }
  }
  return arr
}

const arr = [3, 1, 7, 3, 2]
bubbleSort(arr)
```

<br />
<br />

### 过程
将未排序的数组 `[3, 1, 7, 3, 2]` 排序
- 第一循环
  - [<span style="color: #383ffb">1</span>, <span style="color: #383ffb">3</span>, 7, 3, 2] 
  - [1, <span style="color: #383ffb">3</span>, <span style="color: #383ffb">7</span>, 3, 2]
  - [1, 3, <span style="color: #383ffb">3</span>, <span style="color: #383ffb">7</span>, 2]
  - [1, 3, 3, <span style="color: #383ffb">2</span>, <span style="color: #383ffb">7</span>]
- 第二次循环 &emsp;&emsp;7已排好，所以不需要再比较
  - [<span style="color: #383ffb">1</span>, <span style="color: #383ffb">3</span>, 3, 2, 7]
  - [1, <span style="color: #383ffb">3</span>, <span style="color: #383ffb">3</span>, 2, 7]
  - [1, 3, <span style="color: #383ffb">2</span>, <span style="color: #383ffb">3</span>, 7]
- 第三次循环 &emsp;&emsp;3,7 已排好，所以最后两项不需要
  - [<span style="color: #383ffb">1</span>, <span style="color: #383ffb">3</span>, 2, 3, 7]
  - [1, <span style="color: #383ffb">2</span>, <span style="color: #383ffb">3</span>, 3, 7]
- 第四次循环 &emsp;&emsp;3,3,7 已排好，所以最后三项不需要
  - [<span style="color: #383ffb">1</span>, <span style="color: #383ffb">2</span>, 3, 3, 7]


### 冒泡优化
将未排序的数组 `[1, 1, 7, 3, 2]` 排序
- 第一次循环
  - [ <span style="color: #383ffb">1</span>, <span style="color: #383ffb">1</span>, 7, 3, 2 ]
  - [ 1, <span style="color: #383ffb">1</span>, <span style="color: #383ffb">7</span>, 3, 2 ]
  - [ 1, 1, <span style="color: #383ffb">3</span>, <span style="color: #383ffb">7</span>, 2 ]
  - [ 1, 1, 3, <span style="color: #383ffb">2</span>, <span style="color: #383ffb">7</span> ]
- 第二次循环
  - [ <span style="color: #383ffb">1</span>, <span style="color: #383ffb">1</span>, 3, 2, 7 ]
  - [ 1, <span style="color: #383ffb">1</span>, <span style="color: #383ffb">3</span>, 2, 7 ]
  - [ 1, 1, <span style="color: #383ffb">2</span>, <span style="color: #383ffb">3</span>, 7 ]
- 第三次循环 &emsp;&emsp;此时已经排好
  - [ <span style="color: #383ffb">1</span>, <span style="color: #383ffb">1</span>, 2, 3, 7 ]
  - [ 1, <span style="color: #383ffb">1</span>, <span style="color: #383ffb">2</span>, 3, 7 ]
- 第四次循环
  - [ <span style="color: #383ffb">1</span>, <span style="color: #383ffb">1</span>, 2, 3, 7 ]

由上可见，当第三次循环时意境排序完成，但程序仍在执行，所以可以通过判断是否完成排序来决定是否继续执行代码

```js
const bubbleSort = arr => {
  for (let i = 0; i < arr.length - 1; i++) {
    // 定义一个标识
    let isOrder = true;
    for (let j = 0; j < arr.length - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        // 发生交换，则表示自此没有完成排序
        isOrder = false;
      }
    }
    // 如果没有进行元素交换，则证明前一次已经排好，不需要继续执行
    if (isOrder)  break;
  }
  return arr
}

const arr = [1, 1, 3, 3, 2]
bubbleSort(arr)
```

------------
## 冒泡加强—鸡尾酒排序😱
基本思路：鸡尾酒排序(双向排序)更加适合用在大多数元素已经是有序的前提下，可以减少排序的回合数
> 像钟摆一样，从左向右的过程中将大的数值冒泡过去，再从右向左将小的数值冒泡过来(反之亦然)

### 分析
还是先看一段正常的冒泡排序过程
将 `[2, 3, 4, 5, 1]` 冒泡排序
- 第一次循环
  - [ 2, 3, 4, 5, 1 ]
  - [ 2, 3, 4, 5, 1 ]
  - [ 2, 3, 4, 5, 1 ]
  - [ 2, 3, 4, 1, 5 ]
- 第二次循环
  - [ 2, 3, 4, 1, 5 ]
  - [ 2, 3, 4, 1, 5 ]
  - [ 2, 3, 1, 4, 5 ]
- 第三次循环
  - [ 2, 3, 1, 4, 5 ]
  - [ 2, 1, 3, 4, 5 ]
- 第四次循环
  - [ 1, 2, 3, 4, 5 ]

可以发现，原数组中其实前半部分已经排序好了，但仍然要将 1 一次一次向前移动

鸡尾酒排序是冒泡排序的一种变形，与冒泡的区别是在排序是以双向序列进行排序

### 步骤
1. 先将数组从左到右冒泡（升序），将最大的元素移动到最右端
2. 再将数组从右到左冒泡（降序），将最小的元素移动到最左端
3. 重复 1，2，缩小未排序范围，直到没有元素交换

### 代码

<br />

```js
const cocktailSort = arr => {
  for (let i = 0; i < arr.length - 1; i++) {
    console.log(i)
    // 升序
    let isOrder = true;
    for (let j = 0; j < arr.length - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        isOrder = false;
      }
    }
    if (isOrder) {
      break;
    }

    // 降序
    isOrder = true;
    // 因为最大的上方已经放到最后一位了，所以应该从倒数第 2 位开始降序
    for (let j = arr.length - 2 - i; j > i; j--) {
      if (arr[j] < arr[j - 1]) {
        [arr[j], arr[j - 1]] = [arr[j - 1], arr[j]];
        isOrder = false;
      }
    }

    if (isOrder) {
      break;
    }
  }
  return arr
}

cocktailSort([2, 3, 4, 5, 1])
```
<br />

### 过程
因为此步骤外层循环只需要两次（一次排序，一次校验），所以详细分解第一次循环的过程
1. 升序过程-钟摆向右
  - [<span style="color: #383ffb">2</span>, <span style="color: #383ffb">3</span>, 4, 5, 1]
  - [2, <span style="color: #383ffb">3</span>, <span style="color: #383ffb">4</span>, 5, 1]
  - [2, 3, <span style="color: #383ffb">4</span>, <span style="color: #383ffb">5</span>, 1]
  - [2, 3, 4, <span style="color: #383ffb">1</span>, <span style="color: #383ffb">5</span>]
2. 降序过程-钟摆向左
  - [2, 3, <span style="color: #383ffb">1</span>, <span style="color: #383ffb">4</span>, 5]
  - [2, <span style="color: #383ffb">1</span>, <span style="color: #383ffb">3</span>, 4, 5]
  - [<span style="color: #383ffb">1</span>, <span style="color: #383ffb">2</span>, 3, 4, 5]

到此已经排好，第二次循环一次交换也没有，所以两次循环就可以解决(第一次排序，第二次检查)

------------

## 选择排序
基本思路：将未排序的值设置为擂主，不断地用后续的值进行对比，如果比他小则记录当前最小值的索引，最后将其排序

### 步骤
1. 选择未排序的首个作为最小值，保存最小值索引 minIndex
2. 逐个遍历与当前最小值进行比较，如果小于当前值则更新 minIndex,直至遍历结束将 minIndex 位的值与未排序第一个值进行交换
3. 重复 1，2 直至全部循环

### 代码
<br />

```js
const selectSort = arr => {
  let minIndex = 0;
  for (let i = 0; i < arr.length; i++) {
    minIndex = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j
      }
    }
    [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]]
  }
}
const arr = [18, 16, 12, 23, 48, 24, 2, 32, 6, 1]
selectSort(arr)
```
<br />

### 过程
将未排序的 `[1, 3, 7, 2]` 进行选择排序
循环过程详解: 未排序索引 current，最小值索引 minIndex

current = 0， minIndex = 0，擂主 1
- 1 < 3
- 1 < 7
- 1 < 2

循环结束，不交换，索引 0 已经排好, 此时数组为 [1,3,7,2]
<div style="border-bottom: 1px dashed #ccc"></div>

current = 1， minIndex = 1，擂主 3
- 3 < 7
- 3 > 2  <span style="color: #383ffb">minIndex = 3，擂主 2</span>

循环结束，索引3 与索引1 的值交换，索引 1 已经排好，此时数组为 [1,2,7,3]

<div style="border-bottom: 1px dashed #ccc"></div>

current = 2， minIndex = 2，擂主 7
- 7 > 3 <span style="color: #383ffb">minIndex = 3，擂主 3</span>

循环结束，索引3 与索引2 的值交换，索引 2 已经排好，此时数组为 `[1, 2, 3, 7]`
排序完成

------------



