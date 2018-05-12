import React from 'react'
import routes from '../routes'
import {renderRoutes} from 'react-router-config'
import styled from 'styled-components';

import Navigator from './Navigator'

import Background from  '../static/img/background3.jpg'


const Header = styled.div`
  font-size: 1.5em;
  text-align: center;
  background-image: url(${Background});
  z-index: 2;
  background-size: cover;
  width: 100%;
  overflow: hidden;
`

const PostContainer = styled.div`
  margin-right: auto;
  margin-left: auto;
  padding-left: 15px;
  padding-right: 15px;
  
  @media (min-width: 768px) {
    width: 750px;
  }
  
  @media (min-width: 992px) {
    width: 970px;
  }
`

const Footer = styled.footer`
  width: 100%;
  line-height: 1.5;
  padding: 20px;

  small a {
    color: #333;
    text-decoration: none;
  }
`

const AppContainer = styled.div`
  min-height: 100%;
  overflow: hidden;
  font-family: "-apple-system","Open Sans","HelveticaNeue-Light","Helvetica Neue Light","Helvetica Neue",Helvetica,Arial,sans-serif;
`

export default class App extends React.Component {
  static updateATarget () {
    var a_s = document.querySelectorAll('a')
    a_s.forEach((item) => {
      if (item.href && !item.href.startsWith('/') && item.href.indexOf('#') === -1) {
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
        <AppContainer className="col-xs-12 padding-0">
          <Header>
            <Navigator/>
          </Header>
          <PostContainer className="markdown-it">
            {renderRoutes(routes)}
          </PostContainer>
          <Footer className="text-center">
              <hr/>
              <p className="margin-tb-0">
                <small>© 2018 - 极客兔兔 - </small>
                <small><a target="_blank" rel="nofollow noopener" href="http://www.miitbeian.gov.cn/">沪ICP备18001798号-1	</a></small>
              </p>
              <p><small>Powered by <a href="https://github.com/koajs/koa">Koa2</a> & <a href="https://github.com/facebook/react">React</a></small></p>
            </Footer>
        </AppContainer>
    )
  }
}