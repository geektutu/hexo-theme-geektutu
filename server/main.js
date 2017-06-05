require("babel-core/register");

const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const router = require('koa-router')();
const logger = require('koa-logger');
const serve = require('koa-static');
const { scanRoute, chooseRoute } = require('./router');
const config = require('./config')

const app = new Koa();

scanRoute(router)

app.use(serve(config.STATIC_DIR));
app.use(chooseRoute);
app.use(bodyParser());
app.use(router.routes());

app.listen(config.HOST_PORT);
console.log('app started at port ', config.HOST_PORT);
console.log('app server static dir at ', config.STATIC_DIR);