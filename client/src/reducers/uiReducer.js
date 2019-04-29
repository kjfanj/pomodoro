import {
  SWITCH_MAIN,
  SIGN_UP
} from '../actions/types';

// starting the app with timer then switch context based on drawer
const initialState = {
  whichMain: 'Timer',
  loggedIn: false,
}

// with destructured action into type, payload
export default function (state = initialState, { type, payload }) {
  switch (type) {
    case SWITCH_MAIN:
      return {
        ...state,
        whichMain: payload,
      };
    case SIGN_UP:
      return {
        ...state
      }
    default:
      return state;
  }
}

