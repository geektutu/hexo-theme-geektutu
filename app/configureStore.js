import counter from './reducers/'
import thunkMiddleware from 'redux-thunk'
import {createStore, applyMiddleware} from 'redux'

export default (initState) => {
  if (!initState) {
    initState = {
      count: 0
    }
  }
  return createStore(counter, initState, applyMiddleware(thunkMiddleware))
}
