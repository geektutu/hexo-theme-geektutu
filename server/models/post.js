import {Schema} from 'mongoose'
import createModel from './createModel'
import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'
import content from '../plugin/markdown-it-toc'
import { Tag } from '../models'

const MAX_TAG_COUNT = 10

const md = MarkdownIt({
  html: true,
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, str).value;
      } catch (__) {}
    }
    return '';
  }
}).use(content, {
  depth: 3,
  className: 'table-of-contents'
});

let PostSchema = new Schema({
  // slug
  slug: {
    type: String,
    index: true,
    trim: true,
    lowercase: true,
    unique: true,
    minlength: [3, 'Slug 长度不能少于 3 位或大于 32 字节'],
    maxlength: [100, 'Slug 长度不能少于 3 位或大于 32 字节'],
    match: [/^[0-9a-zA-Z_-]+\.html$/, 'Slug 只允许使用小写英文，数字和 _-']
  },
  tags: [
    {
      type: String,
      index: true,
      ref: 'Tag',
      required: true,
    }
  ],
  category: {
    type: String,
    default: '未分类',
    required: [true, '分类不能为空']
  },
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
    default: '',
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
  previous: {
    type: Object
  },
  next: {
    type: Object
  },
  canComment: {
    type: Boolean,
    default: true
  },
  isArticle: {
    type: Boolean,
    default: true
  },
  index: {
    type: Number,
    default: 9999
  }
});

PostSchema.path('tags').set(function (tags) {
  if (!this.$_oldTags) {
    this.$_oldTags = this.get('tags')
  }
  console.log('path tags set ', tags)
  return tags
})

PostSchema.path('tags').validate(function (tags) {
  console.log('path tags validate ', tags)
  return tags.length <= MAX_TAG_COUNT
}, `标签数不能大于 ${MAX_TAG_COUNT} 个 ({PATH})`)

PostSchema.pre('save', async function (next) {
  console.log('pre post save')
  this.set('updatedAt', new Date())
  let content = this.get('content')
  // 更新HTML文本
  if (this.isModified('content') && !this.isModified('htmlContent')) {
    let i = content.indexOf('\n')
    let _content = content.substr(0, i) + '\n{!toc}\n' + content.substr(i);
    this.set('htmlContent', md.render(_content))
  }
  // 更新摘要
  if (this.isModified('content') && !this.isModified('excerpt')) {
    this.set('excerpt', content.substr(content.indexOf('\n') + 1, 200).replace(/#/gm, '').replace(/\n|"|`|'/gm, ' '))
  }
  // 更新标签
  if (this.isModified('tags')) {
    let tags = this.get('tags')
    let oldTags = this.$_oldTags || []
    let addTags = tags.filter(id => oldTags.indexOf(id) === -1)
    let delTags = oldTags.filter(id => tags.indexOf(id) === -1)
    if (addTags.length) {
      await Tag.update({_id: {$in: addTags}}, {$inc: {count: 1}}, {multi: true})
    }
    if (delTags.length) {
      await Tag.update({_id: {$in: delTags}, count: {$gt: 0}}, {$inc: {count: -1}}, {multi: true})
    }
    await Tag.remove({count: {$lte: 0}}).exec()
  }
  next()
});

const Post = createModel('Post', PostSchema);

export default Post