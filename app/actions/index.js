import fetch from 'isomorphic-fetch'

export const increment = () => ({
  type: 'INCREMENT',
})

export const decrement = () => ({
  type: 'DECREMENT',
})

export const fetchCount = () => {
  return dispatch => {
    return fetch('http://localhost:3001/api/count').then(res => res.json()).then(json => {
      dispatch({
        type: 'UPDATE_COUNT',
        payload: json
      })
    });
  }
}