var React = require('react');
var ReactDOMServer = require("react-dom/server");
import {StaticRouter} from 'react-router'
import {Provider} from 'react-redux'
import configureStore from '../app/configureStore'
import App from '../app/App'

import {fetchCount} from '../app/actions'

module.exports = async function (url) {

  var context = {}
  var store = configureStore()

  var content = ReactDOMServer.renderToString(
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
      <script src={"/app.js"}></script>
      </body>
      </html>
  );

  return html;
}