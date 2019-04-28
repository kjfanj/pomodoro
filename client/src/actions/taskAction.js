import axios from 'axios';
import { ADD_COMPLETED_TASK, GET_COMPLETED_TASK } from './types';

export const addTask = task => (dispatch) => {
  axios
    .post('/api/tasks', task)
    .then(res => {
      dispatch({
        type: ADD_COMPLETED_TASK,
        payload: res.data
      })
    })
    .catch(err =>
      console.log(err)
    );
};


// TODO: have a parameter for specific user
export const getCompletedTask = user => (dispatch) => {
  axios
    .get('/api/tasks')
    .then(res => {
      dispatch({
        type: GET_COMPLETED_TASK,
        payload: res.data
      })
    })
    .catch(err =>
      console.log(err)
    );
}