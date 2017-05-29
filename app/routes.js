import Hello from './components/Hello'
import Counter from './components/Counter'
import fetch from 'isomorphic-fetch'

const routes = [
  {
    path: '/hello',
    component: Hello,
    routes: [{
      path: '/hello/three',
      component: Counter
    }, {
      path: '/hello/four',
      component: Hello
    }]
  }, {
    path: '/counter',
    component: Counter
  }
]

export default routes