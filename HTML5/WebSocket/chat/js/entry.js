; ((doc, win) => {
  const oUsername = doc.querySelector('#username');
  const oEnterBtn = doc.querySelector('#enter');

  // 初始化函数
  const init = () => {
    bindEvent();
  }

  // 绑定事件处理
  function bindEvent() {
    oEnterBtn.addEventListener('click', handleEnterBtnClick, false);
  }

  // 按钮点击事件
  function handleEnterBtnClick() {
    const username = oUsername.value.trim();
    if (username.length < 2) {
      alert('用户名应不小于2位')
    } else {
      win.localStorage.setItem('username', username);
      win.location.href = 'index.html';
    }
  }

  init();
})(document, window);