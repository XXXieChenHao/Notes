import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
  state = {
    comments: [],

    // 评论人
    userName: '',

    // 评论内容
    userContent: ''

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

  // 处理表单元素值
  handleForm = (e) => {
    const { name, value } = e.target;

    this.setState({
      [name]: value
    })
  }

  // 发表评论
  addComment = () => {
    const { userName, userContent, comments } = this.state;
    if (!userName.trim() || !userContent.trim()) {
      alert('请输入评论人和评论内容')
      return
    }
    const newComments = [{
      id: comments.length + 1,
      name: userName,
      content: userContent
    }, ...comments]

    this.setState({
      userName: '',
      userContent: '',
      comments: newComments
    })
  }

  render() {
    const { userName, userContent } = this.state
    return (
      <div className="app">
        <div>
          <input type="text" className="user" placeholder="请输入评论人" value={userName} name="userName" onChange={this.handleForm} />
          <br />
          <textarea className="content" cols="30" rows="10" placeholder="请输入评论内容" value={userContent} name="userContent" onChange={this.handleForm} />
          <br />
          <button onClick={this.addComment}>发表评论</button>
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