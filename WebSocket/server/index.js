const Ws = require('ws');

; ((Ws) => {
  // 实例化 Ws 下静态的 Server 构造函数
  // ws:localhost:8000
  const server = new Ws.Server({port: 8000});

  const init = () => {
    bindEvent();
  }

  function bindEvent() {
    server.on('open', handleOpen);
    server.on('close', handleClose);
    server.on('error', handleError);
    server.on('connection', handleConnection);
  }

  function handleOpen() {
    console.log('WebSocket open');
  }

  function handleClose() {
    console.log('WebSocket close');
  }
  
  function handleError() {
    console.log('WebSOcket eroor');
  }

  function handleConnection(ws) {
    console.log('WebSocket conneced');
    ws.on('message', handleMessage);
  }

  // 前端发送的message
  function handleMessage(msg) {
    // console.log(msg)
    // clients 保存了所有客户端信息 遍历为所有客户端发送消息
    server.clients.forEach(man => {
      man.send(msg);
    })
  }

  init();
})(Ws);