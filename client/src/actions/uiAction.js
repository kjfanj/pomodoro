import { SWITCH_MAIN } from './types';


export const switchMain = whichMain => (dispatch) => {
  dispatch({
    type: SWITCH_MAIN,
    payload: whichMain
  })
}

