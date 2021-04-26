; ((doc, win) => {
  const oList = doc.querySelector('#list');
  const oMsg = document.querySelector('#message');
  const oSendBtn = document.querySelector('#send');

  const ws = new win.WebSocket('ws:localhost:8000');

  let username = '';

  const init = () => {
    bindEvent();
  }

  function bindEvent() {
    oSendBtn.addEventListener('click', handleSendBtnCLick, false);
    ws.addEventListener('open', handleOpen, false);
    ws.addEventListener('close', handleClose, false);
    ws.addEventListener('error', handleError, false);
    ws.addEventListener('message', handleMessage, false);
  }

  function handleSendBtnCLick() {
    // console.log('Send Message');
    const msg = oMsg.value;
    if (!msg.trim().length) {
      return;
    }

    // 发送需要发送文本
    ws.send(JSON.stringify({
      user: username,
      dataTime: new Date().getTime(),
      message: msg
    }));

    oMsg.value = '';

  }

  function handleOpen() {
    console.log('WebSocket open');
    // 获取本地用户名
    username = win.localStorage.getItem('username');

    if (!username) {
      win.location.href = 'entry.html';
      return;
    }
  }
 
  function handleClose() {
    console.log('WebSocket close');
  }

  function handleError() {
    console.log('WebSocket error');
   }
   
  function handleMessage(e) {
    // console.log('WebSocket message');
    console.log(e)
    const msgData = JSON.parse(e.data);
    oList.appendChild(createMsg(msgData));
  }

  function createMsg(data) {
    const { user, dataTime, message } = data;
    const oItem = doc.createElement('li');
    oItem.innerHTML = `
    <p>
      <span>${user}</span>
      <i>${new Date(dataTime)}</i>
    </p>
    <p>message: ${message}</p>
    `;

    return oItem;
  }

  init();
})(document, window);

// 前端 send => 后端connection => 后端handleMessage => 后端send => 前端 handleMessage