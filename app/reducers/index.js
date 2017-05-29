import * as types from '../actions/types'

let initState = {
  count: 1
}

export default (state = initState, action) => {
  switch (action.type) {
    case types.INCREMENT:
      return {
        count: state.count + 1
      }
    case types.DECREMENT:
      return {
        count: state.count - 1
      }
    case  types.UPDATE_COUNT:
      return {
        count: action.payload.count
      }
    default:
      return state
  }
}