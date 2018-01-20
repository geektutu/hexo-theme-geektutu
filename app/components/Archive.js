import React from "react";
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import actions from '../actions'
import {bindActionCreators} from 'redux'
import * as dateUtil from '../util/date'

const getPosts = actions.getPosts
const mapStateToProps = (state) => ({archives: state.archives})
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    getPosts
  }, dispatch)
})

@connect(mapStateToProps, mapDispatchToProps)
class Archive extends React.Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    archives: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired,
  };

  static fetchData(store) {
    return store.dispatch(actions.getPosts('date'))
  }

  static title = "归档 | 极客兔兔的小站"

  componentDidMount() {
    var {archives, actions} = this.props
    if (archives && archives.length === 0) {
      actions.getPosts('date');
    }
  }

  render() {
    if (typeof window !== 'undefined') {
      window.document.title = Archive.title
    }
    var archives = this.props.archives || []
    archives.map(item =>(item.disDate = `${item.date.year}-${item.date.month}`))
    var renderPosts = (posts) => posts.map(post => (
        <li key={post._id}>
          <Link to={'/post/' + post.slug}>{post.title}</Link>
          <span className="post-created-time">({dateUtil.toDateString(post.createdAt)})</span>
        </li>
    ))

    return (
        <div className="col-xs-12 archives">
          <h1>归档</h1>
          {
            archives.map(item => (
                <section key={item.disDate}>
                  <h2>{item.disDate}</h2>
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
export default Archive