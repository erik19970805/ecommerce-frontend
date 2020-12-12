import {
  PRODUCT_CHECKED_CHANGE,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_UPDATE_SUCCESS,
} from "../constants/productConstants";
import { apiCall } from "../api";
import { ERROR, MESSAGE } from "../constants/messageContants";

export const listProducts = (filters) => async (dispatch, getState) => {
  dispatch({ type: PRODUCT_LIST_REQUEST });
  try {
    const { page, category, sort, search } = filters;
    const { data } = await apiCall(
      "GET",
      `/products?limit=${page * 9}&${category}&${sort}&name[regex]=${search}`,
      null,
      null
    );
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
    dispatch({ type: MESSAGE, payload: data.message });
    dispatch({ type: PRODUCT_CREATE_SUCCESS });
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

export const updateProduct = (product, productId) => async (
  dispatch,
  getState
) => {
  try {
    const { token } = getState();
    const { data } = await apiCall("PUT", `/products/${productId}`, product, {
      Authorization: `Bearer ${token}`,
    });
    dispatch({ type: MESSAGE, payload: data.message });
    dispatch({ type: PRODUCT_UPDATE_SUCCESS });
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

export const changeCheckedProducts = (id, checked) => (dispatch, getState) => {
  const { products } = getState().products;
  products.forEach((product) => {
    if (product._id === id) product.checked = !checked;
  });
  dispatch({ type: PRODUCT_CHECKED_CHANGE, payload: [...products] });
};

export const changeCheckedAllProducts = (checked) => (dispatch, getState) => {
  const { products } = getState().products;
  products.forEach((product) => {
    product.checked = !checked;
  });
  dispatch({ type: PRODUCT_CHECKED_CHANGE, payload: [...products] });
};
