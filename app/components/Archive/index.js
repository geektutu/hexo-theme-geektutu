import React from "react";
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import actions from '../../actions'
import {bindActionCreators} from 'redux';

import styles from './style.css'
import CSSModules from 'react-css-modules'

const updatePosts = actions.updatePosts
const mapStateToProps = (state) => ({archives: state.archives})
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    updatePosts
  }, dispatch)
})

@connect(mapStateToProps, mapDispatchToProps)
@CSSModules(styles)
class Archive extends React.Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    archives: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired,
  };

  static fetchData(store) {
    return store.dispatch(actions.updatePosts('date'))
  }

  componentDidMount() {
    var {archives, actions} = this.props
    if (archives && archives.length === 0) {
      actions.updatePosts('date');
    }
  }

  render() {
    var {archives} = this.props
    archives.map(item =>(item.disDate = `${item.date.year}-${item.date.month}`))
    var renderPosts = (posts) => posts.map(post => (<li key={post._id}>{post.title}</li>))

    return (
        <div className="col-xs-12">
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