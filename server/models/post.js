import {Schema} from 'mongoose'
import createModel from './createModel'
import MarkdownX from 'markdown-x'
import MarkdownXNode from 'markdown-x/dist/node'
import {Tag} from './index'

const Types = Schema.Types

let PostSchema = new Schema({
  // slug
  slug: {
    type: String,
    index: true,
    trim: true,
    lowercase: true,
    unique: true,

    minlength: [3, 'Slug 长度不能少于 3 位或大于 32 字节'],
    maxlength: [32, 'Slug 长度不能少于 3 位或大于 32 字节'],
    match: [/^[0-9a-z_-]+$/, 'Slug 只允许使用小写英文，数字和 _-'],
    set(value) {
      return value || undefined
    },
    validate: [
      {
        validator: function (slug) {
          if (slug.length != 24) {
            return true
          }
          try {
            new Types.ObjectId(slug)
          } catch (e) {
            return true
          }
          return false
        },
        message: 'Slug 不能是 ID ({PATH})',
      }
    ]
  },
  tags: [
    {
      type: String,
      index: true,
      ref: 'Tag',
      required: true,
    }
  ],
  createdAt: {
    type: Date,
    index: true,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    index: true,
    default: Date.now,
  },
  title: {
    type: String,
    required: [true, '标题不能为空'],
    maxlength: [128, '标题不能长度不能大于 128 字节 {PATH}'],
  },
  content: {
    type: String,
    required: [true, '内容不能为空'],
    maxlength: [1024 * 128, '内容不能大于 128KB {PATH}'],
  },
  htmlContent: {
    type: String,
    default: '',
  },
  excerpt: {
    type: String,
  },
  images: [{
    type: String,
    required: true,
  }],
});

let toMarkdown = (data) => {
  var node = new MarkdownXNode
  new MarkdownX(data).toNode(node)
  return node.toHtml()
}
PostSchema.pre('save', async function (next) {
  let content = this.get('content')
  if (this.isModified('content') && !this.isModified('htmlContent')) {
    this.set('htmlContent', toMarkdown(content))
  }
  if (this.isModified('content') && !this.isModified('excerpt')) {
    this.set('excerpt', content.substr(0, 100))
  }
  next()
});


const Post = createModel('Post', PostSchema);

export default Post