import {
    CATEGORY_LIST_REQUEST,
    CATEGORY_LIST_SUCCESS,
    CATEGORY_REQUEST,
    CATEGORY_SUCCESS,
} from "../constants/categoryConstants";

export const categoryReducer = (state = { loading: true }, action) => {
    switch (action.type) {
        case CATEGORY_REQUEST:
            return { loading: true };
        case CATEGORY_SUCCESS:
            return { loading: false, category: action.payload };
        default:
            return state;
    }
};

export const categoriesReducer = (state = { loading: true }, action) => {
    switch (action.type) {
        case CATEGORY_LIST_REQUEST:
            return { loading: true };
        case CATEGORY_LIST_SUCCESS:
            return { loading: false, categories: action.payload };
        default:
            return state;
    }
};
