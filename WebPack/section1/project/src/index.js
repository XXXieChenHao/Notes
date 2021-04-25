/**
 * index.js webpack 入口起点文件
*/

// 引入 JSON资源
import data from './data.json';

// JS代码
function add(x, y) {
  return x + y;
}

console.log(add(3, 5));

console.log(data)

// 引入样式资源
import './index.css'
import './index.less'