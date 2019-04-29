import axios from 'axios';
import { ADD_COMPLETED_TASK, GET_COMPLETED_TASK } from './types';

// can only add task when timer actaully runs out
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


// get all completed tasks based on user's googleId
export const getCompletedTask = userGoogleId => (dispatch) => {
  axios
    .get('/api/tasks/' + userGoogleId, userGoogleId)
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