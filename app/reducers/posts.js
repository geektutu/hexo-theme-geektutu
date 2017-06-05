import * as types from '../actions/types'

const posts = (state = [], action) => {
  switch (action.type) {
    case  types.UPDATE_POSTS:
      return action.payload
    default:
      return state
  }
}

const archives = (state = [], action) => {
  switch (action.type) {
    case  types.UPDATE_ARCHIVES:
      return action.payload
    default:
      return state
  }
}

const series = (state = [], action) => {
  switch (action.type) {
    case  types.UPDATE_SERIES:
      return action.payload
    default:
      return state
  }
}

export {
    posts, archives, series
}