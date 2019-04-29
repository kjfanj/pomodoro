import { combineReducers } from 'redux';
import taskReducer from './taskReducer';
import uiReducer from './uiReducer';

export default combineReducers({
  task: taskReducer,
  ui: uiReducer
});
