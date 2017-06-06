import React from "react";
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import actions from '../../actions'
import {bindActionCreators} from 'redux';

import styles from './style.css'
import CSSModules from 'react-css-modules'

const getPost = actions.getPost
const addPost = actions.addPost
const mapStateToProps = (state) => ({post: state.post})
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    getPost, addPost
  }, dispatch)
})

@connect(mapStateToProps, mapDispatchToProps)
@CSSModules(styles)
class Post extends React.Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    post: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  static fetchData(store) {
    return store.dispatch(actions.getPost())
  }

  componentDidMount() {
    var {match, post, actions} = this.props
    var slug = match.params.slug
    if (post && post.slug !== slug) {
      actions.getPost(slug);
    }
  }
  render() {
    var post = this.props.post || {}
    return (
        <div className="col-xs-12">
          <div dangerouslySetInnerHTML={{__html: post.htmlContent}} />
        </div>
    )
  }
}
export default Post