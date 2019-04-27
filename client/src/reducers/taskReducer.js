import {
  ADD_COMPLETED_TASK
} from '../actions/types';

const initialState = {
  items: {}
};

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
