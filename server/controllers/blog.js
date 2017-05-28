import monk from 'monk'
const db = monk('localhost/blog');

export default {
  'GET /blogs': async(ctx, next) => {
    ctx.response.type = 'application/json';
    ctx.response.body = {
      'blogs': await db.get('blogs').find({})
    };
  }
}