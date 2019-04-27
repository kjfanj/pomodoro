import {
  ADD_COMPLETED_TASK
} from '../actions/types';

const initialState = {
  items: {}
};

// with destructured action into type, payload
export default function (state = initialState, { type, payload }) {
  switch (type) {
    case ADD_COMPLETED_TASK:
      return {
        ...state,
        task: payload,
      };
    default:
      return state;
  }
}
