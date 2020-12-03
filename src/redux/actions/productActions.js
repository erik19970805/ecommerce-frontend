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
            payload: error.response.data.error,
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
            payload: error.response.data.error,
        });
    }
};
