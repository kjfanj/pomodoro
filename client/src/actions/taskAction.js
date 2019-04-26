import axios from 'axios';
import { GET_COMPLETED_TASKS, ADD_COMPLETED_TASK } from './types';

export const addTask = task => (dispatch) => {
  axios
    .post('/api/tasks', task)
    .then(res => {
      dispatch({
        type: ADD_COMPLETED_TASK,
        payload: res.data
      })
      console.log("post succ")
    })
    .catch(err =>
      console.log(err)
    );
};