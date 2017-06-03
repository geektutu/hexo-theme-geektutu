import Hello from './components/Hello/index'
import * as component from './components'



const routes = [
  {
    path: '/',
    component: component.PostList,
    routes: [{
      path: '/index',
      component: component.Hello
    }, {
      path: '/series',
      component: component.Series
    }, {
      path: '/archives',
      component: component.Archive

    }, {
      path: '/about',
      component: component.About
    }]
  }
]

export default routes