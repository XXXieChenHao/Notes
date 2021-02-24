;(function (doc) {
  var oItems = doc.getElementsByClassName('wf-item'),
      oItemsLen = oItems.length,
      _arr = [];

  var init = function () {
    setImgPosition()
  }

  // 设置图片位置
  function setImgPosition() {
    var item = null;
    for (var i = 0; i < oItemsLen; i++) {
      item = oItems[i];
      item.style.width = (1200 - 40) / 5 + 'px';

      // 首行设置位置
      if (i < 5) {
        _arr.push(item.offsetHeight);
        item.style.top = '0';

        if ((i + 1) % 5 === 1) {
          item.style.left = '0';
        } else {
          item.style.left = i * ((1200 - 40) / 5 + 10) + 'px';
        }
      } else {
        minIdx = getMinIndex(_arr);
        item.style.left = oItems[minIdx].offsetLeft + 'px';
        item.style.top = (_arr[minIdx] + 10) + 'px';
        _arr[minIdx] += item.offsetHeight + 10;
      }
    }
  }

  // 获取数组最小下标
  function getMinIndex(arr) {
    return [].indexOf.call(arr, Math.min.apply(null, arr));
  }

  window.onload = function () {
    init();
  }

})(document);