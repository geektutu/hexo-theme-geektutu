import React from 'react'
import routes from '../routes'
import {renderRoutes} from 'react-router-config'

import Navigator from './Navigator'

export default class App extends React.Component {
  static updateATarget () {
    var a_s = document.querySelectorAll('a')
    a_s.forEach((item) => {
      if (item.href && !item.href.startsWith('/')) {
        item.target = '_blank'
      }
    })
  }
  constructor(props) {
    super(props);
  }
  componentDidMount () {
    App.updateATarget()
  }
  componentDidUpdate () {
    App.updateATarget()
  }
  static title = "呆兔兔的小站"

  render() {
    if (typeof window !== 'undefined') {
      window.document.title = App.title
    }

    return (
        <div className="app">
          <div className="app-left-col">
            <Navigator/>
          </div>
          <div className="app-right-col markdown-it padding-0">
            <div className="col-xs-12">
              {renderRoutes(routes)}
            </div>
            <footer className="app-footer text-center">
              <hr/>
              <p className="margin-tb-0"><small>© 2017 - 呆兔兔的小站</small></p>
              <a target="_blank" rel="nofollow noopener" class="no-display" href="http://www.miitbeian.gov.cn/">黔 ICP 备 17006731 号</a>
              <p><small>Powered by <a href="https://github.com/koajs/koa">Koa2</a> & <a href="https://github.com/facebook/react">React</a></small></p>
            </footer>
          </div>
        </div>
    )
  }
}