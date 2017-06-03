import { Tag } from '../models'

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
  }
}