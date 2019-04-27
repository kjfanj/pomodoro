
import thunk from 'redux-thunk'
import { applyMiddleware, compose, combineReducers, createStore } from 'redux';

import taskReducer from './reducers/taskReducer';
import uiReducer from './reducers/uiReducer';


const allReducers = combineReducers({
  task: taskReducer,
  ui: uiReducer
})

const allStoreEnchancers = compose(
  applyMiddleware(thunk)
)

const store = createStore(allReducers, {}, allStoreEnchancers);


export default store;