
// const merge = (left, right) => {
//   let result = [];

//   while (left.length && right.length) {
//     // 如果左边小于或等于右侧，就将左侧放入结果中，泛指取右侧的值放入结果
//     let temp = left[0] <= right[0] ? left.shift() : right.shift()
//     result.push(temp);
//   }
//   // 如果left 无值则
//   if (!left.length) {
//     result = result.concat(right);
//     right = []
//   }
//   if (!right.length) {
//     result = result.concat(left);
//     left = []
//   }
//   return result
// }

// const mergeSort = arr => {
//   // 一个值直接返回即可
//   if (arr.length < 2) return arr;
//   // 取出中间索引
//   let middle = Math.floor(arr.length / 2);
//   // 拆分为两个子数组
//   let left = arr.slice(0, middle);
//   let right = arr.slice(middle);
//   let res = merge(mergeSort(left), mergeSort(right));
//   return res
// }


// // const merge = (a, b) => {
// //   let c = [];
// //   let i = 0, k = 0;
// //   while (i < a.length || k < b.length) {
// //     if (i >= a.length) {
// //       c.push(b[k])
// //       k += 1;
// //     } else if (k >= b.length) {
// //       c.push(a[i])
// //       i += 1
// //     } else {
// //       if (a[i] <= b[k]) {
// //         c.push(a[i])
// //         i += 1;
// //       } else {
// //         c.push(b[k])
// //         k += 1;
// //       }
// //     }
// //   }
// //   return c
// // }

// // const sort = (arr) => {
// //   let len = arr.length;
// //   // 一个值直接返回即可
// //   if (len === 1) return arr;
// //   // 两个值则比较大小按照有序返回
// //   if (len === 2) return arr[0] > arr[1] ? [arr[1], arr[0]] : [arr[0], arr[1]]
// //   // 两个以上的值时继续拆分，将子序列排序
// //   let left = arr.slice(0, parseInt(len / 2));    // 看这里
// //   let right = arr.slice(parseInt(len / 2));      // 看这里
// //   return merge(sort(left), sort(right));
// // }

// let a = mergeSort([1, 5, 2, 8, 0, 9, 2, 1, 7])
// console.log(a)

const sort = (arr) => {
  return inplaceSort(arr, 0, arr.length)
};

const inplaceSort = (arr, start, end) => {
  if (end - start <= 1) {
    return arr;
  }
  let middle = parseInt((start + end) / 2);
  inplaceSort(arr, start, middle);
  inplaceSort(arr, middle, end);
  inplaceMerge(arr, start, middle, end);
  return arr;
};

const inplaceMerge = (arr, start, middle, end) => {
  let i = start,
    k = middle;
  while (i < middle && k < end) {
    let w = 0;
    while (arr[i] <= arr[k] && i < middle) {
      i += 1;
    }
    while (arr[i] >= arr[k] && k < end) {
      k += 1;
      w += 1;
    }
    let part = arr.splice(k - w, w);
    arr.splice(i, 0, ...part);
    i += w;
    middle += w;
  }
  return arr;
};
console.log(sort([3, 5, 2, 7, 1, 9]))