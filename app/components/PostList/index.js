import React from "react";
import styles from './style.css'
import CSSModules from 'react-css-modules'
import {Link} from 'react-router-dom'

class PostList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div className="col-xs-12">
          <article styleName="post-list-item" className="col-xs-12 padding-lr-0">
            <div styleName="meta" className="float-right">
              <time className="text-gray">Dec 12, 2016</time>
            </div>
            <h1><a href="/" className="text-default">HTTPS 常见部署问题及解决方案</a></h1>
            <div styleName="content" className="text-default">
              <p>Hello</p>
              <p><a href="/" className="read-more">阅读全文 »</a></p>
            </div>
          </article>
        </div>
    )
  }
}
export default CSSModules(PostList, styles)