
import thunk from 'redux-thunk'
import { applyMiddleware, compose, combineReducers, createStore } from 'redux';

import taskReducer from './reducers/taskReducer';



const allReducers = combineReducers({
  task: taskReducer
})

const allStoreEnchancers = compose(
  applyMiddleware(thunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

const store = createStore(allReducers,{},allStoreEnchancers);


export default store;