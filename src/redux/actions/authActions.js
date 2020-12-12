import { apiCall } from "../api";
import {
  AUTH_CART,
  AUTH_ISADMIN,
  AUTH_ISLOGGED,
  AUTH_TOKEN,
} from "../constants/authConstants";
import { MESSAGE } from "../constants/messageContants";
import { closeExpireToken } from "./closeMessageActions";

export const signup = ({ name, email, password }) => async (dispatch) => {
  try {
    const { data } = await apiCall(
      "POST",
      "/auth/signup",
      { name, email, password },
      null
    );
    dispatch({ type: MESSAGE, payload: data.message });
  } catch (error) {
    dispatch(closeExpireToken(error));
  }
};

export const signin = ({ email, password }) => async (dispatch) => {
  try {
    const { data } = await apiCall(
      "POST",
      "/auth/signin",
      { email, password },
      null
    );
    dispatch({ type: AUTH_TOKEN, payload: data.token });
    dispatch({ type: AUTH_ISLOGGED, payload: data.isLogged });
    dispatch({ type: AUTH_ISADMIN, payload: data.isAdmin });
    dispatch({ type: AUTH_CART, payload: data.cart });
    dispatch({
      type: MESSAGE,
      payload: "Se inicio session correctamente",
    });
    const { isAdmin, isLogged, token, cart } = data;
    localStorage.setItem("auth", JSON.stringify({ isLogged, isAdmin, token }));
    localStorage.setItem("cart", JSON.stringify(cart));
  } catch (error) {
    dispatch(closeExpireToken(error));
  }
};

export const signout = () => async (dispatch) => {
  dispatch({ type: AUTH_TOKEN, payload: null });
  dispatch({ type: AUTH_ISLOGGED, payload: false });
  dispatch({ type: AUTH_ISADMIN, payload: false });
  dispatch({ type: AUTH_CART, payload: [] });
  dispatch({ type: MESSAGE, payload: "Se ha cerrado la sesion" });
  localStorage.clear();
};
