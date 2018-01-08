import React from 'react';
import ReactDOMServer from "react-dom/server";
import {StaticRouter} from "react-router";
import {Provider} from "react-redux";
import {matchRoutes} from "react-router-config";
import configureStore from "../app/configureStore";
import App from "../app/components/App";
import routes from "../app/routes";
import {STATIC_DIR} from './config'
import fs from 'fs'

const template = fs.readFileSync(STATIC_DIR + '/index.html', 'utf-8')
    .replace('<script type="text/javascript" src="/app.js"></script>', '')

module.exports = async(url) => {
  let store = configureStore()
  let title = "极客兔兔的小站"
  let desc = "极客兔兔的小站，博主毕业于复旦大学计算机学院，致力于分享一些技术教程和有趣的技术实践。"
  let keywords = "极客兔兔的小站,极客兔兔"
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
    let post = store.getState().post

    if (url.startsWith('/post')) {
      title = ( post || {title: "文章"}).title + " | 极客兔兔的小站"
      desc = post.excerpt || desc
      keywords = (post.tags || []).map(item => item.name).join(",") + "," + keywords
    }

    return template.replace('${title}', title).replace('${keywords}', keywords).replace('${desc}', desc).replace('${content}', content)
  })
}