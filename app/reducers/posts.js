import * as types from '../actions/types'

export const posts = (state = [], action) => {
  switch (action.type) {
    case  types.GET_POSTS:
      return action.payload
    default:
      return state
  }
}

export const post = (state = {}, action) => {
  switch (action.type) {
    case  types.GET_POST:
      return action.payload
    default:
      return state
  }
}

export const archives = (state = [], action) => {
  switch (action.type) {
    case  types.GET_ARCHIVES:
      return action.payload
    default:
      return state
  }
}

export const series = (state = [], action) => {
  switch (action.type) {
    case  types.GET_SERIES:
      return action.payload
    default:
      return state
  }
}