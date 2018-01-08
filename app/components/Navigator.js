import React from "react"
import {Link} from 'react-router-dom'

export default class Navigator extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div className="col-xs-12 text-center">
          <div className="nav-icon"></div>
          <p className="nav-name">
            <Link to="/" className="no-text-decoration">极客兔兔</Link>
          </p>
          <nav className="nav-main-link">
            <ul>
              <li><Link to="/">首页</Link></li>
              <li><Link to="/series">专题</Link></li>
              <li><Link to="/archives">归档</Link></li>
              <li><Link to="/post/about.html">关于</Link></li>
            </ul>
          </nav>
          <nav className="nav-sub-link">
            <ul>
              <li><a target="_blank" href="https://github.com/gzdaijie/koa-react-server-render-blog" className="nav-icon-github" /></li>
              <li><Link to="/search" className="nav-icon-search" /></li>
            </ul>
          </nav>
        </div>
    )
  }
}