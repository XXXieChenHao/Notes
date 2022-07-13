// 冒泡排序
// const bubbleSort = arr => {
//   for (let i = 0; i < arr.length - 1; i++) {
//     for (let j = 0; j < arr.length - 1 - i; j++) {
//       if (arr[j] > arr[j + 1]) {
//         [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
//       }
//     }
//   }
//   return arr
// }

// const arr = [1, 1, 7, 3, 2]
// bubbleSort(arr)


// 优化
// const bubbleSort = arr => {
//   let count = 0
//   for (let i = 0; i < arr.length - 1; i++) {
//     // 定义一个标识
//     let isOrder = true;
//     for (let j = 0; j < arr.length - 1 - i; j++) {
//       count++
//       if (arr[j] > arr[j + 1]) {
//         [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
//         isOrder = false;
//       }
//     }
//     if (isOrder) {
//       break;
//     }
//   }
//   console.log(count)
//   return arr
// }

// const arr = [1, 1, 3, 3, 2]
// bubbleSort(arr)

// 鸡尾酒排序
const cocktailSort = arr => {
  let count = 0
  for (let i = 0; i < arr.length / 2; i++) {
    // 升序
    let isOrder = true;
    for (let j = 0; j < arr.length - 1 - i; j++) {
      count++
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
    for (let j = arr.length - 2 - i; j > i; j--) {
      count++
      if (arr[j] < arr[j - 1]) {
        [arr[j], arr[j - 1]] = [arr[j - 1], arr[j]];
        isOrder = false;
      }
    }

    if (isOrder) {
      break;
    }

  }
  console.log(count)
  return arr
}

cocktailSort([2, 3, 4, 5, 1])