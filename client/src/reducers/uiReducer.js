import {
  SWITCH_MAIN
} from '../actions/types';

// starting the app with timer then switch context based on drawer
const initialState = {
  whichMain: 'Timer',

}

// with destructured action into type, payload
export default function (state = initialState, { type, payload }) {
  switch (type) {
    case SWITCH_MAIN:
      return {
        ...state,
        whichMain: payload,
      };
    default:
      return state;
  }
}
