import * as posts from './posts'
import { combineReducers } from 'redux';

export default combineReducers(Object.assign({}, posts))