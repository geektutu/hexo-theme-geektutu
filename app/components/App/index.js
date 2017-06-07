import React from 'react'
import routes from '../../routes'
import {renderRoutes} from 'react-router-config'
import CSSModules from 'react-css-modules'

import styles from './style.css'
import Navigator from '../Navigator'

// hahhaha
class App extends React.Component {
  /**
   * @param props
   */
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div styleName="container">
          <div styleName="left-col">
            <Navigator/>
          </div>
          <div styleName="right-col" className="markdown-it padding-0">
            <div className="col-xs-12 padding-0">
              {renderRoutes(routes)}
            </div>
            <footer className="text-center" styleName="footer">
              <hr/>
              <p className="margin-tb-0"><small>© 2017 - 呆尐兔兔 的小站</small></p>
              <p><small>Powered by <a href="https://github.com/koajs/koa">Koa2</a> & <a href="https://github.com/facebook/react">React</a></small></p>
            </footer>
          </div>
        </div>
    )
  }
}

export default CSSModules(App, styles);