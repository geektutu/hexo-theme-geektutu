import React from 'react';
import ReactDOMServer from "react-dom/server";
import {StaticRouter} from "react-router";
import {Provider} from "react-redux";
import {matchRoutes} from "react-router-config";
import configureStore from "../app/configureStore";
import App from "../app/components/App/index";
import routes from "../app/routes";

module.exports = async (url) => {
  let store = configureStore()
  const branch = matchRoutes(routes, url)
  const promises = branch.map(({route, match}) => {
    var fetchData = route.component.fetchData
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
    return `
      <!DOCTYPE html>
      <html lang="zh-CN">
      <head>
        <title>呆尐兔兔的小站</title>
        <meta charset="utf-8"/>
        <meta name="renderer" content="webkit" />
        <meta name="force-rendering" content="webkit" />
        <meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        <meta name="viewport" content="width=device-width, initial-scale=0.5, maximum-scale=2,user-scalable=1" />
        <link rel="stylesheet" href="/app.css">
      </head>
      <body>
      <div id='app' className="col-xs-12 padding-0">${content}</div>
      <script>${propsScript}</script>
      <script src="/app.js"></script>
      </body>
      </html>
    `
  })
}