import React from "react";

import styles from './style.css'
import CSSModules from 'react-css-modules'

@CSSModules(styles)
class PostList extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
  }

  render() {
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
export default PostList