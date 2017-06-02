import { Schema } from 'mongoose'
import createModel from './createModel'

let TagSchema = new Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  name: {
    type: String,
    unique: true,
    trim: true,
    required: [true, '标签名称不能为空'],
    minlength: [2, '标签名称长度不能少于 2 位或大于 10 字节 ({PATH})'],
    maxlength: [10, '标签名称长度不能少于 2 位或大于 10 字节 ({PATH})'],
    set(name) {
      return String(name).replace(/\s+/g, ' ').trim()
    }
  },
  count: {
    type: Number,
    index: true,
    default: 0,
  }
});

const Tag = createModel('Tag', TagSchema);

export default Tag
