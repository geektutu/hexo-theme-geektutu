import fetch from 'isomorphic-fetch'
import * as types from './types'
import * as api from './api'

export const updatePosts = (groupBy = '') => {
  var url =  groupBy === 'date' ? api.GET_ARCHIVES : groupBy === 'tag' ? api.GET_SERIES : api.GET_POSTS
  var type = groupBy === 'date' ? types.UPDATE_ARCHIVES : groupBy === 'tag' ? types.UPDATE_SERIES : types.UPDATE_POSTS
  return dispatch => {
    return fetch(url).then(res => res.json()).then(body => {
      dispatch({
        type: type,
        payload: body.data
      })
    })
  }
}