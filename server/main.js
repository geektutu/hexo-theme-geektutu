require("babel-core/register");

const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const router = require('koa-router')();
const logger = require('koa-logger');
const staticCache = require('koa-static-cache');

const { scanRoute, chooseRoute } = require('./router');
const config = require('./config')
const auth = require('koa-basic-auth')
const mount = require('koa-mount')

const app = new Koa();
const authInfo = auth({ name: config.ADMIN_USER_NAME, pass: config.ADMIN_PASSWORD });


scanRoute(router)

app.use(async function(ctx, next) {
  try {
    await next();
    ctx.set('X-Frame-Options', 'DENY')
  } catch (err) {
    if (err.status === 401) {
      ctx.status = 401;
      ctx.set('WWW-Authenticate', 'Basic realm="sign in"');
      ctx.body = 'authenticate';
    } else {
      throw err;
    }
  }
})

app.use(mount('/api/admin', authInfo));
app.use(staticCache(config.STATIC_DIR, {
  maxAge: 60 * 60
}));

app.use(chooseRoute);
app.use(bodyParser());
app.use(router.routes());

app.listen(config.HOST_PORT);

console.log('app started at port ', config.HOST_PORT);
console.log('app server static dir at ', config.STATIC_DIR);