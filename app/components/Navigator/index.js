import React from "react"
import styles from './style.css'
import CSSModules from 'react-css-modules'
import {Link} from 'react-router-dom'

class Navigator extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div className="col-xs-12 text-center">
          <div styleName="icon"></div>
          <h1 styleName="name">
            <Link to="/">呆尐兔兔</Link>
          </h1>
          <nav styleName="main-link">
            <ul>
              <li><Link to="/">首页</Link></li>
              <li><Link to="/series">专题</Link></li>
              <li><Link to="/archives">归档</Link></li>
              <li><Link to="/post/about.html">关于</Link></li>
            </ul>
          </nav>
          <nav styleName="sub-link">
            <ul>
              <li><a target="_blank" href="https://github.com/gzdaijie/koa-react-server-render-blog" styleName="icon-github"></a></li>
              <li><Link to="/search" styleName="icon-search"></Link></li>
            </ul>
          </nav>
        </div>
    )
  }
}

export default CSSModules(Navigator, styles, {allowMultiple: true})