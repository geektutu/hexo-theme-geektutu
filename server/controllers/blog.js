const monk = require('monk');
const db = monk('localhost/blog');
import {RouterContext, match} from 'react-router';
import store from '../../app/store'
import routes from '../../app/routes'

var render = require("../render");

module.exports = {
  'GET /blogs': async(ctx, next) => {
    ctx.response.type = 'application/json';
    ctx.response.body = {
      'blogs': await db.get('blogs').find({})
    };
  },

  'GET /counter': async(ctx, next) => {
    ctx.response.type = 'text/html';
    ctx.response.body = await render(ctx.url)
    console.log('haha')
  }
}

