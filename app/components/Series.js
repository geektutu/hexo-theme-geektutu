import React from "react";
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import actions from '../actions'
import {bindActionCreators} from 'redux';
import * as dateUtil from '../util/date'
import BusinessCard from './BusinessCard'
import styled from 'styled-components';

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
const mapStateToProps = (state) => ({series: state.series, statistics: state.statistics})
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
        <div className="col-md-9 col-xs-12">
          <h1>专题</h1>
          {
            series.map(item => (
                <section id={item.category} key={item.category}>
                  <h2>{item.category}</h2>
                  <ul>
                    {renderPosts(item.posts)}
                  </ul>
                </section>
            ))
          }
        </div>
        <SideBar className="col-md-3 hidden-xs hidden-sm">
          <BusinessCard statistics={this.props.statistics}/>
          <Toc className="col-xs-12">
            <p>专题列表</p>
            <ul>
            {
              series.map(item => <li key={item.category}><a href={'#' + item.category}>{item.category} </a> </li>) 
            }
            </ul>
          </Toc>
        </SideBar>
        
        </div>
    )
  }
}
export default Series