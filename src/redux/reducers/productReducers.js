import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_UPDATE_RESET,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_CHECKED_CHANGE,
  PRODUCT_FILTERS_CHANGE,
} from "../constants/productConstants";

export const productListReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true };
    case PRODUCT_LIST_SUCCESS:
      return { loading: false, products: action.payload };
    case PRODUCT_CHECKED_CHANGE:
      return { loading: false, products: action.payload };
    default:
      return state;
  }
};

export const productDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { loading: true };
    case PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: action.payload };
    default:
      return state;
  }
};

export const productUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_UPDATE_SUCCESS:
      return { loading: false, successUpdate: true };
    case PRODUCT_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};

export const productFiltersReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_FILTERS_CHANGE:
      return { filters: action.payload };
    default:
      return state;
  }
};
