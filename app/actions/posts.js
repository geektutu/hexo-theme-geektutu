import fetch from 'isomorphic-fetch'
import * as types from './types'
import * as api from './api'

export const updatePosts = () => {
  return dispatch => {
    return fetch(api.GET_POSTS).then(res => res.json()).then(body => {
      dispatch({
        type: types.UPDATE_POSTS,
        payload: body.data
      })
    })
  }
}
