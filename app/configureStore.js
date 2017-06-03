import counter from './reducers/'
import thunkMiddleware from 'redux-thunk'
import {createStore, applyMiddleware} from 'redux'

export default (initState) => createStore(counter, initState || {}, applyMiddleware(thunkMiddleware))