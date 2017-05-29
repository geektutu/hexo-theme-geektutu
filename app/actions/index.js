import fetch from 'isomorphic-fetch'
import * as types from './types'
import * as api from './api'

export const increment = () => ({
  type: types.INCREMENT,
})

export const decrement = () => ({
  type: types.DECREMENT,
})

export const updateCount = () => {
  return dispatch => {
    console.log(api.GET_COUNT)
    return fetch(api.GET_COUNT).then(res => res.json()).then(json => {
      dispatch({
        type: types.UPDATE_COUNT,
        payload: json
      })
    })
  }
}


