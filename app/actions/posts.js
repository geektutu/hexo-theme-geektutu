import fetch from 'isomorphic-fetch'
import * as types from './types'
import * as api from './api'

const groupBy2Api = {
  'date': api.GET_ARCHIVES,
  'category': api.GET_SERIES
}
const groupBy2Type = {
  'date': types.GET_ARCHIVES,
  'category': types.GET_SERIES
}

export const getPosts = (groupBy = '') => {
  var url = groupBy2Api[groupBy] || api.GET_POSTS
  var type = groupBy2Type[groupBy] || types.GET_POSTS
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
