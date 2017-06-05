import React from "react";
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import actions from '../../actions'
import {bindActionCreators} from 'redux';

import styles from './style.css'
import CSSModules from 'react-css-modules'

const updatePosts = actions.updatePosts
const mapStateToProps = (state) => ({posts: state.posts})
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    updatePosts
  }, dispatch)
})

@connect(mapStateToProps, mapDispatchToProps)
@CSSModules(styles)
class Series extends React.Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    posts: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired,
  };

  static fetchData(store) {
    return store.dispatch(actions.updatePosts)
  }

  componentDidMount() {
    var {posts, actions} = this.props
    if (posts && posts.length === 0) {
      actions.updatePosts();
    }
  }

  render() {
    var {posts, actions} = this.props
    return (
        <div className="col-xs-12">
          {
            posts.map(item => (
                <article key={item._id} styleName="post-list-item" className="col-xs-12 padding-lr-0">
                  <div styleName="meta" className="float-right">
                    <time className="text-gray">{item.createdAt}</time>
                  </div>
                  <h1><a href="/" className="text-default">{item.title}</a></h1>
                  <div styleName="content" className="text-default">
                    <p>{item.excerpt}</p>
                    <p><a href="/" className="read-more">阅读全文 »</a></p>
                  </div>
                </article>
            ))
          }
        </div>
    )
  }
}
export default Series