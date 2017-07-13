import {combineReducers} from 'redux';
import mongoReducer from './mongoReducer';
import postReducer from './postReducer';

export default combineReducers({
  mongoReducer,
  postReducer
});
