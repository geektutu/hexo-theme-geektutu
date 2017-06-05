import * as component from './components'


const routes = [{
  path: '/',
  exact: true,
  component: component.PostList,
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

export default routes