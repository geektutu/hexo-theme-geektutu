import renderPage from '../renderPage.js'
import controllers from '../controllers'

let chooseRoute = async(ctx, next) => {
  ctx.response.type = 'application/json';

  console.log('chooseRoute: ', ctx.url)

  if (!ctx.url.startsWith("/api") && !ctx.url.startsWith("/favicon.ico")) {
    console.log('render page: ', ctx.url)
    ctx.response.type = 'text/html';
    ctx.response.body = await renderPage(ctx.url)
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