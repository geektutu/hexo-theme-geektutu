import React from "react"
import {Link} from 'react-router-dom'
import styled from 'styled-components';

import Icon from '../static/img/icon.png'

const NavList = styled.nav`
   li {
    display: inline-block;
    padding: 0 10px;
    margin-bottom: 0;
   }

   ul {
    padding: 20px 0;
    list-style: none;
  }
  
  a {
    text-decoration: none;
    color: white;
    font-size: 18px;
    text-shadow: 0 1px #666;
  }
  
  a:hover,
  a:focus {
    color: #e6e6e6;
  }
`

const NavIcon = styled.div`
  border-radius: 50%;
  height: 120px;
  width: 120px;
  margin: 10px auto;
  background-image: url(${Icon});
  background-size: cover;
`

export default class Navigator extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div className="col-xs-12 text-center">
          <NavIcon/>
          <p className="nav-name">
            <Link to="/" className="no-text-decoration">极客兔兔</Link>
          </p>
          <NavList>
            <ul>
              <li><Link to="/">首页</Link></li>
              <li><Link to="/series">专题</Link></li>
              <li><Link to="/archives">归档</Link></li>
              <li><Link to="/post/link.html">友链</Link></li>
              <li><Link to="/post/about.html">关于</Link></li>
            </ul>
          </NavList>
        </div>
    )
  }
}