// n 的阶乘，不适用 for 循环
// function fact(n) {
//   if(n === 1) {
//     return 1
//   }else {
//     return n * fact(n - 1)
//   }
// }

// fact(3)
// 规律
// n! = n * (n-1)!
//     (n-1)! = (n-1) * (n - 1 -1)!
// 出口 
// 当 n === 1 时将 1 返回

// 理解过程 n = 5
/**
 * fact(5) = 5 * fact(4)
 * fact(4) = 4 * fact(3)
 * fact(3) = 3 * fact(2)
 * fact(2) = 2 * fact(1)
 * fact(1) = return 1
 * 
 * 当 n === 1 时向上操作
 * 
 * fact(1) = 1
 * fact(2) = 2 * 1
 * fact(3) = 3 * 2 * 1
 * fact(4) = 4 * 3 * 2 * 1
 * fact(5) = 5 * 4 * 3 * 2 * 1
 * 返回到最顶层的时候 计算完毕 return 出去
 */

// n3 = n2 + n1

function fb(n) {
  if (n <= 0) {
    return '无意义';
  }else if (n <= 2) {
    return 1;
  } else {
    return fb(n - 1) + fb(n - 2);
  }
}

fb(5)
// 分析
/**
 * n = 5   fb(n)
 * 
 * fb(5) = fb(4) + fb(3)
 * fb(4) = fb(3) + fb(2)
 * fb(3) = fb(2) + fb(1)
 * 
 * n <= 2 时 return 1
 * fb(3) = 1 + 1
 * fb(4) = (1 + 1) + 1
 * fb(5) = (1 + 1 + 1) + (1 + 1)
 */