import renderPage from '../renderPage.js'
import path from 'path'
import fs from 'fs'

let chooseRoute = async  (ctx, next) => {
  ctx.response.type = 'application/json';

  if(!ctx.url.startsWith("/api") && !ctx.url.startsWith("/static") && !ctx.url.startsWith("/favicon.ico")) {
    console.log('render page: ', ctx.url)
    ctx.response.type = 'text/html';
    ctx.response.body = await renderPage(ctx.url)
  }
  await next()
}

let scanRoute = (router) => {
  let baseDir = path.resolve(__dirname, '../controllers')  ;
  let jsFiles = fs.readdirSync(baseDir).filter((f) => f.endsWith('.js'));

  jsFiles.forEach(file => {
    let mappings = require(path.join(baseDir, file)) || {};
    Object.keys(mappings).forEach(key => {
      let [method, path] = key.split(" ");
      if (router[method.toLowerCase()] instanceof Function) {
        router[method.toLowerCase()]('/api' + path, mappings[key])
        console.log(`register URL mapping: ${method}: /api${path}`)
      }
    })
  })
}

export {
  chooseRoute, scanRoute
}