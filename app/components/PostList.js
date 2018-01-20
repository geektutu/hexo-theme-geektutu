import React from "react";
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import actions from '../actions'
import {bindActionCreators} from 'redux';
import * as dateUtil from '../util/date'

const getPosts = actions.getPosts
const mapStateToProps = (state) => ({posts: state.posts})
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    getPosts
  }, dispatch)
})

@connect(mapStateToProps, mapDispatchToProps)
class PostList extends React.Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    posts: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired,
  };

  static fetchData(store) {
    return store.dispatch(actions.getPosts())
  }

  static title = "极客兔兔的小站 | 一只专注于技术分享的兔子"

  componentDidMount() {
    var {posts, actions} = this.props
    if (posts && posts.length === 0) {
      actions.getPosts();
    }
  }

  render() {
    if (typeof window !== 'undefined') {
      window.document.title = PostList.title
    }
    var posts = this.props.posts
    return (
        <div className="col-xs-12">
          <h1 className="no-display">最近的文章列表</h1>
          {
            posts.map(item => (
                <article key={item._id} className="post-list-item col-xs-12 padding-lr-0">
                  <div className="post-list-item-meta float-right">
                    <time>{dateUtil.toDateString(item.createdAt)}</time>
                  </div>
                  <p className="post-list-item-title">
                    <Link to={'/post/' + item.slug}>{item.title}</Link>
                  </p>
                  <div>
                    <p>{item.excerpt}</p>
                    <p><Link to={'/post/' + item.slug} className="text-center">阅读全文 »</Link></p>
                  </div>
                </article>
            ))
          }
          <p className="text-center col-xs-12 post-list-link">
            <Link to="/archives">博客归档</Link>
          </p>
        </div>
    )
  }
}
export default PostList