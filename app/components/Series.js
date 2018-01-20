import React from "react";
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import actions from '../actions'
import {bindActionCreators} from 'redux';
import * as dateUtil from '../util/date'

const getPosts = actions.getPosts
const mapStateToProps = (state) => ({series: state.series})
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    getPosts
  }, dispatch)
})

@connect(mapStateToProps, mapDispatchToProps)
class Series extends React.Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    series: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired,
  };

  static fetchData(store) {
    return store.dispatch(actions.getPosts('category'))
  }
  static title = "专题 | 极客兔兔的小站"

  componentDidMount() {
    var {series, actions} = this.props
    if (series && series.length === 0) {
      actions.getPosts('category');
    }
  }

  render() {
    if (typeof window !== 'undefined') {
      window.document.title = Series.title
    }
    var series = this.props.series || []
    var renderPosts = (posts) => posts.map(post => (
        <li key={post._id}>
          <Link to={'/post/' + post.slug }>{post.title}</Link>
          <span className="post-created-time">({dateUtil.toDateString(post.createdAt)})</span>
        </li>
    ))

    return (
        <div className="col-xs-12 series">
          <h1>专题</h1>
          {
            series.map(item => (
                <section key={item.category}>
                  <h2>{item.category}</h2>
                  <ul>
                    {
                      renderPosts(item.posts)
                    }
                  </ul>
                </section>
            ))
          }
        </div>
    )
  }
}
export default Series