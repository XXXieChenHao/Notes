; (function (doc) {

  const result1 = [
    { img: 'img/1.jpg', width: "500", height: '370' },
    { img: 'img/2.jpg', width: "640", height: '275' },
    { img: 'img/3.jpg', width: "4000", height: '6000' },
    { img: 'img/4.jpg', width: "5258", height: '3740' },
    { img: 'img/5.jpg', width: "828", height: '466' },
    { img: 'img/6.jpg', width: "1920", height: '1080' },
    { img: 'img/7.jpg', width: "260", height: '195' },
    { img: 'img/8.jpg', width: "590", height: '629' },
    { img: 'img/9.jpg', width: "700", height: '577' },
    { img: 'img/10.jpg', width: "2150", height: '872' },
    { img: 'img/11.jpg', width: "650", height: '406' },
    { img: 'img/12.jpg', width: "1024", height: '768' },
    { img: 'img/13.jpg', width: "670", height: '446' },
    { img: 'img/14.jpg', width: "2560", height: '1600' },
    { img: 'img/15.jpg', width: "1152", height: '720' },
    { img: 'img/16.jpg', width: "400", height: '299' },
    { img: 'img/17.jpg', width: "850", height: '478' },
    { img: 'img/18.jpg', width: "1920", height: '1200' },
    { img: 'img/19.jpg', width: "450", height: '300' },
    { img: 'img/20.jpg', width: "640", height: '1138' },
    { img: 'img/21.jpg', width: "1080", height: '1920' },
    { img: 'img/22.jpg', width: "1024", height: '683' },
    { img: 'img/23.jpg', width: "800", height: '600' },
    { img: 'img/24.jpg', width: "330", height: '220' },
    { img: 'img/25.jpg', width: "1080", height: '786' },
    { img: 'img/26.jpg', width: "1000", height: '771' },
    { img: 'img/27.jpg', width: "500", height: '371' },
    { img: 'img/28.jpg', width: "940", height: '548' },
    { img: 'img/29.jpg', width: "1080", height: '719' },
    { img: 'img/30.jpg', width: "500", height: '370' },
    { img: 'img/31.jpg', width: "670", height: '471' },
    { img: 'img/32.jpg', width: "640", height: '394' },
    { img: 'img/33.jpg', width: "500", height: '389' },
    { img: 'img/34.jpg', width: "1000", height: '1000' },
    { img: 'img/35.jpg', width: "640", height: '565' },
    { img: 'img/36.jpg', width: "1632", height: '1224' },
    { img: 'img/37.jpg', width: "240", height: '320' },
    { img: 'img/38.jpg', width: "500", height: '368' },
    { img: 'img/39.jpg', width: "700", height: '500' },
    { img: 'img/40.jpg', width: "400", height: '300' }
  ]

  const result2 = [
    { img: "img/41.jpg", width: "2560", height: "1600" },
    { img: "img/42.jpg", width: "1366", height: "768" },
    { img: "img/43.jpg", width: "1920", height: "1080" },
    { img: "img/44.jpg", width: "1600", height: "2840" },
    { img: "img/45.jpg", width: "500", height: "750" },
    { img: "img/46.jpg", width: "700", height: "1066" },
    { img: "img/47.jpg", width: "960", height: "800" },
    { img: "img/48.jpg", width: "1280", height: "720" },
    { img: "img/49.jpg", width: "700", height: "1050" },
    { img: "img/50.jpg", width: "500", height: "889" },
    { img: "img/51.jpg", width: "654", height: "368" },
    { img: "img/52.jpg", width: "927", height: "521" },
    { img: "img/53.jpg", width: "640", height: "640" },
    { img: "img/54.jpg", width: "640", height: "960" },
    { img: "img/55.jpg", width: "800", height: "450" },
    { img: "img/56.jpg", width: "700", height: "1243" },
    { img: "img/57.jpg", width: "500", height: "498" },
    { img: "img/58.jpg", width: "720", height: "395" },
    { img: "img/59.jpg", width: "1920", height: "1200" },
    { img: "img/60.jpg", width: "960", height: "600" },
    { img: "img/61.jpg", width: "1600", height: "900" },
    { img: "img/62.jpg", width: "700", height: "1050" },
    { img: "img/63.jpg", width: "500", height: "751" },
    { img: "img/64.jpg", width: "600", height: "600" },
    { img: "img/65.jpg", width: "500", height: "333" },
    { img: "img/66.jpg", width: "533", height: "300" },
    { img: "img/67.jpg", width: "500", height: "313" },
    { img: "img/68.jpg", width: "650", height: "853" },
    { img: "img/69.jpg", width: "650", height: "365" },
    { img: "img/70.jpg", width: "500", height: "800" },
    { img: "img/71.jpg", width: "1000", height: "657" },
    { img: "img/72.jpg", width: "650", height: "915" },
    { img: "img/73.jpg", width: "1280", height: "538" },
    { img: "img/74.jpg", width: "1079", height: "1739" },
    { img: "img/75.jpg", width: "1280", height: "720" },
    { img: "img/76.jpg", width: "900", height: "900" },
    { img: "img/77.jpg", width: "450", height: "300" },
    { img: "img/78.jpg", width: "200", height: "300" },
    { img: "img/79.jpg", width: "1280", height: "853" },
    { img: "img/80.jpg", width: "1024", height: "615" }
  ]
  /**
   * 外层盒子 oWrapper
   * 列数  column
   * 间隙  gap
  */
  var Waterfall = function (option) {
    this.oWrapper = doc.querySelector(option.elem);
    this.column = option.column || 5;l
    this.gap = option.gap || 10;

    this.itemWidth = (this.oWrapper.offsetWidth - (this.column - 1) * this.gap) / this.column;
    this.heightArr = [];

  }

  Waterfall.prototype = {
    //  初始化
    init: function () {
      this.getImgDatas()
      this.bindEvent();
    },
    // 绑定事件
    bindEvent: function () {
      // this.getImgDatas();
      window.addEventListener('scroll', throttle(this.scrollToBottom.bind(this), 300), false);
    },
    // 滚动底部
    scrollToBottom: function () {
      if (getScrollTop() + getWindowHeight() + 500 > getScrollHeight()) {
        this.getImgDatas()
      }
    },
    // 获取数据
    getImgDatas: function () {
      setTimeout(() => {
        this.renderList(new Date().getTime() % 2 == 1 ? result1 : result2)
      }, 1000);
    },
    // 渲染页面
    renderList: function (data) {
      var oFrag = doc.createDocumentFragment();

      data.forEach((item, index) => {
        var minIndex = this.getMinIndex(this.heightArr);

        var oItem = doc.createElement('div'),
          oImg = new Image(),
          itemLeft = (index + 1) % this.column === 1 ? '0' : itemLeft = index * (this.itemWidth + this.gap),
          minHeightElemLeft = minIndex === 0 ? '0' : (minIndex * (this.itemWidth + this.gap)),
          itemHeight = item.height * this.itemWidth / item.width;

        oItem.className = 'wf-item';
        oItem.style.width = this.itemWidth + 'px';
        // 图片高度 / 图片宽度 = (盒子高度) / 图片高度
        oItem.style.height = itemHeight + 'px';
        oImg.src = item.img;

        oItem.appendChild(oImg);
        oFrag.appendChild(oItem);

        if (index < this.column && this.heightArr.length < this.column) {
          this.heightArr.push(itemHeight);
          oItem.style.top = '0';
          oItem.style.left = itemLeft + 'px';
        } else {
          oItem.style.left = minHeightElemLeft + 'px';
          oItem.style.top = (this.heightArr[minIndex] + this.gap) + 'px';
          this.heightArr[minIndex] += (itemHeight + this.gap);
        }
        oImg.style.opacity = '1';
      }, this);

      this.oWrapper.appendChild(oFrag);
    },

    // 获取最小值
    getMinIndex: function (arr) {
      return [].indexOf.call(arr, Math.min.apply(null, arr));
    }
  }

  window.Waterfall = Waterfall;

})(document);