import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
  state = {
    comments: [
      { id: 1, name: 'jack', content: '沙发！！！' },
      { id: 2, name: 'Micale', content: '椅子！！！' },
      { id: 3, name: 'Mark', content: '凳子！！！' },
    ]
  }

  // 渲染评论列表
  renderList = () => {
    const { comments } = this.state
    // if...else 判断
    if (comments.length === 0) {
      return (<div className="no-comment">暂无评论，快去评论吧～</div>)
    }

    return (
      <ul>
        {comments.map(item => (
          <li key={item.id}>
            <h3>评论人： {item.name}</h3>
            <p>评论内容：{item.content}</p>
          </li>
        ))}
      </ul>)


    // 三元返回
    // return comments.length === 0
    //   ? (<div className="no-comment">暂无评论，快去评论吧～</div>)
    //   : (<ul>
    //     {comments.map(item => (
    //       <li key={item.id}>
    //         <h3>评论人： {item.name}</h3>
    //         <p>评论内容：{item.content}</p>
    //       </li>
    //     ))}
    //   </ul>)
  }

  render() {
    return (
      <div className="app">
        <div>
          <input type="text" className="user" placeholder="请输入评论人" />
          <br />
          <textarea className="content" cols="30" rows="10" placeholder="请输入评论内容"></textarea>
          <br />
          <button>发表评论</button>
        </div>
        {/* 通过条件渲染决定渲染什么内容 */}
        {/* {this.state.comments.length == 0 ?
          (<div className="no-comment">暂无评论，快去评论吧～</div>)
          : (<ul>
            {this.state.comments.map(item => (
              <li key={item.id}>
                <h3>评论人： {item.name}</h3>
                <p>评论内容：{item.content}</p>
              </li>
            ))}
          </ul>)} */}

        {/* 抽离出去 */}
        {this.renderList()}
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))