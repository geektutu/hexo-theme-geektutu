var React = require('react');
var ReactDOMServer = require("react-dom/server");
import {StaticRouter} from 'react-router'
import {Provider} from 'react-redux'
import store from '../app/store'
import App from '../app/routes'

module.exports = function (url) {

  var context = {}
  var content = ReactDOMServer.renderToString(
      <Provider store={store}>
        <StaticRouter location={url} context={context}>
          <App/>
        </StaticRouter>
      </Provider>
  );

  console.log(context)

  var propsScript = 'var APP_PROPS = ' + JSON.stringify(store.getState());

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