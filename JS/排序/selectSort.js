// 选择排序
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