import React from "react";
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import actions from '../actions'
import {bindActionCreators} from 'redux'
import * as dateUtil from '../util/date'
import styled from 'styled-components';
import BusinessCard from './BusinessCard'

const SideBar = styled.div`
  float: left;
  margin-top: 50px;
  padding-left: 10px;
` 

const Toc = styled.div`
  margin-top: 30px;
  padding: 0  0 0 15px;
  border-left: 1px solid #eaecef;

  a {
    display: block;
    color: #000;
    font-size: 14px;
  }

  ul {
    padding-left: 18px;
    margin: 0;
    list-style-type: square;
  }
`

const getPosts = actions.getPosts
const mapStateToProps = (state) => ({archives: state.archives, statistics: state.statistics})
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
    archives.map(item =>(item.disDate = `${item.date.year}年${item.date.month}月`))
    var renderPosts = (posts) => posts.map(post => (
        <li key={post._id}>
          <Link to={'/post/' + post.slug}>{post.title}</Link>
          <span className="post-created-time">({dateUtil.toDateString(post.createdAt)})</span>
        </li>
    ))

    return (
        <div className="col-xs-12 archives">
          <div className="col-xs-12 col-md-9">
            <h1>归档</h1>
            {
              archives.map(item => (
                  <section key={item.disDate} id={item.disDate}>
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
          <SideBar className="col-md-3 hidden-xs hidden-sm">
            <BusinessCard statistics={this.props.statistics}/>
            <Toc className="col-xs-12">
              <p>归档列表</p>
              <ul>
              {
                archives.map(item => <li><a href={'#' + item.disDate}>{item.disDate} </a> </li>) 
              }
              </ul>
            </Toc>
          </SideBar>
        </div>
    )
  }
}
export default Archive