import React from 'react'
import PropTypes from 'prop-types'
import actions from '../../actions'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

const getPost = actions.getPost
const mapStateToProps = (state) => ({post: state.post})
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({getPost}, dispatch)
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
      tags: ['de', 'dd'],
      content: '',
    }
  }

  static propTypes = {
    post: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  handleChange(e) {
    var {name, value, type} = e.target
    switch (type) {
      case 'checkbox':
        this.state[name] = !this.state[name]
        break
      default:
        this.state[name] = name === 'tags' ? (value || '').split(',') : value
    }
    console.log(this.state)
    this.setState(this.state);
  }

  handleSubmit(e) {
    actions.addPost(this.state)
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
            <input type="text" name="_id" className="col-xs-12" value={this.state.id} placeholder="id"
                   onChange={this.handleChange.bind(this)}/>
            <input type="text" name="slug" className="col-xs-12" value={this.state.slug} placeholder="slug，以html结尾"
                   onChange={this.handleChange.bind(this)}/>
            <input type="text" name="tags" className="col-xs-12" value={this.state.tags.join(',')} placeholder="标签"
                   onChange={this.handleChange.bind(this)}/>
            <textarea name="content" className="col-xs-12" rows="50" placeholder="正文" value={this.state.content}
                      onChange={this.handleChange.bind(this)}/>
            <button onClick={this.handleSubmit.bind(this)}>提交</button>
          </div>
        </div>
    )
  }
}