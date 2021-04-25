; (function (doc) {
  /**
   * 外层盒子 oWrapper
   * 列数  column
   * 间隙  gap
  */
  var Waterfall = function (option) {
    this.oWrapper = doc.querySelector(option.elem);
    this.column = option.column || 5;
    this.gap = option.gap || 10;

    this.itemWidth = (this.oWrapper.offsetWidth - (this.column - 1) * this.gap) / this.column;
    this.pageNum = 0;
    this.PageSize = 0;
    this.heightArr = [];

  }

  Waterfall.prototype = {
    //  初始化
    init: function () {
      this.getImgDatas(this.pageNum)
      this.bindEvent();
    },
    // 绑定事件
    bindEvent: function () {
    },
    // 滚动底部
    scrollToBottom: function () {

    },
    // 获取数据
    getImgDatas: function () {
      xhr.ajax({
        url: './',
        type: 'GET',
        dataType: 'JSON',
        data: {
          pageNum: this.pageNum,
        },
        success: function (data) {
          console.log(data);
        }
      })
    },
    // 渲染页面
    renderList: function () {

    }
  }


  window.Waterfall = Waterfall;

})(document);