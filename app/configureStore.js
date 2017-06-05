import appReducer from './reducers'
import thunkMiddleware from 'redux-thunk'
import {createStore, applyMiddleware} from 'redux'

export default (initState) => createStore(appReducer, initState || {}, applyMiddleware(thunkMiddleware))