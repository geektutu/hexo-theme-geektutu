import React from 'react';
import ReactDOMServer from "react-dom/server";
import {StaticRouter} from "react-router";
import {Provider} from "react-redux";
import {matchRoutes} from "react-router-config";
import configureStore from "../app/configureStore";
import App from "../app/components/App";
import routes from "../app/routes";

module.exports = async(url) => {
  let store = configureStore()
  let title = "呆兔兔的小站"
  const branch = matchRoutes(routes, url)
  const promises = branch.map(({route, match}) => {
    var comp = route.component
    var fetchData = comp.fetchData
    if (comp.title) {
      title = comp.title
    }
    return fetchData instanceof Function ? fetchData(store, match) : Promise.resolve(null)
  })

  return Promise.all(promises).then(() => {
    let context = {}
    const content = ReactDOMServer.renderToString(
        <Provider store={store}>
          <StaticRouter location={url} context={context}>
            <App/>
          </StaticRouter>
        </Provider>
    );

    var propsScript = 'window.__REDUX_DATA__ = ' + JSON.stringify(store.getState());

    if (url.startsWith('/post')) {
      title = (store.getState().post || {title: "文章"}).title + " | 呆兔兔的小站"
    }

    var appJs = url.startsWith('/admin') ? '<script type="text/javascript" src="/app.js"></script>' : ''

    return `
      <!DOCTYPE html>
      <html lang="zh-CN">
      <head>
        <title>${title}</title>
        <meta charset="utf-8"/>
        <meta name="renderer" content="webkit" />
        <meta name="force-rendering" content="webkit" />
        <meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        <meta name="viewport" content="width=device-width, initial-scale=0.5, maximum-scale=2,user-scalable=1" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="stylesheet" href="/app.css">
      </head>
      <body>
      <div id='app' className="col-xs-12 padding-0">${content}</div>
      ${appJs}
      <script>
        window.onload = function () {
          var a_s = document.querySelectorAll('a')
          a_s.forEach((item) => {
            if (item.href && !(item.href.startsWith('/') || item.href.indexOf('imtuzi') !== -1)) {
              item.target = '_blank'
            }
          })
        }
      </script>
      </body>
      </html>
    `
  })
}