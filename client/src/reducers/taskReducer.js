import {
  ADD_COMPLETED_TASK,
  GET_COMPLETED_TASK
} from '../actions/types';

const initialState = {
  postTask: {},
  displayTasks: []
};

// with destructured action into type, payload
export default function (state = initialState, { type, payload }) {
  switch (type) {
    case ADD_COMPLETED_TASK:
      return {
        ...state,
        postTask: payload,
      };
    case GET_COMPLETED_TASK:
      return {
        ...state,
        displayTasks: payload
      }
    default:
      return state;
  }
}

