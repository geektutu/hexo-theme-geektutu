import { Tag, Post } from '../models'

export default {
  'GET /tags': async(ctx, next) => {
    ctx.response.body = {
      'tags': await Tag.find({})
    };
  },

  'GET /tags/:id': async(ctx, next) => {
    let  id = ctx.params.id;
    ctx.response.body = {
      'tag': await Tag.findOne({id})
    };
  },
  'GET /tags/:id/posts': async(ctx, next) => {
    ctx.response.body = {
      'posts': await Post.find({tags: {$in: [ctx.params.id]}})
    };
  },

  'POST /tags': async(ctx, next) => {
    var tag = new Tag(ctx.request.body)
    await tag.save()
    ctx.response.body = {
      'tag': tag
    };
  }
}