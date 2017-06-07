import React from 'react'
import actions from '../../actions'

export default class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: '',
      slug: '',
      tags: ['de','dd'],
      content: '',
    }
  }
  handleChange(e) {
    var { name, value } = e.target
    this.state[name] = name === 'tags' ? (value || '').split(',') : value
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
            <input type="text" name="_id" className="col-xs-12" value={this.state.id} placeholder="id" onChange={this.handleChange.bind(this)} />
            <input type="text" name="slug" className="col-xs-12" value={this.state.slug} placeholder="slug，以html结尾" onChange={this.handleChange.bind(this)}/>
            <input type="text" name="tags" className="col-xs-12" value={this.state.tags.join(',')} placeholder="标签"onChange={this.handleChange.bind(this)}/>
            <textarea name="content" className="col-xs-12" rows="50" placeholder="正文" value={this.state.content} onChange={this.handleChange.bind(this)}></textarea>
            <button onClick={this.handleSubmit.bind(this)}>提交</button>
          </div>
        </div>
    )
  }
}