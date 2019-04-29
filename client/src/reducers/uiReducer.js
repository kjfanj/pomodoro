import {
  SWITCH_MAIN,
  SIGN_IN,
  SIGN_OUT,
} from '../actions/types';

// starting the app with timer then switch context based on drawer
const initialState = {
  whichMain: 'Timer',
  loggedIn: false,
  curUser: ''
}

// with destructured action into type, payload
export default function (state = initialState, { type, payload }) {
  switch (type) {
    case SWITCH_MAIN:
      return {
        ...state,
        whichMain: payload,
      };
    case SIGN_IN:
      return {
        ...state,
        curUser: payload,
        loggedIn: true
      }
    case SIGN_OUT:
      return {
        ...state,
        curUser: "",
        loggedIn: false
      }

    default:
      return state;
  }
}

