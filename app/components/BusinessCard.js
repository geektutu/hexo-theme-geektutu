import React from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components';
import Icon from '../static/img/icon.png'
import Github from '../static/img/github.png'
import Email from '../static/img/email.png'
import Org from '../static/img/geekcircle.png'

const Card = styled.div`
  font: 13px/1.6 "Helvetica Neue", Helvetica, Arial, sans-serif;
  color: #333333;
  border: 1px solid #DDDDDD;
  border-radius: 3px;
  padding: 10px;
  background: transparent;
  display: block;
  nav {
    height: 60px;
  }
  nav a {
    display: inline-block;
    text-align: center;
    color: #333;
  }

  nav span {
    display: block;
  }
`

const Post = styled.a`
`

const Series = styled.a`
  border-left: 1px solid #eaecef;
  border-right: 1px solid #eaecef;
`

const Tag = styled.a`
`

const Number = styled.span`
  font-size: 1.2em;
  font-weight: bold;
`

const ImgNav = styled.div`
  padding: 10px;
  border-top: 1px dashed #999;
  overflow: hidden;

  img {
    width: 30px;
    height: 30px;
  }
`

export default class BusinessCard extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let statistics = this.props.statistics
    if (!statistics.tag) {
      statistics = {tag:{}, post: 0, category: {}}
    }
    return (
      <Card className="col-xs-12">
          <nav>
              <Post href="/" className="col-xs-4"><Number>{statistics.post}</Number><span>文章</span></Post>
              <Series href="/series" className="col-xs-4">
                <Number>{Object.keys(statistics.category).length}</Number><span>专题</span>
              </Series>
              <Tag className="col-xs-4">
                <Number>{Object.keys(statistics.tag).length}</Number><span>标签</span>
              </Tag>
          </nav>

          <ImgNav>
              <a className="col-xs-4" href="https://github.com/gzdaijie/koa-react-server-render-blog"><img src={Github}/></a>
              <a className="col-xs-4" href="https://github.com/geekcircle"><img src={Org}/></a>
              <a className="col-xs-4" href="mailto:极客兔兔<gzdaijie@gmail.com>?subject=【来自】极客兔兔的博客"><img src={Email}/></a>
          </ImgNav>
      </Card>
    )   
  }
}