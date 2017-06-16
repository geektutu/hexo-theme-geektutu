import fetch from 'isomorphic-fetch'
import * as types from './types'
import * as api from './api'

export const getPosts = (groupBy = '') => {
  var url = groupBy === 'date' ? api.GET_ARCHIVES : groupBy === 'tag' ? api.GET_SERIES : api.GET_POSTS
  var type = groupBy === 'date' ? types.GET_ARCHIVES : groupBy === 'tag' ? types.GET_SERIES : types.GET_POSTS
  return dispatch => {
    return fetch(url).then(res => res.json()).then(body => {
      dispatch({
        type: type,
        payload: body.data
      })
    })
  }
}

export const getPost = (slug) => {
  return dispatch => {
    return fetch(api.GET_POST_BY_SLUG + slug).then(res => res.json()).then(body => {
      dispatch({
        type: types.GET_POST,
        payload: body.data || {
          slug: slug,
          htmlContent: '<p class="text-center">Not Found</p>'
        }
      })
    })
  }
}

export const addPost = (post) => {
  return dispatch => {
    return fetch(api.POST_POSTS, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(post)
    }).then(res => res.status >= 200 && res.status < 300 ? res.json() : {}).then(body => {
      if (body && body.data) {
        window.alert('添加/修改成功')
      } else {
        window.alert('失败')
      }
    })
  }
}
