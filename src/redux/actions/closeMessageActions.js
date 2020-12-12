import { ERROR } from "../constants/messageContants";
import { signout } from "./authActions";

export const closeMessage = (type) => (dispatch) => {
  dispatch({
    type,
    payload: null,
  });
};

export const closeExpireToken = (error) => (dispatch) => {
  if (!error.response.data.isLogged) {
    dispatch(signout());
  }
  dispatch({
    type: ERROR,
    payload:
      error.response && error.response.data.error
        ? error.response.data.error
        : error.message,
  });
};
