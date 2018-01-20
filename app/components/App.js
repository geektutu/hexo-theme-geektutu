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
  static title = "极客兔兔的小站"

  render() {
    if (typeof window !== 'undefined') {
      window.document.title = App.title
    }

    return (
        <div className="app col-xs-12 padding-0">
          <div className="app-left-col">
            <Navigator/>
          </div>
          <div className="app-right-col markdown-it">
            <div className="col-xs-12">
              {renderRoutes(routes)}
            </div>
            <footer className="app-footer text-center">
              <hr/>
              <p className="margin-tb-0">
                <small>© 2018 - 极客兔兔 - </small>
                <small><a target="_blank" rel="nofollow noopener" href="http://www.miitbeian.gov.cn/">沪ICP备18001798号-1	</a></small>
              </p>
              <p><small>Powered by <a href="https://github.com/koajs/koa">Koa2</a> & <a href="https://github.com/facebook/react">React</a></small></p>
            </footer>
          </div>
        </div>
    )
  }
}