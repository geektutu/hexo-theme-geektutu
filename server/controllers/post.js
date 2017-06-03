import { Post, Tag } from '../models'

let tagNames2TagIds = async (tagNames) => {
  let tags = []
  // 去重
  let _tagNames = tagNames.filter((item, pos) => tagNames.indexOf(item) === pos)
  // 外键引用
  for(let i = 0; i < _tagNames.length; i++) {
    let name = _tagNames[i]
    if (name.length === 24) {
      tags.push(name)
      continue
    }
    let tag = (await Tag.findOne({name})) || (await new Tag({name}).save())
    tags.push(tag._id)
  }

  return tags
}


export default {
  'GET /posts': async(ctx, next) => {
    ctx.response.body = {
      'posts': await Post.find({}).populate('tags')
    };
  },
  'GET /posts/tags/:id': async(ctx, next) => {
    ctx.response.body = {
      'posts': await Post.find({tags: {$in: [ctx.params.id]}}).populate('tags')
    };
  },

  'GET /posts/:id': async(ctx, next) => {
    let  id = ctx.params.id;
    ctx.response.body = {
      'post': await Post.findOne({id}).populate('tags')
    };
  },

  'POST /posts': async(ctx, next) => {
    let body = ctx.request.body
    let _id = body._id, post

    body.tags = await tagNames2TagIds(body.tags)
    if (_id) {
      post =  await Post.findOne({_id})
      Post.find({tags: {$in: [_id]}}).populate('tags')
    }
    if(!post) {
      post = new Post(body)
    }
    post.set('updatedAt', new Date())
    post.set('slug', body.slug)
    post.set('title', body.title)
    post.set('content', body.content)
    post.set('tags', body.tags)

    await post.save()
    ctx.response.body = {
      'post': post
    };
  }
}