import React from "react";
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import actions from '../../actions'
import {bindActionCreators} from 'redux';

import styles from './style.css'
import CSSModules from 'react-css-modules'

const updatePosts = actions.updatePosts
const mapStateToProps = (state) => ({series: state.series})
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
    series: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired,
  };

  static fetchData(store) {
    return store.dispatch(actions.updatePosts('tag'))
  }

  componentDidMount() {
    var {series, actions} = this.props
    if (series && series.length === 0) {
      actions.updatePosts('tag');
    }
  }

  render() {
    var {series} = this.props
    var renderPosts = (posts) => posts.map(post => (<li key={post._id}>{post.title}</li>))

    return (
        <div className="col-xs-12">
          <h1>专题</h1>
          {
            series.map(item => (
                <section key={item.tag.name}>
                  <h2>{item.tag.name}</h2>
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