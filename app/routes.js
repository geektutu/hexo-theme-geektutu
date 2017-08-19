import * as component from './components'


const routes = [{
  path: '/',
  exact: true,
  component: component.PostList
}, {
  path: '/series',
  component: component.Series
}, {
  path: '/archives',
  component: component.Archive
}, {
  path: '/post/:slug',
  component: component.Post
}, {
  path: '/search',
  component: component.Search
}, {
  path: '/admin',
  component: component.Admin
}, {
  path: '*',
  component: component.PostList
}]

export default routes