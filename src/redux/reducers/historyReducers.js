import {
    HISTORY_DETAILS_REQUEST,
    HISTORY_DETAILS_SUCCESS,
    HISTORY_LIST_REQUEST,
    HISTORY_LIST_SUCCESS,
} from "../constants/historyConstants";

export const historiesReducer = (state = { loading: true }, action) => {
    switch (action.type) {
        case HISTORY_LIST_REQUEST:
            return { loading: true };
        case HISTORY_LIST_SUCCESS:
            return { loading: false, histories: action.payload };
        default:
            return state;
    }
};

export const historyReducer = (state = { loading: true }, action) => {
    switch (action.type) {
        case HISTORY_DETAILS_REQUEST:
            return { loading: true };
        case HISTORY_DETAILS_SUCCESS:
            return { loading: false, history: action.payload };
        default:
            return state;
    }
};
