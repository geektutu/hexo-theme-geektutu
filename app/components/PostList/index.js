import React from "react";
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import actions from '../../actions'
import {bindActionCreators} from 'redux';
import * as dateUtil from '../../util/date'

import styles from './style.css'
import CSSModules from 'react-css-modules'

const getPosts = actions.getPosts
const mapStateToProps = (state) => ({posts: state.posts})
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    getPosts
  }, dispatch)
})

@connect(mapStateToProps, mapDispatchToProps)
@CSSModules(styles)
class PostList extends React.Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    posts: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired,
  };

  static fetchData(store) {
    return store.dispatch(actions.getPosts)
  }

  componentDidMount() {
    var {posts, actions} = this.props
    if (posts && posts.length === 0) {
      actions.getPosts();
    }
  }

  render() {
    var posts = this.props.posts
    return (
        <div className="col-xs-12" styleName="post-list">
          {
            posts.map(item => (
                <article key={item._id} styleName="post-list-item" className="col-xs-12 padding-lr-0">
                  <div styleName="meta" className="float-right">
                    <time>{dateUtil.toDateString(item.createdAt)}</time>
                  </div>
                  <h1 styleName="title">
                    <Link to={'/post/' + item.slug}>{item.title}</Link>
                  </h1>
                  <div styleName="content">
                    <p>{item.excerpt}</p>
                    <p><Link to={'/post/' + item.slug} className="read-more">阅读全文 »</Link></p>
                  </div>
                </article>
            ))
          }
          <p className="text-center col-xs-12" styleName="direct">
            <Link to="/archives">博客归档</Link>
          </p>
        </div>
    )
  }
}
export default PostList