import { SWITCH_MAIN, SIGN_UP } from './types';
import axios from 'axios';


export const switchMain = whichMain => (dispatch) => {
  dispatch({
    type: SWITCH_MAIN,
    payload: whichMain
  })
}

export const signUp = user => (dispatch) => {


  axios
    .get('/auth/google', { crossdomain: true })
    .then(res => {
      console.log(res)
    })
    .catch(err => {
      console.log(err)
    })
  // dispatch({
  //   type: SIGN_UP,
  // })
}
