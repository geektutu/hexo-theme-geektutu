import React from 'react'
import PropTypes from 'prop-types'
import actions from '../actions'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

const mapStateToProps = (state) => ({post: state.post})
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    getPost: actions.getPost,
    addPost: actions.addPost
  }, dispatch)
})

@connect(mapStateToProps, mapDispatchToProps)
export default class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: '',
      isArticle: true,
      canComment: true,
      slug: '',
      tags: ['Java'],
      content: '',
    }
  }

  static propTypes = {
    post: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  componentDidUpdate() {
    var post = this.props.post
    var state = this.state
    if (post && post._id  && post._id !== state._id) {
      Object.keys(state).forEach(key => (state[key] =  post[key]))
      state.tags = post.tags.map(tag => tag.name)
      this.setState(state)
    }
  }

  handleChange(e) {
    var {name, value, type} = e.target
    switch (type) {
      case 'checkbox':
        this.state[name] = !this.state[name]
        break
      default:
        this.state[name] = name === 'tags' ? (value || '').split(',') : value
    }
    this.setState(this.state);
  }

  handleSubmit(e) {
    var actions = this.props.actions
    actions.addPost(this.state)
  }

  handleGetPost() {
    var actions = this.props.actions
    actions.getPost(this.state.slug)
  }

  render() {
    return (
        <div className="col-xs-12">
          <div className="col-xs-12">
            <h1>添加文章</h1>
            <label className="col-xs-6">普通文章：<input type="checkbox" name="isArticle" checked={this.state.isArticle}
                                                    onChange={this.handleChange.bind(this)}/></label>
            <label className="col-xs-6">能否评论：<input type="checkbox" name="canComment" checked={this.state.canComment}
                                                    onChange={this.handleChange.bind(this)}/></label>
            <input type="text" name="slug" className="col-xs-10" value={this.state.slug} placeholder="slug，以html结尾"
                   onChange={this.handleChange.bind(this)}/>
            <button className="col-xs-2" onClick={this.handleGetPost.bind(this)}>获取</button>
            <input type="text" name="_id" className="col-xs-12" value={this.state._id} placeholder="_id，新增文章则不填写"
                   onChange={this.handleChange.bind(this)}/>
            <input type="text" name="tags" className="col-xs-12" value={this.state.tags.join(',')} placeholder="标签"
                   onChange={this.handleChange.bind(this)}/>
            <textarea name="content" className="col-xs-12" rows="50" placeholder="正文" value={this.state.content}
                      onChange={this.handleChange.bind(this)}/>
            <button className="col-xs-12" onClick={this.handleSubmit.bind(this)}>提交</button>
          </div>
        </div>
    )
  }
}