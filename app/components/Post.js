import React from "react";
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import styled from 'styled-components';

import actions from '../actions'
import {bindActionCreators} from 'redux'
import * as dateUtil from '../util/date'

import BusinessCard from './BusinessCard'


const ContentContainer = styled.div`
  float: left;
`

const SideBar = styled.div`
  float: left;
  margin-top: 50px;
  padding-left: 10px;
` 

const Toc = styled.div`
  padding: 30px 0;

  #toc {
    border-left: 1px solid #eaecef;
    padding-left: 15px;
  }

  a {
    display: block;
    color: #000;
    font-size: 14px;
  }

  li > p {
    margin: 0;
  }

  ul {
    padding-left: 18px;
    margin: 0;
    list-style-type: square;
  }
`

const Related = styled.div`
  padding: 30px 0 30px 15x;
  border-left: 1px solid #eaecef;
  font-size: 14px;

  ul {
    padding-left: 18px;
    margin: 0;
    list-style-type: square;
  }
`

const getPost = actions.getPost
const addPost = actions.addPost
const mapStateToProps = (state) => ({post: state.post, statistics: state.statistics})
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    getPost, addPost
  }, dispatch)
})

@connect(mapStateToProps, mapDispatchToProps)
class Post extends React.Component {
  constructor(props) {
    super(props);
  }

  static fetchData(store, match) {
    var slug = match.params.slug
    return store.dispatch(actions.getPost(slug))
  }

  fetchPost() {
    var {match, post, actions} = this.props
    var slug = match.params.slug
    if (post && post.slug !== slug) {
      actions.getPost(slug);
    }
  }

  componentDidUpdate() {
    this.fetchPost()
  }

  componentDidMount() {
    this.fetchPost()
  }

  render() {
    var post = this.props.post
    var tags = post.tags || []
    var related = post.related || []
    var pre = post.previous || {}
    var next = post.next || {}
    if (typeof window !== 'undefined') {
      window.document.title = post.title + " | 极客兔兔的小站"
    }
    return (
        <div className="col-xs-12 post">
          <ContentContainer className="col-md-9 col-xs-12">
            <article dangerouslySetInnerHTML={{__html: post.htmlContent}}/>
            <hr/>
            <p><span>标签：</span>{tags.map(item => (<code key={item._id} className="post-label">{item.name}</code>))}</p>
            <p>本站使用 <a href="https://creativecommons.org/licenses/by/4.0/deed.zh">「署名 4.0 国际」</a> 创作共享协议，转载请注明出处</p>
            <hr/>
            <div>
              {pre.slug && <Link className="float-left" to={'/post/' + pre.slug}>« {pre.title}</Link>}
              {next.slug && <Link className="float-right" to={'/post/' + next.slug}>{next.title} »</Link>}
            </div>
            <div id="lv-container" data-id="city" data-uid="MTAyMC8zMjQ5Mi85MDUz"></div>
          </ContentContainer>
          <SideBar className="col-md-3 hidden-xs hidden-sm">
            <BusinessCard statistics={this.props.statistics}/>
            <Toc className="col-xs-12" dangerouslySetInnerHTML={{__html: post.toc}}/>
            <Related className="col-xs-12">
              {related.length > 0 && <p>相关文章</p> }
              <ul>{related.map(item => (
                  <li key={item._id}>
                    <Link to={'/post/' + item.slug}>{item.title}</Link>
                  </li>
              ))}</ul>
            </Related>
          </SideBar>
        </div>
    )
  }
}

export default Post