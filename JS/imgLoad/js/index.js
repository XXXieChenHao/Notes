; (function (win, doc) {
  // 获取容器
  var oImgList = doc.getElementsByClassName('J_imgList')[0],
    data = JSON.parse(doc.getElementById('J_data').innerHTML),  // 获取 data
    imgTpl = doc.getElementById('J_imgTpl').innerHTML,  // 获取模板
    oImgs = doc.getElementsByClassName('list-img');

  var init = function () {
    oImgList.innerHTML = renderList(data)
    bindEvent();
    setTimeout(function() {
      window.scrollTo(0, 0);
    }, 150)
  }

  // 绑定事件
  function bindEvent() {
    window.onload = window.onscroll = throttle(imgLazyLoad(oImgs), 0, 0)
  }

  // 渲染列表
  function renderList(data) {
    var list = '';

    data.forEach(function (elem) {
      list += imgTpl.replace(/{{(.*?)}}/g, function (node, key) {
        return {
          img: elem.img,
          name: elem.name
        }[key];
        // 返回一个对象 并且返回对象中 key 对应的的 value
      })
    });
    return list
  }
  init()
})(window, document);

// 懒加载
function imgLazyLoad(image) {
  var imgLen = image.length,
      n = 0;
  return function () {
    var cHeight = document.documentElement.clientHeight,  // 可视区域高度
    sTop = document.documentElement.scrollTop || document.body.scrollTop, // 滚动高度
    imgItem;
    
    
    // 闭包 n 不会被清除掉,再次进入从 n 开始执行
    for (var i = n; i < imgLen; i++) {
      imgItem = image[i];
      if(imgItem.offsetTop < cHeight + sTop) {
        imgItem.src = imgItem.getAttribute('data-src')
        imgItem.removeAttribute('data-src')
        n++;
      }
    }
  }

}