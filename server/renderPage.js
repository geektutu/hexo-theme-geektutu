import React from 'react';
import ReactDOMServer from "react-dom/server";
import {StaticRouter} from "react-router";
import {Provider} from "react-redux";
import {matchRoutes} from "react-router-config";
import configureStore from "../app/configureStore";
import App from "../app/App";
import routes from "../app/routes";

module.exports = async function (url) {
  let store = configureStore()
  const branch = matchRoutes(routes, url)
  const promises = branch.map(({route}) => {
    var fetchData = route.component.fetchData
    return fetchData instanceof Function ? fetchData(store) : Promise.resolve(null)
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
    var html = ReactDOMServer.renderToStaticMarkup(
        <html>
        <head>
        </head>
        <body>
        <div id="app" dangerouslySetInnerHTML={
        {__html: content}
        }/>
        <script dangerouslySetInnerHTML={
        {__html: propsScript}
        }></script>
        <script src={"/static/js/app.js"}></script>
        </body>
        </html>
    );

    return html;
  })
}