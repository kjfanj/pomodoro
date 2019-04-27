import axios from 'axios';
import { ADD_COMPLETED_TASK } from './types';

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