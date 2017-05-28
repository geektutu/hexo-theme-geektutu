export default  {
  'GET /count': async(ctx, next) => {
    ctx.response.type = 'application/json';
    ctx.response.body = {
      'count': 100
    };
  }
}