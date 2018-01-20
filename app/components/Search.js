import React from "react";

export default class PostList extends React.Component {
  constructor(props) {
    super(props);
  }

  static title = "搜索 | 极客兔兔的小站"

  render() {
    if (typeof window !== 'undefined') {
      window.document.title = PostList.title
    }

    return (
        <div className="col-xs-12">
          <input type="text" placeholder="搜点啥呢..."/>
          <h2>搜索结果</h2>
          <ul>
            <li>哈哈，没啥</li>
          </ul>
        </div>
    )
  }
}