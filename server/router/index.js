import renderPage from '../renderPage.js'
import controllers from '../controllers'
import cache from 'memory-cache'

let pageCache = {}
const EXPIRE = 60 * 1000

let chooseRoute = async(ctx, next) => {
  ctx.response.type = 'application/json';
  if (!ctx.url.startsWith("/api")) {
    if (!pageCache[ctx.url]) {
      cache.put(ctx.url, await renderPage(ctx.url), EXPIRE)
      pageCache[ctx.url] = cache.get(ctx.url)
    }
    
    if(!cache.get(ctx.url)) {
      setTimeout(async() => {
        cache.put(ctx.url, await renderPage(ctx.url), EXPIRE)
        pageCache[ctx.url] = cache.get(ctx.url)
      }, 0)
    }

    ctx.set('Cache-Control', 'private, max-age=500')
    ctx.response.type = 'text/html';
    ctx.response.body = pageCache[ctx.url]
  }
  await next()
}

let scanRoute = (router) => {
  Object.keys(controllers).forEach(key => {
    let [method, path] = key.split(" ");
    if (router[method.toLowerCase()] instanceof Function) {
      router[method.toLowerCase()]('/api' + path, controllers[key])
      console.log(`register URL mapping: ${method}: /api${path}`)
    }
  })
}

export {
    chooseRoute, scanRoute
}