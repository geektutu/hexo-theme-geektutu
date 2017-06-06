import React from 'react'
import routes from '../../routes'
import {Switch} from 'react-router-dom'
import {renderRoutes} from 'react-router-config'
import CSSModules from 'react-css-modules'

import styles from './style.css'
import Navigator from '../Navigator'

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div className="col-xs-12">
          <div styleName="left-col">
            <Navigator/>
          </div>
          <div styleName="right-col" className="markdown">
            {renderRoutes(routes)}
          </div>
        </div>
    )
  }
}

export default CSSModules(App, styles);