import {
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
} from "../constants/productConstants";
import { apiCall } from "../api";
import { ERROR } from "../constants/messageContants";

export const listProducts = () => async (dispatch) => {
    dispatch({ type: PRODUCT_LIST_REQUEST });
    try {
        const { data } = await apiCall("GET", "/products", null, null);
        dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data.products });
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

export const detailsProduct = (id) => async (dispatch) => {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });
    try {
        const { data } = await apiCall("GET", `/products/${id}`, null, null);
        dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data.product });
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

export const createProduct = (product) => async (dispatch, getState) => {
    try {
        const { token } = getState();
        const { data } = await apiCall("POST", "/products", product, {
            Authorization: `Bearer ${token}`,
        });
        dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data.message });
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

export const updateProduct = (product) => async (dispatch, getState) => {
    try {
        const { token } = getState();
        const { data } = await apiCall(
            "PUT",
            `/products/${product.id}`,
            product,
            {
                Authorization: `Bearer ${token}`,
            }
        );
        dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data.message });
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

export const deleteProduct = (id) => async (dispatch, getState) => {
    try {
        const { token } = getState();
        const { data } = await apiCall("DELETE", `/products/${id}`, null, {
            Authorization: `Bearer ${token}`,
        });
        dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data.message });
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
