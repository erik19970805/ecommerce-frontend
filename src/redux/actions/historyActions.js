import { apiCall } from "../api";
import {
  HISTORY_DETAILS_REQUEST,
  HISTORY_DETAILS_SUCCESS,
  HISTORY_LIST_REQUEST,
  HISTORY_LIST_SUCCESS,
} from "../constants/historyConstants";
import { closeExpireToken } from "./closeMessageActions";

export const orderHistories = () => async (dispatch, getState) => {
  dispatch({ type: HISTORY_LIST_REQUEST });
  try {
    const { token, isAdmin } = getState();
    if (isAdmin) {
      const { data } = await apiCall("GET", "/payment", null, {
        Authorization: `Bearer ${token}`,
      });
      dispatch({ type: HISTORY_LIST_SUCCESS, payload: data.payments });
    } else {
      const { data } = await apiCall("GET", "/history", null, {
        Authorization: `Bearer ${token}`,
      });
      dispatch({ type: HISTORY_LIST_SUCCESS, payload: data.histories });
    }
  } catch (error) {
    dispatch(closeExpireToken(error));
  }
};

export const orderHistory = (id) => async (dispatch, getState) => {
  dispatch({ type: HISTORY_DETAILS_REQUEST });
  try {
    const { token } = getState();
    const { data } = await apiCall("GET", `/history/${id}`, null, {
      Authorization: `Bearer ${token}`,
    });
    dispatch({ type: HISTORY_DETAILS_SUCCESS, payload: data.history });
  } catch (error) {
    dispatch(closeExpireToken(error));
  }
};
