import { SWITCH_MAIN, SIGN_IN, SIGN_OUT } from './types';
import axios from 'axios';


export const switchMain = whichMain => (dispatch) => {
  dispatch({
    type: SWITCH_MAIN,
    payload: whichMain
  })
}

export const signIn = userId => (dispatch) => {
  axios
    .post('/auth/signIn', userId)
    .then(res => {
      // if status is OK, then the user will be added to the db
      if (res.status === 200) {
        dispatch({
          type: SIGN_IN,
          payload: userId
        })
      }
    })
    .catch(err => {
      console.log(err)
    })
}

export const signOut = () => (dispatch) => {
  dispatch({
    type: SIGN_OUT
  })
}
