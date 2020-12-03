import { ERROR } from "../constants/messageContants";
import { apiCall } from "../api";
import {
    HISTORY_DETAILS_REQUEST,
    HISTORY_DETAILS_SUCCESS,
    HISTORY_LIST_REQUEST,
    HISTORY_LIST_SUCCESS,
} from "../constants/historyConstants";

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
        dispatch({
            type: ERROR,
            payload:
                error.response && error.response.data.error
                    ? error.response.data.error
                    : error.message,
        });
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
        dispatch({
            type: ERROR,
            payload:
                error.response && error.response.data.error
                    ? error.response.data.error
                    : error.message,
        });
    }
};
