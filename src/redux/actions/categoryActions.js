import { apiCall } from "../api";
import { ERROR, MESSAGE } from "../constants/messageContants";
import {
    CATEGORY_LIST_REQUEST,
    CATEGORY_LIST_SUCCESS,
    CATEGORY_REQUEST,
    CATEGORY_SUCCESS,
} from "../constants/categoryConstants";

const categories = async (dispatch) => {
    const { data } = await apiCall("GET", "/category", null, null);
    dispatch({ type: CATEGORY_LIST_SUCCESS, payload: data.categories });
};

export const getCategory = (id) => async (dispatch, getState) => {
    dispatch({ type: CATEGORY_REQUEST });
    try {
        const { token } = getState();
        const { data } = await apiCall("GET", `/category/${id}`, null, {
            Authorization: `Bearer ${token}`,
        });
        dispatch({ type: CATEGORY_SUCCESS, payload: data.category });
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

export const getCategories = () => async (dispatch) => {
    dispatch({ type: CATEGORY_LIST_REQUEST });
    try {
        categories(dispatch);
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

export const createCategory = (name) => async (dispatch, getState) => {
    console.log(name);
    try {
        const { token } = getState();
        const { data } = await apiCall(
            "POST",
            "/category",
            { name },
            {
                Authorization: `Bearer ${token}`,
            }
        );
        dispatch({ type: MESSAGE, payload: data.message });
        categories(dispatch);
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

export const updateCategory = ({ id, name }) => async (dispatch, getState) => {
    try {
        const { token } = getState();
        const { data } = await apiCall(
            "PUT",
            `/category/${id}`,
            { name },
            {
                Authorization: `Bearer ${token}`,
            }
        );
        categories(dispatch);
        dispatch({ type: MESSAGE, payload: data.message });
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

export const deleteCategory = (id) => async (dispatch, getState) => {
    try {
        const { token } = getState();
        const { data } = await apiCall("DELETE", `/category/${id}`, null, {
            Authorization: `Bearer ${token}`,
        });
        categories(dispatch);
        dispatch({ type: MESSAGE, payload: data.message });
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
