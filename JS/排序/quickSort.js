// // 快速排序
// console.time()
// let i = 0
// const quickSort = (arr) => {
//   i++
//   // 如果数组长度小于2 则不需要排序，这也作为递归的终点
//   if (arr.length < 2) return arr

//   // 取第一个元素作为基准值
//   const key = arr.shift()
//   const left = [], right = [], center = [key]
//   for (let i = 0; i < arr.length; i++) {
//     // 与基准值比较，放到左或右数组中
//     if (arr[i] < key) {
//       left.push(arr[i])
//     } else if (arr[i] === key) {
//       center.push(arr[i])
//     } else {
//       right.push(arr[i])
//     }
//   }
//   // 将左右递归，并且按照 左 - 基准值- 右拼接
//   return quickSort(left).concat(center, quickSort(right))
// }

// const arr = [1, 4, 2, 6, 8, 2, 43, 7, 2, 1, 56, 2, 3, 9]
// console.log(quickSort(arr))
// console.timeEnd()
// console.log(i)

// 三路快排
// const partition = (arr, L, R) => {
//   // 取第一个元素作为基准值
//   let key = arr[L]
//   let lt = L;
//   let gt = R + 1;

//   for (let i = L + 1; i < gt;) {
//     if (arr[i] === key) {
//       i++;
//     } else if (arr[i] > key) {
//       [arr[gt - 1], arr[i]] = [arr[i], arr[gt - 1]]
//       gt--;
//     } else {
//       [arr[lt + 1], arr[i]] = [arr[i], arr[lt + 1]];
//       lt++;
//       i++;
//     }
//   }
//   [arr[L], arr[lt]] = [arr[lt], arr[L]];
//   lt--;
//   console.log(arr)
//   return { lt: lt, gt: gt };
// }

// const threeWayFastRow = function (arr, L, R) {
//   // 当前数组的起始位置大于等于数组的末尾位置时退出递归
//   if (L >= R) {
//     return false;
//   }
//   let obj = partition(arr, L, R);
//   // 递归执行: 将没有大于p,和小于p区间的元素在进行三路快排
//   threeWayFastRow(arr, L, obj.lt);
//   threeWayFastRow(arr, obj.gt, R);
// }

// const dataArr = [3, 5, 8, 1, 2, 9, 4, 7, 6];
// threeWayFastRow(dataArr, 0, dataArr.length - 1);