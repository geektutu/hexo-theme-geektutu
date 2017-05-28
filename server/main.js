require("babel-core/register");

const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const router = require('koa-router')();
const logger = require('koa-logger');
const serve = require('koa-static');
const path = require('path');

const app = new Koa();
const scanController = require('./controller');

scanController(router)

app.use(bodyParser());
app.use(router.routes());

app.use(serve(path.resolve(__dirname, '../build')));

app.listen(3001);
console.log('app started at port 3001...');