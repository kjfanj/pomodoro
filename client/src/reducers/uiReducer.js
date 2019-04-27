import {
  UI_COMPLETED_TASKS
} from '../actions/types';



export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_COMPLETED_TASK:
      return {
        ...state,
        task: action.payload,
      };
    default:
      return state;
  }
}
