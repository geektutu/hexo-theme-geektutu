let initState = {
  count: 1
}

export default (state = initState, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return {
        count: state.count + 1
      }
    case 'DECREMENT':
      return {
        count: state.count - 1
      }
    case  'UPDATE_COUNT':
      return {
        count: action.payload.count
      }
    default:
      return state
  }
}